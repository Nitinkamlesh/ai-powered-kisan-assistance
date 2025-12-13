package Potatao.Diseases.D_Weather_Based_Disease_Prediction.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AIService {

    private final ChatClient chatClient;
    private final VectorStore vectorStore;

    public AIService(ChatClient chatClient, VectorStore vectorStore) {
        this.chatClient = chatClient;
        this.vectorStore = vectorStore;
    }

    public String getAISuggestion(String riskData) {

        // ---------- 1. RAG Search ----------
        SearchRequest searchRequest = SearchRequest.builder()
                .query(riskData)
                .topK(3)
                .similarityThreshold(0.5)
                .build();

        List<Document> similarDocs = vectorStore.similaritySearch(searchRequest);

        String ragContext = similarDocs.stream()
                .map(Document::getText)
                .collect(Collectors.joining("\n"));

        // ---------- 2. SYSTEM MESSAGE ----------
        String systemPrompt = """
                आप एक अनुभवी कृषि विशेषज्ञ हैं।
                आपको किसान को मौसम और रोग आधारित सलाह देनी है।
                हमेशा सरल, समझने योग्य, हिंग्लिश, किसान-friendly भाषा का उपयोग करें।

                यदि आपके पास RAG context दिया गया है तो उसे प्राथमिकता दें।
                """;

        // ---------- 3. USER PROMPT (risk + RAG + instructions) ----------
        String userPrompt = """
                नीचे मौसम और रोग जोखिम की जानकारी दी गई है:

                --- RISK DETAILS ---
                {risk}
                ---------------------

                अतिरिक्त संदर्भ (RAG context):
                {context}

                कृपया किसान को स्पष्ट और उपयोगी सलाह दें:

                1. जोखिम को सरल भाषा में समझाएँ  
                2. Late Blight / fungal disease ka pattern samjhayen  
                3. मौसम ke hisaab se perfect spray timing  
                4. बारिश होने वाली हो तो कितने घंटे इंतज़ार करें  
                5. Safety instructions  
                6. किसान को “अभी तुरंत क्या करना चाहिए” (Action steps)

                उत्तर हिंदी (हिंग्लिश) में दें।
                """;

        // ---------- 4. Replace variables safely ----------
        userPrompt = userPrompt.replace("{risk}", riskData == null ? "" : riskData);
        userPrompt = userPrompt.replace("{context}", ragContext.isEmpty() ? "कोई संदर्भ उपलब्ध नहीं" : ragContext);

        // ---------- 5. CALL ChatClient ----------
        return chatClient.prompt()
                .system(systemPrompt)
                .user(userPrompt)
                .call()
                .content();
    }
}
