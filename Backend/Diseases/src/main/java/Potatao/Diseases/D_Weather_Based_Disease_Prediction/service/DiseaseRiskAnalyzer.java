package Potatao.Diseases.D_Weather_Based_Disease_Prediction.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
@Service
public class DiseaseRiskAnalyzer {

    public Map<String, Object> analyze(JSONObject weather) {

        var hourly = weather.getJSONObject("hourly");
        var humidity = hourly.getJSONArray("relativehumidity_2m");
        var rain = hourly.getJSONArray("precipitation_probability");
        var tempList = hourly.getJSONArray("temperature_2m");

        // Real-time temperature
        double currentTemp = weather.getJSONObject("current_weather").getDouble("temperature");

        boolean highHumidity = false;
        boolean rainingSoon = false;
        double avgTemp = 0;

        for (int i = 0; i < 48; i++) {
            if (humidity.getDouble(i) > 85) highHumidity = true;
            if (rain.getDouble(i) > 50) rainingSoon = true;
            avgTemp += tempList.getDouble(i);
        }

        avgTemp = avgTemp / 48.0;

        // ---------- ADVANCED SCORING ----------
        int score = 0;

        // Humidity scoring
        if (humidity.getDouble(0) > 85) score += 40;

        // Temperature scoring for Late Blight
        if (currentTemp >= 10 && currentTemp <= 26) {
            score += 40; // best temperature for Late Blight
        } else {
            score += 10; // still possible but not perfect
        }

        // Rain scoring
        if (rainingSoon) score += 20;

        String diseaseProbability = score + "%";

        StringBuilder risk = new StringBuilder();

        if (score >= 70) {
            risk.append("⚠️ High chance of Late Blight (").append(score).append("%).\n");
        } else if (score >= 40) {
            risk.append("⚠️ Moderate risk of Late Blight (").append(score).append("%).\n");
        } else {
            risk.append("✔️ Low disease risk (").append(score).append("%).\n");
        }

        // Spray window detection
        String sprayWindow = rainingSoon ?
                "⛔ Rain expected soon — Do NOT spray now. Wait 48 hours." :
                "✔️ No rain for next hours — Safe to spray in next 24 hours.";

        Map<String, Object> map = new HashMap<>();
        map.put("risk", risk.toString());
        map.put("temperature_current", currentTemp);
        map.put("temperature_avg", avgTemp);
        map.put("probability", diseaseProbability);
        map.put("sprayWindow", sprayWindow);

        return map;
    }
}