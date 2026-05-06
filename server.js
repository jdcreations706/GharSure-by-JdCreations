const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// ── City database ────────────────────────────────────────────────────────────
const CITY_DATA = {
  noida: { pricePerCarpet: 5500, floodRisk: "Low", metroLine: "Aqua Line / Blue Line", appreciation: "6–8%", rentalYield: "2.8–3.2%", topAreas: ["Sector 150", "Sector 137", "Sector 78"], concerns: "Check Yamuna flood plain proximity in sectors below 50. Verify NPCL power supply." },
  gurgaon: { pricePerCarpet: 9000, floodRisk: "Low–Moderate", metroLine: "Yellow Line / Rapid Metro", appreciation: "8–11%", rentalYield: "3.0–3.6%", topAreas: ["Golf Course Road", "DLF Phase 5", "Sector 65"], concerns: "Waterlogging in sectors 45–56 in monsoon. Verify DLF Cyber City commute time." },
  gurugram: { pricePerCarpet: 9000, floodRisk: "Low–Moderate", metroLine: "Yellow Line / Rapid Metro", appreciation: "8–11%", rentalYield: "3.0–3.6%", topAreas: ["Golf Course Road", "DLF Phase 5", "New Gurugram"], concerns: "Waterlogging in older sectors in monsoon. Power cuts in some areas. Verify DDJAY vs RERA." },
  bangalore: { pricePerCarpet: 7200, floodRisk: "Low", metroLine: "Purple Line / Green Line", appreciation: "7–9%", rentalYield: "3.2–3.8%", topAreas: ["Whitefield", "Sarjapur Road", "Hebbal"], concerns: "Traffic on ORR severe — Whitefield to CBD can be 2+ hrs. Verify BWSSB water connection." },
  mumbai: { pricePerCarpet: 15000, floodRisk: "High in coastal/low areas", metroLine: "Metro Lines 1/2/7/9", appreciation: "5–7%", rentalYield: "3.5–4.2%", topAreas: ["Powai", "Thane", "Navi Mumbai"], concerns: "Flood-prone: Kurla, Andheri, Sion. Verify NDMA zone. Stamp duty 5–6% adds upfront cost." },
  pune: { pricePerCarpet: 6800, floodRisk: "Low–Moderate", metroLine: "Pune Metro Line 1 and 2", appreciation: "7–9%", rentalYield: "3.0–3.6%", topAreas: ["Baner", "Hinjewadi", "Kharadi"], concerns: "Hinjewadi IT traffic severe. Verify PMC vs PCMC jurisdiction for services." },
  hyderabad: { pricePerCarpet: 6200, floodRisk: "Moderate", metroLine: "Hyderabad Metro Red/Blue/Green", appreciation: "9–12%", rentalYield: "3.4–4.0%", topAreas: ["Gachibowli", "Kondapur", "Miyapur"], concerns: "Lake proximity risk — verify GHMC approval and lake buffer zone." },
  chennai: { pricePerCarpet: 6500, floodRisk: "Moderate–High cyclone season", metroLine: "Chennai Metro Line 1 and 2", appreciation: "6–8%", rentalYield: "3.2–3.8%", topAreas: ["OMR", "Anna Nagar", "Velachery"], concerns: "Cyclone and flood risk coastal areas. OMR traffic severe. Verify CMDA approval." },
  delhi: { pricePerCarpet: 9000, floodRisk: "Moderate Yamuna flood plains", metroLine: "All Delhi Metro Lines", appreciation: "5–7%", rentalYield: "2.5–3.0%", topAreas: ["Dwarka", "Rohini", "Vasant Kunj"], concerns: "Pollution AQI 300+ in winter. Yamuna flood plain areas risky." },
  kolkata: { pricePerCarpet: 5200, floodRisk: "Moderate", metroLine: "Kolkata Metro Green/Purple Line", appreciation: "4–6%", rentalYield: "3.0–3.5%", topAreas: ["New Town", "Rajarhat", "EM Bypass"], concerns: "Waterlogging common South Kolkata. Verify KMC sanction." },
  ahmedabad: { pricePerCarpet: 4800, floodRisk: "Low", metroLine: "Ahmedabad Metro Phase 1 and 2", appreciation: "7–9%", rentalYield: "3.2–3.8%", topAreas: ["SG Highway", "Prahlad Nagar", "Bopal"], concerns: "Sabarmati river proximity — verify flood zone for riverside projects." }
};

