package Potatao.Diseases.D_Weather_Based_Disease_Prediction.controller;

import Potatao.Diseases.D_Weather_Based_Disease_Prediction.service.AIService;
import Potatao.Diseases.D_Weather_Based_Disease_Prediction.service.DiseaseRiskAnalyzer;
import Potatao.Diseases.D_Weather_Based_Disease_Prediction.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
@RestController
@RequestMapping("/api")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @Autowired
    private DiseaseRiskAnalyzer analyzer;

    @Autowired
    private AIService ai;

    @GetMapping("/weather-prediction")
    public Map<String, Object> getPrediction(@RequestParam double lat,
                                             @RequestParam double lon) {

        var weather = weatherService.getWeather(lat, lon);
        var data = analyzer.analyze(weather);

        var aiSuggestion = ai.getAISuggestion(
                data.get("risk").toString() +
                        " Current Temperature: " + data.get("temperature_current") +
                        "°C. Avg Temp: " + data.get("temperature_avg") +
                        "°C. Probability: " + data.get("probability")
        );

        return Map.of(
                "risk", data.get("risk"),
                "temperature_current", data.get("temperature_current") + " °C",
                "temperature_avg", data.get("temperature_avg") + " °C",
                "probability", data.get("probability"),
                "sprayWindow", data.get("sprayWindow"),
                "aiAdvice", aiSuggestion
        );
    }
}
