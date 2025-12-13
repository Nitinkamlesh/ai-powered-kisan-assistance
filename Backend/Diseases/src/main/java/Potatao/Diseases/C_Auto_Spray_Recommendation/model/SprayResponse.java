package Potatao.Diseases.C_Auto_Spray_Recommendation.model;

public class SprayResponse {

    private final String disease;
    private final String sprayName;    // FIXED NAME
    private final String pumpSize;
    private final int pumpRequired;
    private final int qtyPerPump;
    private final int totalChemical;

    public SprayResponse(
            String disease,
            String sprayName,
            String pumpSize,
            int pumpRequired,
            int qtyPerPump,
            int totalChemical
    ) {
        this.disease = disease;
        this.sprayName = sprayName;
        this.pumpSize = pumpSize;
        this.pumpRequired = pumpRequired;
        this.qtyPerPump = qtyPerPump;
        this.totalChemical = totalChemical;
    }

    public String getDisease() { return disease; }
    public String getSprayName() { return sprayName; }  // FIXED
    public String getPumpSize() { return pumpSize; }
    public int getPumpRequired() { return pumpRequired; }
    public int getQtyPerPump() { return qtyPerPump; }
    public int getTotalChemical() { return totalChemical; }
}
