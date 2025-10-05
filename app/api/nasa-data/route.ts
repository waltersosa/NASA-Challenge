import { type NextRequest, NextResponse } from "next/server"

const generateNASAData = (month: number, level: number) => {
  const ndviPattern = [0.25, 0.42, 0.58, 0.72, 0.68, 0.55]
  const soilMoisturePattern = [0.65, 0.48, 0.32, 0.28, 0.35, 0.42]
  const lstPattern = [28, 32, 35, 38, 36, 30] // Land Surface Temperature in Celsius

  const historical = []
  for (let i = 0; i < month; i++) {
    historical.push({
      month: i + 1,
      ndvi: ndviPattern[i] + (Math.random() * 0.05 - 0.025),
      soilMoisture: soilMoisturePattern[i] + (Math.random() * 0.05 - 0.025),
      lst: lstPattern[i] + (Math.random() * 2 - 1),
    })
  }

  const current = historical[historical.length - 1]

  let recommendation = ""

  if (level === 1) {
    if (current.soilMoisture < 0.3 && current.ndvi < 0.5) {
      recommendation = "Critical: Apply irrigation and consider fertilization"
    } else if (current.soilMoisture < 0.3) {
      recommendation = "Low soil moisture detected - irrigation recommended"
    } else if (current.ndvi < 0.5) {
      recommendation = "Low vegetation index - consider fertilization"
    } else if (current.ndvi > 0.6 && current.soilMoisture > 0.4) {
      recommendation = "Optimal conditions - maintain current practices"
    } else {
      recommendation = "Monitor conditions closely and adjust as needed"
    }
  } else {
    // Level 2 recommendations based on LST and pasture NDVI
    if (current.lst > 35 && current.ndvi < 0.5) {
      recommendation = "Critical: High heat stress and poor pasture - provide shade and supplemental feed"
    } else if (current.lst > 35) {
      recommendation = "High temperature detected - ensure adequate water and shade for animals"
    } else if (current.ndvi < 0.5) {
      recommendation = "Poor pasture quality - consider rotational grazing or supplemental feed"
    } else if (current.lst < 30 && current.ndvi > 0.6) {
      recommendation = "Optimal conditions - animals should thrive with current pasture"
    } else {
      recommendation = "Monitor animal behavior and pasture conditions closely"
    }
  }

  return {
    month,
    level,
    current: {
      ndvi: current.ndvi,
      soilMoisture: current.soilMoisture,
      lst: current.lst,
    },
    historical,
    recommendation,
    location: {
      lat: 40.7128,
      lon: -74.006,
      name: level === 1 ? "Agricultural Test Site A1" : "Pasture Zone B2",
    },
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const month = Number.parseInt(searchParams.get("month") || "1")
  const level = Number.parseInt(searchParams.get("level") || "1")

  await new Promise((resolve) => setTimeout(resolve, 800))

  const data = generateNASAData(month, level)

  return NextResponse.json(data)
}
