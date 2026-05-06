const cities = require('../data/cities');

function analyzeAppreciation({ city, location, builderTier }) {
  const cityData = cities[city];
  if (!cityData) return { score: 60, expectedAnnualGrowth: 7, fiveYearAppreciation: 40, tenYearAppreciation: 96, upcomingProjects: [], growthDrivers: "", explanation: "City unavailable." };
  const sectorData = cityData.sectors[location] || cityData.sectors["DEFAULT"];

  let baseGrowth = cityData.avgGrowth;
  if (sectorData.metro <= 1) baseGrowth += 1.0;
  if (sectorData.itHub <= 2) baseGrowth += 0.8;
  if (sectorData.livability >= 9) baseGrowth += 0.5;
  if (builderTier === "Luxury" || builderTier === "Premium") baseGrowth += 0.7;
  if (builderTier === "Caution") baseGrowth -= 2.0;
  if (builderTier === "Avoid") baseGrowth -= 4.0;

  const fiveYr = +((Math.pow(1 + baseGrowth/100, 5) - 1) * 100).toFixed(1);
  const tenYr = +((Math.pow(1 + baseGrowth/100, 10) - 1) * 100).toFixed(1);
  const score = baseGrowth >= 10 ? 92 : baseGrowth >= 8 ? 80 : baseGrowth >= 6 ? 65 : baseGrowth >= 3 ? 50 : 30;

  return {
    expectedAnnualGrowth: +baseGrowth.toFixed(1),
    fiveYearAppreciation: fiveYr,
    tenYearAppreciation: tenYr,
    score,
    upcomingProjects: cityData.upcomingProjects,
    growthDrivers: cityData.growthDrivers,
    explanation: `Projected ${baseGrowth.toFixed(1)}% annual appreciation. Base: ${city} CAGR ${cityData.avgGrowth}%${sectorData.metro <= 1 ? ", metro proximity (+1%)" : ""}${sectorData.itHub <= 2 ? ", IT hub adjacency (+0.8%)" : ""}${(builderTier === "Premium" || builderTier === "Luxury") ? ", premium builder (+0.7%)" : ""}. Growth drivers: ${cityData.growthDrivers}. 5-yr: ${fiveYr}%, 10-yr: ${tenYr}%.`
  };
}
module.exports = { analyzeAppreciation };