// ── Builder database ─────────────────────────────────────────────────────────
const BUILDER_DATA = {
  dlf: { score: 90, delivery: "92%", complaints: "8 per 1000 units", note: "India's largest listed developer. Strong track record in luxury and commercial. Excellent resale value across projects." },
  prestige: { score: 88, delivery: "90%", complaints: "6 per 1000 units", note: "South India's premium developer. Excellent delivery record. Strong resale and RERA compliance." },
  godrej: { score: 87, delivery: "91%", complaints: "5 per 1000 units", note: "Backed by Godrej Group. Strong construction quality and legal compliance. Good RERA track record." },
  tata: { score: 89, delivery: "93%", complaints: "4 per 1000 units", note: "Tata Housing — highest trust score. Excellent legal compliance, no major RERA violations. Premium quality." },
  lodha: { score: 82, delivery: "85%", complaints: "15 per 1000 units", note: "Large Mumbai developer. Some past delivery delays — verify specific project timeline. Good quality construction." },
  sobha: { score: 85, delivery: "88%", complaints: "7 per 1000 units", note: "Premium South India builder. Self-manufacturing model ensures quality. Strong NRI buyer base and resale market." },
  brigade: { score: 83, delivery: "87%", complaints: "9 per 1000 units", note: "Reputable Bangalore developer. Mixed-use expertise. Good RERA compliance. Strong brand in South India." },
  mahindra: { score: 80, delivery: "84%", complaints: "11 per 1000 units", note: "Mahindra Lifespaces — solid mid-premium developer. Some timeline slippage on larger projects." },
  oberoi: { score: 86, delivery: "89%", complaints: "5 per 1000 units", note: "Ultra-premium Mumbai developer. Exceptional construction quality. Very limited complaints. Strong resale premium." },
  ats: { score: 72, delivery: "78%", complaints: "22 per 1000 units", note: "NCR-focused developer. Some past delays reported. Verify specific project RERA status and delivery timeline." },
  gaur: { score: 65, delivery: "70%", complaints: "35 per 1000 units", note: "NCR builder with mixed reviews. Multiple RERA complaints on record. Independently verify project status." },
  "signature global": { score: 68, delivery: "74%", complaints: "28 per 1000 units", note: "Gurgaon affordable housing developer. DDJAY scheme specialist. Moderate complaints. Verify project RERA and delivery date." },
  m3m: { score: 74, delivery: "76%", complaints: "24 per 1000 units", note: "Gurgaon luxury developer. Some past delivery delays on premium projects. Good construction quality." },
  puravankara: { score: 78, delivery: "82%", complaints: "14 per 1000 units", note: "South India developer with good track record. Moderate RERA complaints. Verify OC for ready-to-move." },
  "kolte patil": { score: 76, delivery: "80%", complaints: "16 per 1000 units", note: "Pune-based reliable developer. Generally good delivery. Verify OC status for specific project." },
  supertech: { score: 10, delivery: "15%", complaints: "500+ per 1000 units", note: "CRITICAL — Supreme Court ordered demolition of Emerald Court. Multiple NCLT proceedings. DO NOT invest." },
  amrapali: { score: 10, delivery: "15%", complaints: "500+ per 1000 units", note: "CRITICAL — Under NBCC takeover by Supreme Court. Thousands of buyers affected. DO NOT invest." },
  unitech: { score: 10, delivery: "15%", complaints: "400+ per 1000 units", note: "CRITICAL — Board superseded by government. Active IBC proceedings. DO NOT invest." }
};

function getCityData(city) {
  const c = city.toLowerCase().trim();
  return Object.entries(CITY_DATA).find(([k]) => c.includes(k))?.[1] || null;
}
function getBuilderData(builder) {
  const b = builder.toLowerCase().trim();
  return Object.entries(BUILDER_DATA).find(([k]) => b.includes(k))?.[1] || null;
}

