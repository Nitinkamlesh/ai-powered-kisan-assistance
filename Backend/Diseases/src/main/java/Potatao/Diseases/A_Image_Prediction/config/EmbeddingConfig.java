package Potatao.Diseases.A_Image_Prediction.config;

import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.openai.OpenAiEmbeddingModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class EmbeddingConfig {

    @Bean
    @Primary

    public EmbeddingModel primaryEmbeddingModel(OpenAiEmbeddingModel model){
        return model;
    }
}
