package Potatao.Diseases.C_Auto_Spray_Recommendation.service;

import Potatao.Diseases.C_Auto_Spray_Recommendation.model.SprayInfo;
import Potatao.Diseases.C_Auto_Spray_Recommendation.model.SprayRequest;
import Potatao.Diseases.C_Auto_Spray_Recommendation.model.SprayResponse;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SprayService {

    private final Map<String, SprayInfo> diseaseMap = new HashMap<>();

    public SprayService() {

        // chemicalName, dosePerLitre, defaultPumpSize (not used now)
        diseaseMap.put("late blight", new SprayInfo("Mancozeb 75%", 2.5, 15));
        diseaseMap.put("early blight", new SprayInfo("Chlorothalonil", 2.0, 15));
        diseaseMap.put("leaf spot", new SprayInfo("Copper Oxychloride", 3.0, 15));
        diseaseMap.put("potassium deficiency", new SprayInfo("Potash Spray", 2.0, 15));
    }

    public SprayResponse calculateSpray(SprayRequest request) {

        SprayInfo info = diseaseMap.get(request.getDisease().toLowerCase());

        if (info == null) {
            return new SprayResponse(
                    request.getDisease(),
                    "Unknown Chemical",
                    "N/A",
                    0,
                    0,
                    0
            );
        }

        // ⭐ Step 1: User pump size
        int pumpSize = request.getPumpSize();  // 15, 18, 20 etc.

        // ⭐ Step 2: User pump count
        int totalPumps = request.getPumpRequired(); // user input

        // ⭐ Step 3: Calculate per pump qty
        double perPumpQty = info.getDosePerLitre() * pumpSize;

        // ⭐ Step 4: Total chemical
        double totalChemical = perPumpQty * totalPumps;

        // ⭐ Round values
        perPumpQty = Math.round(perPumpQty * 100.0) / 100.0;
        totalChemical = Math.round(totalChemical * 100.0) / 100.0;

        return new SprayResponse(
                request.getDisease(),
                info.getChemical(),
                pumpSize + "L",
                totalPumps,
                (int) perPumpQty,
                (int) totalChemical
        );
    }
}
