"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X, TrendingUp, Droplets, Info } from "lucide-react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface NASAPanelProps {
  currentMonth: number
  onClose: () => void
  onProceed: () => void
}

export function NASAPanel({ currentMonth, onClose, onProceed }: NASAPanelProps) {
  const [nasaData, setNasaData] = useState<any>(null)
  const [showNDVIInfo, setShowNDVIInfo] = useState(false)
  const [showSoilInfo, setShowSoilInfo] = useState(false)

  useEffect(() => {
    // Fetch NASA data for current month
    fetch(`/api/nasa-data?month=${currentMonth}`)
      .then((res) => res.json())
      .then((data) => setNasaData(data))
  }, [currentMonth])

  if (!nasaData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-primary font-mono">DOWNLOADING SATELLITE DATA...</p>
        </div>
      </div>
    )
  }

  const ndviData = {
    labels: nasaData.historical.map((_: any, i: number) => `M${i + 1}`),
    datasets: [
      {
        label: "NDVI (Vegetation Health)",
        data: nasaData.historical.map((d: any) => d.ndvi),
        borderColor: "#00ff88",
        backgroundColor: "rgba(0, 255, 136, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }

  const soilData = {
    labels: nasaData.historical.map((_: any, i: number) => `M${i + 1}`),
    datasets: [
      {
        label: "Soil Moisture Index",
        data: nasaData.historical.map((d: any) => d.soilMoisture),
        borderColor: "#00aaff",
        backgroundColor: "rgba(0, 170, 255, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#00ff88",
          font: {
            family: "monospace",
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        titleColor: "#00ff88",
        bodyColor: "#ffffff",
        borderColor: "#00ff88",
        borderWidth: 1,
        titleFont: {
          family: "monospace",
        },
        bodyFont: {
          family: "monospace",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        grid: {
          color: "rgba(0, 255, 136, 0.1)",
        },
        ticks: {
          color: "#00ff88",
          font: {
            family: "monospace",
          },
        },
      },
      x: {
        grid: {
          color: "rgba(0, 255, 136, 0.1)",
        },
        ticks: {
          color: "#00ff88",
          font: {
            family: "monospace",
          },
        },
      },
    },
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary font-mono mb-2">NASA SATELLITE DATA PANEL</h1>
            <p className="text-sm text-muted-foreground font-mono">
              LOCATION: 40.7128°N, 74.0060°W | MONTH: {currentMonth}/6
            </p>
          </div>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Current Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-primary/30 rounded-lg p-6 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-bold text-primary font-mono">NDVI - VEGETATION INDEX</h3>
              <button
                onClick={() => setShowNDVIInfo(!showNDVIInfo)}
                className="ml-auto text-primary hover:text-primary/80 transition-colors"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
            <div className="text-4xl font-bold text-green-500 font-mono mb-2">{nasaData.current.ndvi.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground font-mono mb-4">
              {nasaData.current.ndvi > 0.6
                ? "HEALTHY VEGETATION"
                : nasaData.current.ndvi > 0.4
                  ? "MODERATE HEALTH"
                  : "LOW VEGETATION"}
            </p>
            {showNDVIInfo && (
              <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="text-primary font-bold text-sm mb-2">What is NDVI?</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  NDVI (Normalized Difference Vegetation Index) measures how much plants are photosynthesizing. Healthy
                  green plants reflect more near-infrared light and absorb more red light.
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  <span className="text-primary font-bold">How it works:</span> Satellites measure the difference
                  between reflected near-infrared and red light. The formula is: (NIR - Red) / (NIR + Red)
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary font-bold">Real-world use:</span> Farmers use NDVI to detect crop stress
                  before it's visible to the human eye, helping them take action early.
                </p>
              </div>
            )}
            <div className="text-xs text-muted-foreground font-mono">
              <p>• NDVI Range: -1 to 1</p>
              <p>• Higher values = healthier crops</p>
              <p>• Values {">"} 0.6 indicate good growth</p>
            </div>
          </div>

          <div className="border border-primary/30 rounded-lg p-6 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-bold text-primary font-mono">SOIL MOISTURE INDEX</h3>
              <button
                onClick={() => setShowSoilInfo(!showSoilInfo)}
                className="ml-auto text-primary hover:text-primary/80 transition-colors"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
            <div className="text-4xl font-bold text-blue-500 font-mono mb-2">
              {nasaData.current.soilMoisture.toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground font-mono mb-4">
              {nasaData.current.soilMoisture > 0.5
                ? "ADEQUATE MOISTURE"
                : nasaData.current.soilMoisture > 0.3
                  ? "MODERATE MOISTURE"
                  : "LOW MOISTURE"}
            </p>
            {showSoilInfo && (
              <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="text-primary font-bold text-sm mb-2">What is Soil Moisture?</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Soil moisture measures the amount of water held in the soil. It's critical for plant growth because
                  roots absorb water and nutrients from the soil.
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  <span className="text-primary font-bold">How satellites measure it:</span> Microwave sensors detect
                  water content in the top layer of soil. Water changes how microwaves are reflected back to the
                  satellite.
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary font-bold">Why it matters:</span> Knowing soil moisture helps farmers
                  irrigate only when needed, saving water and preventing over-watering that can harm crops.
                </p>
              </div>
            )}
            <div className="text-xs text-muted-foreground font-mono">
              <p>• Range: 0 to 1</p>
              <p>• Higher values = more soil water</p>
              <p>• Values {"<"} 0.3 require irrigation</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="border border-primary/30 rounded-lg p-6 bg-card/50 backdrop-blur">
            <h3 className="text-sm font-bold text-primary font-mono mb-4">NDVI HISTORICAL TREND</h3>
            <div className="h-64">
              <Line data={ndviData} options={chartOptions} />
            </div>
          </div>

          <div className="border border-primary/30 rounded-lg p-6 bg-card/50 backdrop-blur">
            <h3 className="text-sm font-bold text-primary font-mono mb-4">SOIL MOISTURE TREND</h3>
            <div className="h-64">
              <Line data={soilData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Analysis */}
        <div className="border border-primary/30 rounded-lg p-6 bg-card/50 backdrop-blur mb-6">
          <h3 className="text-lg font-bold text-primary font-mono mb-4">AUTOMATED ANALYSIS</h3>
          <div className="space-y-2 text-sm font-mono">
            <p className="text-muted-foreground">
              <span className="text-primary">▸</span> Current NDVI: {nasaData.current.ndvi.toFixed(2)} -
              {nasaData.current.ndvi > 0.6
                ? " Crops showing strong photosynthetic activity"
                : nasaData.current.ndvi > 0.4
                  ? " Moderate vegetation health detected"
                  : " Warning: Low vegetation index"}
            </p>
            <p className="text-muted-foreground">
              <span className="text-primary">▸</span> Soil Moisture: {nasaData.current.soilMoisture.toFixed(2)} -
              {nasaData.current.soilMoisture > 0.5
                ? " Adequate water availability"
                : nasaData.current.soilMoisture > 0.3
                  ? " Moderate soil moisture levels"
                  : " Warning: Low soil moisture detected"}
            </p>
            <p className="text-muted-foreground">
              <span className="text-primary">▸</span> Recommendation: {nasaData.recommendation}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button onClick={onProceed} size="lg" className="font-mono px-8">
            PROCEED TO DECISION PANEL →
          </Button>
        </div>
      </div>
    </div>
  )
}
