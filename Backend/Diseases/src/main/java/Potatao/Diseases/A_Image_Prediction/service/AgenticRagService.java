package Potatao.Diseases.A_Image_Prediction.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.qdrant.QdrantVectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AgenticRagService {

    private static final Logger log = LoggerFactory.getLogger(AgenticRagService.class);

    @Value("classpath:/promptTemplates/systemPromptRandomDataTemplate.st")
    Resource systemPromptResource;

    private final ChatClient llm;
    private final QdrantVectorStore vectorStore;

    private final int DEFAULT_TOP_K = 3;
    private final double DEFAULT_THRESHOLD = 0.5;

    private String cachedSystemPrompt;

    public AgenticRagService(ChatClient llm, QdrantVectorStore vectorStore) {
        this.llm = llm;
        this.vectorStore = vectorStore;
    }

    // Load system prompt once → token saving
    private String getSystemPrompt() {
        try {
            if (cachedSystemPrompt == null) {
                cachedSystemPrompt = new String(systemPromptResource.getInputStream().readAllBytes());
            }
        } catch (Exception e) {
            cachedSystemPrompt = "आप एक कृषि सहायक हैं। केवल DOCUMENTS के आधार पर सरल हिंदी में उत्तर दें।";
        }
        return cachedSystemPrompt;
    }

    // ---------------- MAIN CHAT FUNCTION ----------------
    public String chat(String userQuery) {

        if (!StringUtils.hasText(userQuery)) {
            return "कृपया प्रश्न लिखें।";
        }

        // 1) OPTIONAL REFINER (fast, small prompt)
        String refinedQuery = looksVague(userQuery)
                ? safeRefine(userQuery).orElse(userQuery)
                : userQuery;

        // 2) VECTOR SEARCH (top 3)
        List<Document> docs = search(refinedQuery);

        if (docs.isEmpty() && !refinedQuery.equalsIgnoreCase(userQuery)) {
            docs = search(userQuery);
        }

        // 3) COMPRESSED CONTEXT
        String context = buildContext(docs);

        // 4) FINAL SINGLE MODEL CALL
        String answer = safeGenerate(context, userQuery)
                .orElse("क्षमा करें, उत्तर उपलब्ध नहीं है।");

        return answer.trim();
    }

    // -----------------------------------------------------
    // SMALL & CLEAN QUERY REFINER
    // -----------------------------------------------------
    private Optional<String> safeRefine(String q) {
        try {
            String prompt = "किसान के इस प्रश्न को थोड़ा स्पष्ट कर दो:\n" + q;

            return Optional.ofNullable(
                    llm.prompt()
                            .user(prompt)
                            .call()
                            .content()
            );

        } catch (Exception ex) {
            log.error("Refine failed", ex);
            return Optional.empty();
        }
    }

    // -----------------------------------------------------
    // SINGLE MODEL CALL → FINAL ANSWER (NO CRITIC REQUIRED)
    // -----------------------------------------------------
    private Optional<String> safeGenerate(String context, String userQuery) {

        try {
            String fullPrompt =
                    "DOCUMENTS (केवल इन्हीं से उत्तर दो):\n" +
                            context +
                            "\n\nकिसान का प्रश्न:\n" +
                            userQuery +
                            "\n\nउत्तर (सरल हिंदी में, बिना किसी सुझाव या meta comments):";

            return Optional.ofNullable(
                    llm.prompt()
                            .system(getSystemPrompt())  // system prompt finally applied ✔
                            .user(fullPrompt)
                            .call()
                            .content()
            );

        } catch (Exception ex) {
            log.error("Generate failed", ex);
            return Optional.empty();
        }
    }

    // -----------------------------------------------------
    // VECTOR SEARCH
    // -----------------------------------------------------
    private List<Document> search(String query) {
        try {
            var req = SearchRequest.builder()
                    .query(query)
                    .topK(DEFAULT_TOP_K)
                    .similarityThreshold(DEFAULT_THRESHOLD)
                    .build();

            return vectorStore.similaritySearch(req);

        } catch (Exception ex) {
            log.error("Vector search error", ex);
            return List.of();
        }
    }

    // -----------------------------------------------------
    // CLEAN & SMALL CONTEXT BUILDER → HUGE TOKEN SAVING
    // -----------------------------------------------------
    private String buildContext(List<Document> docs) {
        return docs.stream()
                .map(d -> d.getText().replace("\n", " "))
                .limit(3)
                .collect(Collectors.joining("\n"));
    }



    // -----------------------------------------------------
    // SIMPLE VAGUE CHECK
    // -----------------------------------------------------
    private boolean looksVague(String q) {

        int len = q.length();
        boolean symptoms = q.toLowerCase()
                .matches(".*(spot|brown|hole|wilt|pata|leaf|yellow).*");

        return len < 6 || symptoms;
    }
}
