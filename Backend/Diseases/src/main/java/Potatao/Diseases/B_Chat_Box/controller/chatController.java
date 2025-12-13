package Potatao.Diseases.B_Chat_Box.controller;

import Potatao.Diseases.A_Image_Prediction.service.DiseaseResponse;
import Potatao.Diseases.A_Image_Prediction.service.FastApiService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.ai.chat.memory.ChatMemory.CONVERSATION_ID;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class chatController {

    @Autowired
    private FastApiService service;

    @Autowired
    private DiseaseResponse response;

    private final ChatClient chatClient;
    private final ChatMemory chatMemory;
    private final VectorStore vectorStore;

    public chatController(@Qualifier("chatMemoryChatClient") ChatClient chatClient, ChatMemory chatMemory, VectorStore vectorStore) {
        this.chatClient = chatClient;
        this.chatMemory = chatMemory;
        this.vectorStore = vectorStore;
    }

    /// Ye LLM ke .system() ke liye hei jisse LLM ka behaviour set hota hei
    @Value("classpath:/promptTemplates/systemPromptChatTemplate.st")
    Resource systemPromptForChat;

    @GetMapping("/chat") 
    public ResponseEntity<String> chat(@RequestParam ("message") String message){
        try {
            String diseaseNameForChat =  response.getDiseaseName();

            // 1. Safety check
            if (diseaseNameForChat == null || diseaseNameForChat.isEmpty()) {
                return ResponseEntity.badRequest().body("❗ कृपया पहले बीमारी की पहचान करें।");
            }

            // 2. Vector Store Search
            SearchRequest searchRequest = SearchRequest.builder()
                    .query(diseaseNameForChat)
                    .topK(3)
                    .similarityThreshold(0.5)
                    .build();

            List<Document> similarDocs = vectorStore.similaritySearch(searchRequest);
            String similarContext = similarDocs.stream()
                    .map(Document::getText)
                    .collect(Collectors.joining("\n"));

            // 3. Prompt Build
            String userPrompt =
                            "Kisan ka prashn: " + message + "\n\n" +
                    "Rog: " + diseaseNameForChat + "\n" +
                            "Upyogi jaankari:\n" + similarContext;

            // 4. Generate Answer
            String answer = chatClient
                    .prompt()
                    .system(promptSystemSpec -> promptSystemSpec.text(systemPromptForChat)
                            .param("documents",similarContext))
                    .user(userPrompt)
                    .advisors(a -> a.param(CONVERSATION_ID, "Farmer"))
                    .call()
                    .content();

            return ResponseEntity.ok(answer);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body("❗ Chat error: " + e.getMessage());
        }
    }

    @GetMapping("/demoChat")
    public ResponseEntity<String> chatMemory(@RequestParam ("userName") String userName, @RequestParam ("message") String message){
        return ResponseEntity.ok(chatClient
                .prompt()
                .user(message + userName)
                        .advisors(advisorSpec -> advisorSpec.param(CONVERSATION_ID,userName)
                        )
                .call()
                .content());
    }

}
