package Potatao.Diseases.B_Chat_Box.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.*;
import org.springframework.ai.chat.client.advisor.api.Advisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.memory.repository.jdbc.JdbcChatMemoryRepository;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ChatMemoryChatClientConfig {

    // Chat Memory (Store last 15 messages)
    @Bean
    ChatMemory chatMemory(JdbcChatMemoryRepository jdbcChatMemoryRepository) {
        return MessageWindowChatMemory.builder()
                .maxMessages(15)
                .chatMemoryRepository(jdbcChatMemoryRepository)
                .build();
    }

    // Main ChatClient Bean
    @Bean("chatMemoryChatClient")
    public ChatClient chatMemoryClient(ChatClient.Builder chatClientBuilder,
                                       ChatMemory chatMemory) {

        // AI model options
        ChatOptions chatOptions = ChatOptions.builder()
                .temperature(0.15)         // Keep answers factual
                .maxTokens(100)           // Larger answers for farmers
                .topP(0.9)
                .presencePenalty(0.1)
                .frequencyPenalty(0.1)
                .build();

        // Advisors (Memory + Logging + System Prompt)
        Advisor memoryAdvisor = MessageChatMemoryAdvisor.builder(chatMemory).build();
        Advisor loggerAdvisor = new SimpleLoggerAdvisor();

        // System prompt: control AI behaviour
        Advisor systemPrompt = PromptChatMemoryAdvisor.builder(chatMemory)
                .build();

        return chatClientBuilder
                .defaultOptions(chatOptions)
                .defaultAdvisors(List.of(
                        loggerAdvisor,
                        systemPrompt,
                        memoryAdvisor
                ))
                .build();
    }
}
