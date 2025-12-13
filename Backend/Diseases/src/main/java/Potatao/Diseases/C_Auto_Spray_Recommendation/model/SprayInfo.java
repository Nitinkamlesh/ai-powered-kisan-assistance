package Potatao.Diseases.C_Auto_Spray_Recommendation.model;

public class SprayInfo {

    private final String chemical;
    private final double dosePerLitre;   // grams or ml per litre
    private final int pumpSize;          // in litres (e.g., 15L pump)

    public SprayInfo(String chemical, double dosePerLitre, int pumpSize) {
        this.chemical = chemical;
        this.dosePerLitre = dosePerLitre;
        this.pumpSize = pumpSize;
    }

    public String getChemical() {
        return chemical;
    }

    public double getDosePerLitre() {
        return dosePerLitre;
    }

    public int getPumpSize() {
        return pumpSize;
    }
}
