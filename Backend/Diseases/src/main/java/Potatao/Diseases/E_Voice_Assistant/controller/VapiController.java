package Potatao.Diseases.E_Voice_Assistant.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/vapi")

public class VapiController {

        @PostMapping("/call")
        public ResponseEntity<String> callVapi(@RequestBody String body) {
            try {
                RestTemplate restTemplate = new RestTemplate();

                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", "Bearer YOUR_VAPI_API_KEY");
                headers.setContentType(MediaType.APPLICATION_JSON);

                HttpEntity<String> entity = new HttpEntity<>(body, headers);

                String response = restTemplate.postForObject(
                        "https://api.vapi.ai/call/web",
                        entity,
                        String.class
                );

                return ResponseEntity.ok(response);

            } catch (Exception e) {
                return ResponseEntity.status(500).body(e.getMessage());
            }
        }
    }

