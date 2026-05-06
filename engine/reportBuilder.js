const { analyzePrice } = require('./priceEngine');
const { analyzeBuilder } = require('./builderEngine');
const { analyzeLocation } = require('./locationEngine');
const { analyzeRental } = require('./rentalEngine');
const { analyzeAppreciation } = require('./appreciationEngine');

function carpetEfficiency(carpet, sba) {
  const ratio = (carpet / sba) * 100;
  let score, finding;
  if (ratio >= 75)      { score = 95; finding = `Loading factor is excellent — carpet ratio ${ratio.toFixed(1)}%. You're paying mostly for usable space.`; }
  else if (ratio >= 68) { score = 80; finding = `Loading factor ${(100-ratio).toFixed(1)}% (carpet ratio ${ratio.toFixed(1)}%) — healthy industry standard.`; }
  else if (ratio >= 60) { score = 65; finding = `Loading factor ${(100-ratio).toFixed(1)}% (carpet ratio ${ratio.toFixed(1)}%) — typical for projects with extensive amenities.`; }
  else                  { score = 40; finding = `Loading factor ${(100-ratio).toFixed(1)}% is high (carpet ratio only ${ratio.toFixed(1)}%) — significant loss to common areas. Negotiate hard.`; }
  return { ratio: +ratio.toFixed(1), score, finding };
}

function buildNegotiation(priceA, builderA, totalPrice, city) {
  let pct = 0; const reasons = [];
  const dev = parseFloat(priceA.deviation);
  if (dev > 15) { pct += 8; reasons.push(`overpriced by ${dev.toFixed(1)}% vs area`); }
  else if (dev > 5) { pct += 5; reasons.push(`above market avg`); }
  else if (dev > 0) { pct += 2; reasons.push(`slightly above fair price`); }
  else { pct += 1; }

  if (builderA.score < 50) { pct += 5; reasons.push(`weak builder reputation`); }
  else if (builderA.score < 70) { pct += 3; reasons.push(`mid-tier builder`); }
  else if (builderA.score < 85) pct += 1.5;
  else pct += 0.5;

  const minNeg = Math.max(0, Math.round(totalPrice * (pct - 1.5) / 100));
  const maxNeg = Math.round(totalPrice * (pct + 1) / 100);
  const lakh = (n) => (n / 100000).toFixed(1);

  return `Your strongest negotiation point: price is ₹${priceA.userPricePerSqft.toLocaleString('en-IN')}/sqft vs ${city} fair value of ₹${priceA.marketRange.fair.toLocaleString('en-IN')}/sqft. Estimated negotiation room: ₹${lakh(minNeg)}L–₹${lakh(maxNeg)}L (${(pct-1.5).toFixed(1)}%–${(pct+1).toFixed(1)}%). ${reasons.length ? "Reasoning: " + reasons.join(", ") + ". " : ""}If builder refuses cash discount, push for free car parking, club membership, and 2-year maintenance — typically worth ₹3–5 lakh.`;
}

