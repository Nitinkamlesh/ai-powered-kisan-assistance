package Potatao.Diseases.E_Voice_Assistant.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FarmerHelplineService {

    private final ChatClient chatClient;
    private final VectorStore vectorStore;

    public FarmerHelplineService(ChatClient chatClient, VectorStore vectorStore) {
        this.chatClient = chatClient;
        this.vectorStore = vectorStore;
    }

    @Value("classpath:/promptTemplates/systemPromptForVoiceChat.st")
    Resource systemPrompt;


    public String getAnswer(String question) {

        if (question == null || question.trim().isEmpty()) {
            return "Kripya apni fasal ki problem sahi se bataye. Main madad karne ke liye yahan hoon.";
        }

        // ---------- RAG SEARCH ----------
        SearchRequest searchRequest = SearchRequest.builder()
                .query(question)
                .topK(3)
                .similarityThreshold(0.5)
                .build();

        List<Document> similarDocs = vectorStore.similaritySearch(searchRequest);

        String similarContext = similarDocs.stream()
                .map(Document::getText)
                .collect(Collectors.joining(System.lineSeparator()));


        // ---------- LLM CALL ----------
        return chatClient
                .prompt()
                .system(promptSystemSpec -> promptSystemSpec.text(systemPrompt)
                        .param("context",similarContext))
                .user(question)
                .call()
                .content();
    }
}
