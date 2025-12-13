package Potatao.Diseases.C_Auto_Spray_Recommendation.controller;

import Potatao.Diseases.C_Auto_Spray_Recommendation.model.SprayRequest;
import Potatao.Diseases.C_Auto_Spray_Recommendation.model.SprayResponse;
import Potatao.Diseases.C_Auto_Spray_Recommendation.service.SprayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/spray")
@CrossOrigin("*")
public class SprayController {

    @Autowired
    private SprayService service;

    @PostMapping("/calculate")
    public SprayResponse calculate(@RequestBody SprayRequest request) {

        // Null request safe check
        if (request == null || request.getDisease() == null || request.getDisease().isEmpty()) {
            return new SprayResponse(
                    "Unknown",
                    "No chemical",
                    "N/A",
                    0,
                    0,
                    0
            );
        }

        // Forward to service
        return service.calculateSpray(request);
    }
}
