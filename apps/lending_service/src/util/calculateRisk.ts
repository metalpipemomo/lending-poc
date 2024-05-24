// export type RiskCategory = "Low Risk" | "Medium Risk" | "High Risk";

export function calculateRiskScore(
    principal: number, 
    creditScore: number, 
    pMin: number = 500, 
    pMax: number = 1000000, 
    cMin: number = 300, 
    cMax: number = 850
): String {
    let cNorm = (creditScore - cMin) / (cMax - cMin);
    if (cNorm === 0) {
        cNorm = 0.01;
    }

    const pNorm = (principal - pMin) / (pMax - pMin);

    const riskScore = (pNorm / cNorm) * 100;

    let category: String;
    if (riskScore < 25) {
        category = "Low Risk";
    } else if (25 <= riskScore && riskScore < 50) {
        category = "Medium Risk";
    } else {
        category = "High Risk";
    }

    return category;
}

export default calculateRiskScore;