package Potatao.Diseases.A_Image_Prediction.service;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FastApiService {
    private static final String FASTAPI_URL = "http://localhost:8000/predict";

    public String getPrediction(MultipartFile file) throws IOException {
        RestTemplate restTemplate = new RestTemplate();

        // Prepare the file to send
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        //Create Body with file
        LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file",new ByteArrayResource(file.getBytes()){
            @Override
            public String getFilename(){
                return file.getOriginalFilename();
            }
        });

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body,headers);

        // Send POST request
        ResponseEntity<String> response = restTemplate.postForEntity(FASTAPI_URL,requestEntity, String.class);
        return response.getBody();

    }
}