function generateReport(price, builder, city, locality, carpet, sba, status) {
  const loadingFactor = (carpet / sba * 100);
  const pricePerCarpet = Math.round((price * 100000) / carpet);
  const pricePerSba = Math.round((price * 100000) / sba);
  const cityData = getCityData(city);
  const builderData = getBuilderData(builder);
  const benchmark = cityData?.pricePerCarpet || 6500;
  const priceDiff = ((pricePerCarpet - benchmark) / benchmark * 100);
  const fairValueLakh = Math.round((benchmark * carpet) / 100000);
  const overPayLakh = Math.max(0, Math.round(price - fairValueLakh));

  const valuationScore = priceDiff <= 0 ? 92 : priceDiff <= 10 ? 82 : priceDiff <= 20 ? 68 : priceDiff <= 30 ? 52 : priceDiff <= 40 ? 38 : 22;
  const builderScore = builderData?.score || 60;
  const legalScore = builderScore >= 85 ? 88 : builderScore >= 75 ? 78 : builderScore >= 60 ? 62 : 42;
  const carpetScore = loadingFactor >= 80 ? 92 : loadingFactor >= 75 ? 82 : loadingFactor >= 70 ? 68 : loadingFactor >= 65 ? 52 : 36;
  const neighScore = cityData ? 72 : 60;
  const resaleScore = builderScore >= 85 ? 86 : builderScore >= 75 ? 76 : builderScore >= 60 ? 64 : 44;
  const finalScore = Math.round(valuationScore*0.25 + builderScore*0.25 + legalScore*0.20 + carpetScore*0.10 + neighScore*0.10 + resaleScore*0.10);
  const grade = finalScore >= 85 ? "A" : finalScore >= 70 ? "B" : finalScore >= 55 ? "C" : finalScore >= 40 ? "D" : "F";

  const valuationFinding = cityData
    ? `Asking ₹${pricePerCarpet.toLocaleString('en-IN')}/sqft carpet basis. ${city} benchmark ₹${benchmark.toLocaleString('en-IN')}/sqft. You are paying ${priceDiff > 0 ? Math.round(priceDiff)+'% above' : Math.abs(Math.round(priceDiff))+'% below'} market. Fair value: ₹${fairValueLakh}L. ${overPayLakh > 0 ? `Potential overpayment: ₹${overPayLakh} lakh.` : 'Fairly priced.'}`
    : `Asking ₹${pricePerCarpet.toLocaleString('en-IN')}/sqft carpet basis. Using national average benchmark ₹${benchmark.toLocaleString('en-IN')}/sqft. Verify local circle rate independently.`;

  const builderFinding = builderData
    ? `${builder} scores ${builderScore}/100. On-time delivery: ${builderData.delivery}. RERA complaints: ${builderData.complaints}. ${builderData.note}`
    : `${builder} not in GharSure database. Manually verify: RERA registration on state portal, past delivery history, and any NCLT proceedings before payment.`;

  const legalFinding = `${legalScore >= 80 ? 'Known builder with good RERA compliance.' : legalScore >= 60 ? 'Moderate legal risk — verify RERA registration number independently.' : 'High legal risk — mandatory legal due diligence before any payment.'} ${status === 'ready to move' ? 'Verify OC (Occupancy Certificate) is issued — illegal to occupy without it.' : 'Verify RERA registration is active and not expired. Check escrow account status.'} Always get Encumbrance Certificate before signing.`;

  const wastedSqft = sba - carpet;
  const carpetFinding = `Loading factor ${loadingFactor.toFixed(1)}% — ${carpet.toLocaleString()} sqft livable out of ${sba.toLocaleString()} sqft paid. ${wastedSqft.toLocaleString()} sqft (${(100-loadingFactor).toFixed(1)}%) goes to common areas. Effective cost ₹${pricePerCarpet.toLocaleString('en-IN')}/sqft vs advertised ₹${pricePerSba.toLocaleString('en-IN')}/sqft. ${loadingFactor >= 75 ? 'Good ratio — above RERA minimum.' : loadingFactor >= 70 ? 'Acceptable — at RERA minimum.' : 'Poor ratio — strong negotiation point.'}`;

  const neighFinding = cityData
    ? `${locality || city} — metro via ${cityData.metroLine}. Flood risk: ${cityData.floodRisk}. Appreciation: ${cityData.appreciation} annually. ${cityData.concerns}`
    : `${locality || city} — verify metro/hospital/school proximity and daily commute time before deciding.`;

  const resaleFinding = cityData
    ? `${cityData.appreciation} annual appreciation projected. Rental yield ${cityData.rentalYield} — monthly rent ≈ ₹${Math.round(price * parseFloat(cityData.rentalYield) * 1000 / 12 / 100).toLocaleString('en-IN')} on ₹${price}L. ${builderData ? `${builder} properties command 8–12% resale premium.` : 'Verify recent transaction velocity in this locality.'}`
    : `Verify recent transaction prices and appreciation trend in ${locality || city} before investing.`;

  const risks = [];
  if (priceDiff > 10) risks.push(`Price ${Math.round(priceDiff)}% above area average — ₹${overPayLakh}L potential overpayment`);
  if (loadingFactor < 70) risks.push(`Loading factor only ${loadingFactor.toFixed(1)}% — paying ₹${pricePerCarpet.toLocaleString('en-IN')}/sqft effective vs advertised ₹${pricePerSba.toLocaleString('en-IN')}/sqft`);
  if (!builderData) risks.push(`${builder} not in verified database — independently verify RERA registration`);
  else if (builderScore < 70) risks.push(`Builder score ${builderScore}/100 — ${builderData.complaints} RERA complaints, verify project-specific status`);
  if (status !== 'ready to move') risks.push(`Under construction — verify RERA expiry and construction milestones`);
  if (cityData?.floodRisk?.includes('High')) risks.push(`High flood risk area — verify NDMA zone for this specific plot`);
  const uniqueRisks = [...new Set(risks)].slice(0, 3);
  while (uniqueRisks.length < 3) uniqueRisks.push(`Get independent legal opinion before signing any property above ₹50L`);

  const positives = [];
  if (builderScore >= 82) positives.push(`${builder} strong reputation ${builderScore}/100 — ${builderData?.delivery} on-time delivery`);
  if (status === 'ready to move') positives.push(`Ready to move — no construction risk, immediate possession`);
  if (loadingFactor >= 75) positives.push(`Good carpet ratio ${loadingFactor.toFixed(1)}% — efficient usable space`);
  if (priceDiff <= 5) positives.push(`Price at or near ${city} market rate — fairly valued`);
  if (cityData?.appreciation?.includes('9') || cityData?.appreciation?.includes('10') || cityData?.appreciation?.includes('11')) positives.push(`${city} among top-appreciating markets in India — ${cityData.appreciation} annually`);
  const uniquePositives = [...new Set(positives)].slice(0, 3);
  while (uniquePositives.length < 2) uniquePositives.push(`${city} remains a solid residential market with good long-term fundamentals`);

  const negoReduction = Math.max(2, Math.round(overPayLakh * 0.6));
  const negotiation = `3 negotiation arguments — use in this order:
1. PRICE: Area rate ₹${benchmark.toLocaleString('en-IN')}/sqft carpet. Fair value = ₹${fairValueLakh}L. Push for ₹${Math.max(fairValueLakh, price - negoReduction)}–${price - Math.round(negoReduction*0.4)}L. Show carpet-basis calculation.
2. LOADING FACTOR: Only ${loadingFactor.toFixed(1)}% efficiency. Say: "At 75% standard I'm paying for ${Math.round(sba*0.75)} sqft not ${sba} sqft. Adjust price."
3. FREEBIES: If price won't move — demand covered parking (₹3–5L), 2-year maintenance prepaid (₹1–2L), club membership (₹1L), modular kitchen (₹2–3L). Total ₹7–11L in concessions.`;

  return {
    scores: {
      valuation: { score: valuationScore, finding: valuationFinding },
      builder: { score: builderScore, finding: builderFinding },
      legal: { score: legalScore, finding: legalFinding },
      carpet_ratio: { score: carpetScore, finding: carpetFinding },
      neighbourhood: { score: neighScore, finding: neighFinding },
      resale: { score: resaleScore, finding: resaleFinding }
    },
    final_score: finalScore, grade,
    verdict: { A:"Strong buy — checks out well. Proceed with confidence.", B:"Good deal — negotiate on flagged items before signing.", C:`Significant concerns — only proceed if builder gives ₹${negoReduction}L+ concession.`, D:"High risk — consider walking away unless price drops 20%+.", F:"Do not buy — critical risks detected. Consult a lawyer." }[grade],
    top_risks: uniqueRisks, positives: uniquePositives, negotiation,
    hard_stop: builderScore <= 15,
    hard_stop_reason: builderScore <= 15 ? `${builder} has critical risk score. ${builderData?.note}` : "",
    architect_review_needed: finalScore >= 45 && finalScore <= 78,
    _source: "gharsure-v3"
  };
}