function buildReport(input) {
  const { city, location, builder, bhk, superArea, carpetArea, price, floor, totalFloors, status } = input;

  const builderA = analyzeBuilder(builder);
  const priceA = analyzePrice({ city, location, superArea, price, builderTier: builderA.tier });
  const locA = analyzeLocation({ city, location });
  const rentA = analyzeRental({ city, location, bhk, superArea, price });
  const apprA = analyzeAppreciation({ city, location, builderTier: builderA.tier });
  const carpetA = carpetEfficiency(carpetArea, superArea);

  // Floor analysis
  let floorScore = 70;
  if (totalFloors > 0 && floor > 0) {
    const r = floor / totalFloors;
    floorScore = (r >= 0.3 && r <= 0.75) ? 90 : (r < 0.3 ? 65 : 80);
  }

  // Legal score (proxy from builder reputation)
  const legalScore = builderA.score >= 80 ? 88 : builderA.score >= 65 ? 72 : builderA.score >= 50 ? 58 : 40;
  const legalFinding = builderA.score >= 80
    ? "Builder typically maintains clean RERA registrations. Verify project-specific RERA ID, OC status, and title clearance before final payment."
    : "Independently verify RERA registration, OC, EC, and title before any payment. Strongly consider legal review.";

  // Final weighted score
  const finalScore = Math.round(
    priceA.score      * 0.25 +
    builderA.score    * 0.22 +
    legalScore        * 0.15 +
    locA.overallLocationScore * 0.12 +
    apprA.score       * 0.10 +
    rentA.score       * 0.08 +
    carpetA.score     * 0.05 +
    floorScore        * 0.03
  );

  const grade = finalScore >= 85 ? "A" : finalScore >= 70 ? "B" : finalScore >= 55 ? "C" : finalScore >= 40 ? "D" : "F";
  const verdictMap = {
    A: "Strong buy — proceed with confidence",
    B: "Acceptable — negotiate on the flagged items",
    C: "Caution — significant risks, negotiate hard or walk away",
    D: "High risk — only buy with a major price cut",
    F: "Do not buy — serious concerns detected"
  };

  // Top risks
  const top_risks = [];
  if (parseFloat(priceA.deviation) > 10) top_risks.push(`Price is ${priceA.deviation}% above area fair value — overpayment risk`);
  if (carpetA.score < 65) top_risks.push(`Carpet ratio only ${carpetA.ratio}% — paying for unusable common area`);
  if (builderA.score < 70) top_risks.push(`Builder reputation ${builderA.score}/100 — verify RERA & past delivery independently`);
  if (rentA.rentalYield < 3) top_risks.push(`Rental yield ${rentA.rentalYield}% is below average — weak cash flow if renting out`);
  if (locA.scores.metro && locA.scores.metro < 6) top_risks.push(`Metro is ${locA.distances.metro} away — may impact long-term resale`);
  while (top_risks.length < 3) top_risks.push("Verify project-specific RERA ID and Occupancy Certificate at signing");
  top_risks.length = 3;

  // Positives
  const positives = [];
  if (builderA.score >= 85) positives.push(`${builderA.name} is a Premium-tier builder — strong delivery & resale value`);
  if (locA.scores.metro >= 8) positives.push(`Excellent metro connectivity (${locA.distances.metro}) — high rental demand`);
  if (locA.scores.itHub >= 8) positives.push(`IT hub at ${locA.distances.itHub} — prime for working professionals`);
  if (apprA.expectedAnnualGrowth >= 9) positives.push(`Strong appreciation forecast (${apprA.expectedAnnualGrowth}% CAGR) — capital growth play`);
  if (priceA.score >= 80) positives.push(`Priced at/below fair market value — good entry point`);
  if (carpetA.score >= 80) positives.push(`Healthy carpet efficiency (${carpetA.ratio}%) — value for money on usable space`);
  if (positives.length === 0) positives.push(`Property status: ${status || 'ready to move'} — no construction risk`);
  if (positives.length < 2) positives.push(`${apprA.expectedAnnualGrowth}% projected annual appreciation in ${city}`);

  // Hard stop
  const hardStop = builderA.tier === "Avoid";
  const hardStopReason = hardStop ? `${builderA.name} is on GharSure's AVOID list. ${builderA.explanation}` : "";

  // Architect review
  const architectReview = finalScore >= 50 && finalScore < 75;

  return {
    scores: {
      valuation:     { score: priceA.score,                finding: priceA.explanation },
      builder:       { score: builderA.score,              finding: builderA.explanation },
      legal:         { score: legalScore,                  finding: legalFinding },
      carpet_ratio:  { score: carpetA.score,               finding: carpetA.finding },
      neighbourhood: { score: locA.overallLocationScore,   finding: locA.explanation },
      resale:        { score: apprA.score,                 finding: `${apprA.expectedAnnualGrowth}% annual appreciation projected. ${builderA.score >= 80 ? 'Branded builder commands resale premium.' : 'Verify recent transaction velocity in this area.'} Rental yield ${rentA.rentalYield}%, payback ~${rentA.paybackYears} years.` }
    },
    final_score: finalScore,
    grade,
    verdict: verdictMap[grade],
    top_risks: top_risks.slice(0, 3),
    positives: positives.slice(0, 3),
    negotiation: buildNegotiation(priceA, builderA, price, city),
    hard_stop: hardStop,
    hard_stop_reason: hardStopReason,
    architect_review_needed: architectReview
  };
}

module.exports = { buildReport };