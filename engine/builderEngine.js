const builders = require('../data/builders');

function analyzeBuilder(builderName) {
  const input = (builderName || "").toLowerCase().trim();
  const key = Object.keys(builders).find(k => k.toLowerCase() === input) ||
              Object.keys(builders).find(k => k !== "DEFAULT" && input.includes(k.toLowerCase()));
  const data = builders[key] || builders["DEFAULT"];
  return {
    name: key || builderName,
    score: data.score, tier: data.tier,
    breakdown: { delivery: data.delivery, quality: data.quality, trust: data.trust },
    riskLevel: data.riskLevel,
    explanation: data.reasoning,
    recommendation: data.score >= 85 ? "✅ Highly recommended — proceed with confidence."
                  : data.score >= 70 ? "✅ Reliable builder — standard due diligence advised."
                  : data.score >= 55 ? "⚠️ Verify RERA status, visit site, check construction milestones."
                  : "🚨 High risk — strongly recommend legal/RERA verification before booking."
  };
}
module.exports = { analyzeBuilder };