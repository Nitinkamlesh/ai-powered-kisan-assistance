package Potatao.Diseases.A_Image_Prediction.config;

import Potatao.Diseases.A_Image_Prediction.advisors.TokenUsageAuditAdvisor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class ChatClientConfig {
    @Bean
    @Primary
    public ChatClient chatClient(ChatClient.Builder chatClientBuilder){
        ChatOptions chatOptions = ChatOptions.builder()
                .temperature(0.2)  // factual answer
                .maxTokens(700)
                .topP(0.9)
                .presencePenalty(0.2)
                .frequencyPenalty(0.2)
                .build();
 return chatClientBuilder
                .defaultOptions(chatOptions)
                .defaultAdvisors(new SimpleLoggerAdvisor(), new TokenUsageAuditAdvisor())
                .build();
    }
}
