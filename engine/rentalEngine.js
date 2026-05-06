const cities = require('../data/cities');

function analyzeRental({ city, location, bhk, superArea, price }) {
  const cityData = cities[city];
  if (!cityData) return { score: 60, expectedMonthlyRent: 0, rentalYield: 3, paybackYears: 30, expectedAnnualRent: 0, explanation: "City unavailable." };
  const sectorData = cityData.sectors[location] || cityData.sectors["DEFAULT"];

  let yieldRate = cityData.rentalYield;
  if (sectorData.itHub <= 2) yieldRate += 0.5;
  else if (sectorData.itHub >= 6) yieldRate -= 0.4;
  if (sectorData.metro <= 1) yieldRate += 0.3;

  const annualRent = (price * yieldRate) / 100;
  const monthlyRent = Math.round(annualRent / 12);
  const rentPerSqftMap = { Noida: 22, Bangalore: 28, Mumbai: 55, Delhi: 35, Gurgaon: 32, Pune: 24, Hyderabad: 22, Chennai: 23 };
  const rentPerSqft = rentPerSqftMap[city] || 25;
  const benchmarkRent = Math.round(rentPerSqft * superArea * (sectorData.itHub <= 2 ? 1.2 : 1.0));
  const finalRent = Math.round((monthlyRent + benchmarkRent) / 2);
  const finalYield = +(((finalRent * 12) / price) * 100).toFixed(2);
  const paybackYears = Math.round(price / (finalRent * 12));

  return {
    expectedMonthlyRent: finalRent,
    expectedAnnualRent: finalRent * 12,
    rentalYield: finalYield,
    paybackYears,
    score: finalYield >= 4 ? 90 : finalYield >= 3.2 ? 75 : finalYield >= 2.5 ? 60 : 45,
    explanation: `Expected rent ₹${finalRent.toLocaleString('en-IN')}/month for ${bhk} BHK, ${superArea} sqft in ${location}. Annual yield ${finalYield}% — ${finalYield >= 4 ? "excellent (above India average)" : finalYield >= 3 ? "healthy (at par with city average)" : "below average (typical for premium segments)"}. ${sectorData.itHub <= 2 ? "Proximity to IT hub boosts rental demand. " : ""}Capital payback ~${paybackYears} years via rent alone.`
  };
}
module.exports = { analyzeRental };