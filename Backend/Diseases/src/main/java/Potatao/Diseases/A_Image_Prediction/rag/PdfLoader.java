package Potatao.Diseases.A_Image_Prediction.rag;

import jakarta.annotation.PostConstruct;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PdfLoader {
    private final VectorStore vectorStore;

    public PdfLoader(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    @Value("classpath:late_Blight.pdf")
    Resource DiseasesPdf;


    @PostConstruct
    public void loadPdf(){
            try {
                Tika tika = new Tika();
                String text = tika.parseToString(DiseasesPdf.getFile());  // PDF ka text extract

                /// 2️⃣ Split text into manageable chunks
                TextSplitter textSplitter = TokenTextSplitter.builder()
                        .withChunkSize(200)      // perfect for text-only documents
                        .withMaxNumChunks(30)    // safe limit
                        .build();

                List<Document> docs = textSplitter.split(List.of(new Document(text)));


                /// 3️⃣ Add documents to Vector Store
                vectorStore.add(docs);


            } catch (TikaException e) {
                throw new RuntimeException(e);
            } catch (Exception e) {
                e.printStackTrace();
            }
    }
}
