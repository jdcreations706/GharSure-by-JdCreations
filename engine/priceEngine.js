const cities = require('../data/cities');

function analyzePrice({ city, location, superArea, price, builderTier }) {
  const cityData = cities[city];
  if (!cityData) {
    return { userPricePerSqft: Math.round(price/superArea), score: 60, verdict: "🟡 City data unavailable",
      explanation: `City "${city}" not in GharSure database — using generic benchmarks.`,
      marketRange: { min: 6000, max: 12000, fair: 9000 }, deviation: "0" };
  }
  const sectorData = cityData.sectors[location] || cityData.sectors["DEFAULT"];
  let { min, max } = sectorData;
  const tierMult = { "Luxury": 1.15, "Premium": 1.05, "Mid-Premium": 1.0, "Caution": 0.85, "Avoid": 0.75, "Unknown": 0.95 };
  const m = tierMult[builderTier] || 1.0;
  min = Math.round(min * m); max = Math.round(max * m);

  const userPricePerSqft = Math.round(price / superArea);
  const fairPrice = Math.round((min + max) / 2);
  const deviation = ((userPricePerSqft - fairPrice) / fairPrice) * 100;

  let verdict, score;
  if (userPricePerSqft < min) { verdict = "🟢 Underpriced — Strong Deal"; score = 95; }
  else if (userPricePerSqft <= fairPrice) { verdict = "🟢 Fair Price (Below Average)"; score = 85; }
  else if (userPricePerSqft <= max) { verdict = "🟡 Fair Price (Above Average)"; score = 70; }
  else if (deviation <= 15) { verdict = "🟠 Slightly Overpriced"; score = 55; }
  else { verdict = "🔴 Significantly Overpriced"; score = 35; }

  return {
    userPricePerSqft,
    marketRange: { min, max, fair: fairPrice },
    deviation: deviation.toFixed(1),
    verdict, score,
    explanation: `Your price of ₹${userPricePerSqft.toLocaleString('en-IN')}/sqft is ${deviation > 0 ? deviation.toFixed(1) + '% above' : Math.abs(deviation).toFixed(1) + '% below'} the fair market average of ₹${fairPrice.toLocaleString('en-IN')}/sqft for ${location}, ${city}. Market range: ₹${min.toLocaleString('en-IN')}–₹${max.toLocaleString('en-IN')}/sqft (adjusted for ${builderTier} builder tier).`
  };
}
module.exports = { analyzePrice };