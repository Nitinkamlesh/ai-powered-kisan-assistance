package Potatao.Diseases.A_Image_Prediction.service;

import org.springframework.stereotype.Service;

@Service
public class DiseaseResponse {

    private String diseaseName = "";

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }
}