app.post("/ai-report", async (req, res) => {
  const { price, builder, city, locality, carpet, sba, status } = req.body;
  if (!price || !builder || !city || !carpet || !sba) return res.status(400).json({ error: "Missing required fields." });
  if (parseInt(carpet) >= parseInt(sba)) return res.status(400).json({ error: "Carpet area must be less than super built-up area." });

  // Try Gemini if key available
  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (GEMINI_KEY) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_KEY}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: `Analyse: builder=${builder}, city=${city}, locality=${locality}, price=Rs${price}L, carpet=${carpet}sqft, sba=${sba}sqft, status=${status}. Return JSON: scores{valuation,builder,legal,carpet_ratio,neighbourhood,resale each with score 0-100 and finding}, final_score, grade A-F, verdict, top_risks[], positives[], negotiation, hard_stop bool, hard_stop_reason, architect_review_needed bool. No markdown.` }] }], generationConfig: { temperature: 0.2, maxOutputTokens: 1000 } })
      });
      if (r.ok) {
        const d = await r.json();
        const text = d.candidates?.[0]?.content?.parts?.[0]?.text?.replace(/```json|```/g, "").trim();
        if (text) { console.log("✓ Gemini"); return res.json({ ...JSON.parse(text), _source: "gemini" }); }
      }
    } catch(e) { console.log("Gemini unavailable"); }
  }

  const report = generateReport(parseFloat(price), builder, city, locality, parseInt(carpet), parseInt(sba), status);
  console.log(`✓ GharSure Engine: ${builder}, ${city} → ${report.final_score}/100 Grade ${report.grade}`);
  res.json(report);
});

app.get('/', (req,res) =&gt;{ res.send('Server is up and running!');});
app.get("/health", (req, res) => res.json({ status: "ok", product: "GharSure", version: "3.0.0" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`GharSure running on port ${PORT}`));
