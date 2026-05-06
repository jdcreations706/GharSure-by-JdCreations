// data/cities.js — GharSure city intelligence database
module.exports = {
  Noida: {
    avgGrowth: 8.5, rentalYield: 3.2,
    sectors: {
      "Sector 62":      { min: 7500,  max: 10500, metro: 0.5, itHub: 1.2, school: 0.8, hospital: 1.5, safety: 8.5, livability: 8.2 },
      "Sector 137":     { min: 6800,  max: 9200,  metro: 1.0, itHub: 2.0, school: 1.2, hospital: 2.5, safety: 8.0, livability: 8.0 },
      "Sector 150":     { min: 8500,  max: 12000, metro: 3.5, itHub: 6.0, school: 2.0, hospital: 3.0, safety: 8.8, livability: 9.0 },
      "Sector 78":      { min: 7200,  max: 9800,  metro: 1.5, itHub: 3.0, school: 1.0, hospital: 2.0, safety: 8.2, livability: 8.3 },
      "Noida Extension":{ min: 4500,  max: 6500,  metro: 4.0, itHub: 8.0, school: 2.5, hospital: 4.0, safety: 7.0, livability: 7.0 },
      "Sector 128":     { min: 11000, max: 16000, metro: 2.0, itHub: 4.0, school: 1.5, hospital: 2.5, safety: 9.0, livability: 9.2 },
      "DEFAULT":        { min: 6500,  max: 9500,  metro: 2.0, itHub: 3.5, school: 1.5, hospital: 2.5, safety: 7.8, livability: 7.8 }
    },
    upcomingProjects: ["Jewar Airport (2025)", "Noida-Greater Noida Metro Extension", "Film City"],
    growthDrivers: "Jewar Airport, FNG Expressway, IT/ITeS expansion"
  },
  Bangalore: {
    avgGrowth: 9.2, rentalYield: 3.8,
    sectors: {
      "Whitefield":     { min: 7500,  max: 11000, metro: 1.5, itHub: 0.5, school: 0.8, hospital: 1.0, safety: 8.5, livability: 8.7 },
      "Electronic City":{ min: 5500,  max: 8500,  metro: 2.0, itHub: 0.3, school: 1.5, hospital: 2.0, safety: 8.0, livability: 7.8 },
      "Sarjapur Road":  { min: 7000,  max: 10500, metro: 4.0, itHub: 2.0, school: 1.0, hospital: 1.5, safety: 8.3, livability: 8.5 },
      "Hebbal":         { min: 9000,  max: 14000, metro: 1.0, itHub: 5.0, school: 1.0, hospital: 1.5, safety: 8.7, livability: 8.8 },
      "Indiranagar":    { min: 14000, max: 22000, metro: 0.3, itHub: 4.0, school: 0.5, hospital: 0.8, safety: 9.0, livability: 9.3 },
      "Koramangala":    { min: 13000, max: 20000, metro: 1.5, itHub: 3.0, school: 0.5, hospital: 0.5, safety: 9.0, livability: 9.4 },
      "DEFAULT":        { min: 7500,  max: 11500, metro: 2.0, itHub: 3.0, school: 1.2, hospital: 1.5, safety: 8.2, livability: 8.3 }
    },
    upcomingProjects: ["Namma Metro Phase 2/3", "Peripheral Ring Road", "Suburban Rail"],
    growthDrivers: "IT corridor expansion, Metro connectivity, Tech park developments"
  },
  Mumbai: {
    avgGrowth: 7.5, rentalYield: 2.8,
    sectors: {
      "Andheri West":  { min: 25000, max: 38000, metro: 0.5, itHub: 2.0, school: 0.5, hospital: 0.8, safety: 8.8, livability: 9.0 },
      "Bandra West":   { min: 45000, max: 75000, metro: 1.0, itHub: 5.0, school: 0.5, hospital: 0.5, safety: 9.2, livability: 9.5 },
      "Powai":         { min: 22000, max: 32000, metro: 3.0, itHub: 0.5, school: 0.8, hospital: 1.0, safety: 8.9, livability: 9.1 },
      "Thane":         { min: 12000, max: 18000, metro: 2.0, itHub: 5.0, school: 1.0, hospital: 1.5, safety: 8.3, livability: 8.4 },
      "Navi Mumbai":   { min: 10000, max: 16000, metro: 1.5, itHub: 4.0, school: 1.2, hospital: 2.0, safety: 8.5, livability: 8.6 },
      "Goregaon East": { min: 18000, max: 26000, metro: 1.0, itHub: 1.5, school: 0.8, hospital: 1.0, safety: 8.5, livability: 8.7 },
      "DEFAULT":       { min: 18000, max: 28000, metro: 1.5, itHub: 3.0, school: 1.0, hospital: 1.5, safety: 8.5, livability: 8.6 }
    },
    upcomingProjects: ["Coastal Road", "Mumbai Metro Lines 3,4,6", "Navi Mumbai Airport (2025)"],
    growthDrivers: "Coastal Road, Metro expansion, Trans-Harbour Link, Navi Mumbai Airport"
  },
  Delhi: {
    avgGrowth: 6.8, rentalYield: 2.9,
    sectors: {
      "Dwarka":         { min: 9000,  max: 14000, metro: 0.8, itHub: 8.0,  school: 0.5, hospital: 1.0, safety: 8.0, livability: 8.2 },
      "Rohini":         { min: 8500,  max: 13000, metro: 1.0, itHub: 12.0, school: 0.8, hospital: 1.2, safety: 7.8, livability: 8.0 },
      "Saket":          { min: 16000, max: 24000, metro: 0.5, itHub: 6.0,  school: 0.5, hospital: 0.5, safety: 8.8, livability: 9.0 },
      "Vasant Kunj":    { min: 18000, max: 28000, metro: 1.5, itHub: 5.0,  school: 0.8, hospital: 0.8, safety: 9.0, livability: 9.1 },
      "Greater Kailash":{ min: 22000, max: 35000, metro: 1.0, itHub: 4.0,  school: 0.5, hospital: 0.5, safety: 9.0, livability: 9.3 },
      "Mayur Vihar":    { min: 9500,  max: 14500, metro: 0.5, itHub: 3.0,  school: 0.8, hospital: 1.5, safety: 8.0, livability: 8.1 },
      "DEFAULT":        { min: 12000, max: 18000, metro: 1.0, itHub: 5.0,  school: 0.8, hospital: 1.0, safety: 8.3, livability: 8.4 }
    },
    upcomingProjects: ["Delhi-Meerut RRTS", "Phase 4 Metro", "Dwarka Expressway"],
    growthDrivers: "RRTS connectivity, Dwarka Expressway, Phase 4 metro expansion"
  },
  Gurgaon: {
    avgGrowth: 9.0, rentalYield: 3.5,
    sectors: {
      "DLF Phase 1":      { min: 14000, max: 20000, metro: 1.0, itHub: 2.0, school: 0.5, hospital: 1.0, safety: 8.7, livability: 9.0 },
      "Sector 49":        { min: 9000,  max: 13000, metro: 2.5, itHub: 3.0, school: 1.0, hospital: 1.5, safety: 8.3, livability: 8.5 },
      "Golf Course Road": { min: 18000, max: 28000, metro: 0.8, itHub: 1.5, school: 0.8, hospital: 0.8, safety: 9.0, livability: 9.3 },
      "DEFAULT":          { min: 10000, max: 16000, metro: 2.0, itHub: 3.0, school: 1.2, hospital: 1.5, safety: 8.4, livability: 8.5 }
    },
    upcomingProjects: ["Dwarka Expressway", "Metro Phase 4", "Global City"],
    growthDrivers: "Corporate hub expansion, Dwarka Expressway, premium residential demand"
  },
  Pune: {
    avgGrowth: 8.0, rentalYield: 3.5,
    sectors: {
      "Hinjewadi":  { min: 6500, max: 9500,  metro: 3.0, itHub: 0.5, school: 1.0, hospital: 1.5, safety: 8.3, livability: 8.4 },
      "Baner":      { min: 8500, max: 12500, metro: 2.0, itHub: 2.0, school: 0.8, hospital: 1.0, safety: 8.5, livability: 8.7 },
      "Kharadi":    { min: 7500, max: 11000, metro: 4.0, itHub: 1.0, school: 1.0, hospital: 1.5, safety: 8.4, livability: 8.5 },
      "DEFAULT":    { min: 7000, max: 10500, metro: 2.5, itHub: 2.0, school: 1.0, hospital: 1.5, safety: 8.2, livability: 8.3 }
    },
    upcomingProjects: ["Pune Metro Phase 2", "Ring Road"],
    growthDrivers: "IT/ITeS expansion in Hinjewadi/Kharadi, Metro connectivity"
  },
  Hyderabad: {
    avgGrowth: 8.8, rentalYield: 3.5,
    sectors: {
      "Gachibowli":   { min: 7000,  max: 10500, metro: 2.0, itHub: 0.5, school: 0.8, hospital: 1.0, safety: 8.5, livability: 8.7 },
      "Kondapur":     { min: 6500,  max: 9500,  metro: 1.5, itHub: 1.0, school: 1.0, hospital: 1.2, safety: 8.4, livability: 8.5 },
      "Banjara Hills":{ min: 12000, max: 18000, metro: 1.0, itHub: 3.0, school: 0.5, hospital: 0.5, safety: 9.0, livability: 9.2 },
      "DEFAULT":      { min: 6800,  max: 10000, metro: 2.0, itHub: 2.0, school: 1.0, hospital: 1.2, safety: 8.3, livability: 8.4 }
    },
    upcomingProjects: ["Hyderabad Metro Phase 2", "ORR expansion", "Pharma City"],
    growthDrivers: "HITEC City expansion, Pharma & IT corridor"
  },
  Chennai: {
    avgGrowth: 7.2, rentalYield: 3.3,
    sectors: {
      "OMR":      { min: 6500,  max: 9500,  metro: 3.0, itHub: 0.5, school: 1.0, hospital: 1.5, safety: 8.2, livability: 8.3 },
      "Velachery":{ min: 7500,  max: 11000, metro: 1.0, itHub: 2.0, school: 0.8, hospital: 1.0, safety: 8.5, livability: 8.6 },
      "Adyar":    { min: 12000, max: 18000, metro: 1.5, itHub: 3.0, school: 0.5, hospital: 0.5, safety: 8.8, livability: 9.0 },
      "DEFAULT":  { min: 7000,  max: 10500, metro: 2.0, itHub: 2.5, school: 1.0, hospital: 1.2, safety: 8.3, livability: 8.4 }
    },
    upcomingProjects: ["Chennai Metro Phase 2", "Peripheral Ring Road"],
    growthDrivers: "OMR IT corridor, Metro Phase 2"
  }
};