package Potatao.Diseases.A_Image_Prediction.controller;

import Potatao.Diseases.A_Image_Prediction.service.AgenticRagService;
import Potatao.Diseases.A_Image_Prediction.service.DiseaseResponse;
import Potatao.Diseases.A_Image_Prediction.service.FastApiService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class PredictController {

    @Autowired
    private FastApiService service;

    @Autowired
    private DiseaseResponse response;

    @Autowired
    private final AgenticRagService ragService;

    private final ChatClient chatClient;
    private final VectorStore vectorStore;

    public PredictController(ChatClient chatClient, VectorStore vectorStore, AgenticRagService ragService) {
        this.chatClient = chatClient;
        this.vectorStore = vectorStore;
        this.ragService = ragService;
    }



    // This is my System Prompt that will go in .system() method as system behaviour

    @Value("classpath:/promptTemplates/systemPromptRandomDataTemplate.st")
    Resource systemPromptForSuggestion;



    public String diseaseName = "";

    @PostMapping("/analyze")
    public String analyzeImage(@RequestParam("file") MultipartFile file) {
        try {
                diseaseName = service.getPrediction(file);                   /// FastAPI se prediction milega
                response.setDiseaseName(diseaseName);
                System.out.println("Predicted Disease: " + diseaseName);      /// Print for debugging
                return (diseaseName);

        } catch (Exception e) {
                return ("Error analyzing image");
        }
    }


    @GetMapping("/suggestion")
    public String suggestion(@RequestParam ("message") String message){
        SearchRequest searchRequest = SearchRequest.builder()
                .query(diseaseName)
                .topK(3)
                .similarityThreshold(0.5)
                .build();

        List<Document> similarDocs = vectorStore.similaritySearch(searchRequest);

        String similarContext = similarDocs.stream()
                .map(Document::getText)
                .collect(Collectors.joining(System.lineSeparator()));

        // 3. Prompt Build
        String userPrompt =
                "Rog: " + diseaseName + "\n" +
                        "Kisan ka prashn: " + message + "\n\n" +
                        "Upyogi jaankari:\n" + similarContext;


         String answer = chatClient
                .prompt()
                .system(promptSystemSpec -> promptSystemSpec.text(systemPromptForSuggestion)
                        .param("documents",similarContext))
                .user(userPrompt)
                .call()
                .content();
        return answer;
    }


//    @GetMapping("/suggestion")
//    public String chatClient(@RequestParam("message") String message){
//        return ragService.chat(diseaseName + message );
//    }



    @GetMapping("/demo")
    public void name(){
        String demo = diseaseName;
        System.out.println(demo);
    }
}
