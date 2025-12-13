package Potatao.Diseases.C_Auto_Spray_Recommendation.model;

public class SprayRequest {

    private double area;        // Area value (e.g., 1.5)
    private String unit;        // bigha / acre / hectare
    private String disease;     // Disease name
    private int pumpSize;       // Pump size in litres (user input)
    private int pumpRequired;   // Pump count (user input)

    // ----------- DEFAULT CONSTRUCTOR -----------
    public SprayRequest() {}

    // ----------- PARAMETERIZED CONSTRUCTOR -----------
    public SprayRequest(double area, String unit, String disease, int pumpSize, int pumpRequired) {
        this.area = area;
        this.unit = unit;
        this.disease = disease;
        this.pumpSize = pumpSize;
        this.pumpRequired = pumpRequired;
    }

    // ----------- GETTERS -----------
    public double getArea() {
        return area;
    }

    public String getUnit() {
        return unit;
    }

    public String getDisease() {
        return disease;
    }

    public int getPumpSize() {
        return pumpSize;
    }

    public int getPumpRequired() {
        return pumpRequired;
    }

    // ----------- SETTERS -----------
    public void setArea(double area) {
        this.area = area;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public void setPumpSize(int pumpSize) {
        this.pumpSize = pumpSize;
    }

    public void setPumpRequired(int pumpRequired) {
        this.pumpRequired = pumpRequired;
    }

    // ----------- AREA CONVERTER HELPER -----------
    public double getAreaInBigha() {
        if (unit == null) return area;

        switch (unit.toLowerCase()) {
            case "acre":
                return area * 3.0;   // 1 acre ≈ 3 bigha
            case "hectare":
                return area * 6.0;   // 1 hectare ≈ 6 bigha
            default:
                return area;         // default = bigha
        }
    }
}
