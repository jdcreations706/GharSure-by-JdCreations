const cities = require('../data/cities');

function analyzeLocation({ city, location }) {
  const cityData = cities[city];
  if (!cityData) return { overallLocationScore: 65, scores: {}, distances: {}, neighborhood: {}, explanation: `City data unavailable.` };
  const sectorData = cityData.sectors[location] || cityData.sectors["DEFAULT"];
  const isDefault = !cityData.sectors[location];

  const scoreDist = (km, ideal, max) => {
    if (km <= ideal) return 10;
    if (km >= max) return 3;
    return +(10 - ((km - ideal)/(max - ideal)) * 7).toFixed(1);
  };

  const metroScore = scoreDist(sectorData.metro, 1, 5);
  const itHubScore = scoreDist(sectorData.itHub, 2, 10);
  const schoolScore = scoreDist(sectorData.school, 1, 4);
  const hospitalScore = scoreDist(sectorData.hospital, 1, 5);
  const overallLocation = +((metroScore + itHubScore + schoolScore + hospitalScore)/4 * 10).toFixed(0);

  return {
    distances: {
      metro: `${sectorData.metro} km`, itHub: `${sectorData.itHub} km`,
      school: `${sectorData.school} km`, hospital: `${sectorData.hospital} km`
    },
    scores: { metro: metroScore, itHub: itHubScore, school: schoolScore, hospital: hospitalScore,
              safety: sectorData.safety, livability: sectorData.livability },
    overallLocationScore: overallLocation,
    explanation: isDefault
      ? `Location "${location}" not in GharSure detailed database — using ${city} averages. Recommend on-ground visit.`
      : `Located ${sectorData.metro} km from nearest metro, ${sectorData.itHub} km from major IT hub, ${sectorData.school} km from schools, ${sectorData.hospital} km from hospitals. ${metroScore >= 8 ? "Excellent metro connectivity drives rental demand." : metroScore >= 6 ? "Decent metro access." : "Metro is far — relies on road transport."} ${itHubScore >= 8 ? "Prime location for working professionals." : itHubScore >= 6 ? "Reasonable office commute." : "Long commute to IT hubs may affect rental."}`,
    neighborhood: {
      safety: sectorData.safety,
      safetyText: sectorData.safety >= 8.5 ? "Very Safe — gated community culture, low crime" : sectorData.safety >= 7.5 ? "Safe — well-policed area" : "Moderate — verify security at building level",
      livability: sectorData.livability,
      livabilityText: sectorData.livability >= 9 ? "Premium lifestyle — restaurants, malls, parks all nearby" : sectorData.livability >= 8 ? "Good lifestyle infrastructure" : "Developing area — limited lifestyle options"
    }
  };
}
module.exports = { analyzeLocation };