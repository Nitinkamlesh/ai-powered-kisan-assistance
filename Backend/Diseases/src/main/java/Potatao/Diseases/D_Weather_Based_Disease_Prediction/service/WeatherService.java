package Potatao.Diseases.D_Weather_Based_Disease_Prediction.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    private final RestTemplate rest = new RestTemplate();

    public JSONObject getWeather(double lat, double lon) {
        String url =
                "https://api.open-meteo.com/v1/forecast?latitude=" + lat +
                        "&longitude=" + lon +
                        "&current_weather=true" +
                        "&hourly=relativehumidity_2m,precipitation_probability,temperature_2m" +
                        "&forecast_hours=48";

        return new JSONObject(rest.getForObject(url, String.class));
    }
}
