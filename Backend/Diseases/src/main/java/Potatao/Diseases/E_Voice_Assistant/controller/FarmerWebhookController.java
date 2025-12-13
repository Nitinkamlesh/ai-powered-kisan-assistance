package Potatao.Diseases.E_Voice_Assistant.controller;

import Potatao.Diseases.E_Voice_Assistant.service.FarmerHelplineService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/vapi")
public class FarmerWebhookController {

    private final FarmerHelplineService helplineService;

    public FarmerWebhookController(FarmerHelplineService helplineService) {
        this.helplineService = helplineService;
    }

    @PostMapping("/farmer-answer")
    public Map<String, Object> farmerAnswer(@RequestBody Map<String, Object> body) {

        System.out.println("Received from VAPI: " + body);

        String question = body.getOrDefault("question", "").toString();

        String answer = helplineService.getAnswer(question);

        // VAPI expects this JSON structure:
        return Map.of("result", answer);
    }
}
