"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Satellite, TrendingUp, Droplets, Thermometer, Cloud } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"
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

interface NASADashboardProps {
  language: Language
  onBack: () => void
}

export function NASADashboard({ language, onBack }: NASADashboardProps) {
  const t = useTranslation(language)
  const [selectedDataset, setSelectedDataset] = useState<"ndvi" | "moisture" | "lst" | "precipitation">("ndvi")
  const [historicalData, setHistoricalData] = useState<any>(null)

  useEffect(() => {
    // Simulate fetching historical NASA data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const ndviData = months.map(() => 0.3 + Math.random() * 0.5)
    const moistureData = months.map(() => 0.2 + Math.random() * 0.6)
    const lstData = months.map(() => 15 + Math.random() * 20)
    const precipitationData = months.map(() => Math.random() * 100)

    setHistoricalData({
      labels: months,
      ndvi: ndviData,
      moisture: moistureData,
      lst: lstData,
      precipitation: precipitationData,
    })
  }, [])

  const getChartData = () => {
    if (!historicalData) return null

    const datasets: any = {
      ndvi: {
        label: "NDVI (Vegetation Health)",
        data: historicalData.ndvi,
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
      },
      moisture: {
        label: "Soil Moisture",
        data: historicalData.moisture,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
      },
      lst: {
        label: "Land Surface Temperature (°C)",
        data: historicalData.lst,
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
      },
      precipitation: {
        label: "Precipitation (mm)",
        data: historicalData.precipitation,
        borderColor: "rgb(96, 165, 250)",
        backgroundColor: "rgba(96, 165, 250, 0.1)",
        fill: true,
      },
    }

    return {
      labels: historicalData.labels,
      datasets: [datasets[selectedDataset]],
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-blue-50 p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            size="icon"
            className="border-2 border-amber-600 hover:bg-amber-100 bg-transparent"
          >
            <ArrowLeft className="w-6 h-6 text-amber-700" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-amber-800 font-mono flex items-center gap-3">
              <Satellite className="w-10 h-10" />
              NASA DATA DASHBOARD
            </h1>
            <p className="text-lg text-amber-600 font-mono mt-1">
              {language === "en" ? "Educational Resource Center" : "Centro de Recursos Educativos"}
            </p>
          </div>
        </div>

        {/* Data Selection */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setSelectedDataset("ndvi")}
            className={`p-6 rounded-xl border-4 transition-all ${
              selectedDataset === "ndvi"
                ? "border-green-600 bg-green-100 shadow-lg scale-105"
                : "border-green-400 bg-white hover:bg-green-50"
            }`}
          >
            <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-bold text-green-800 font-mono">NDVI</h3>
            <p className="text-sm text-green-600 mt-1">
              {language === "en" ? "Vegetation Health" : "Salud de Vegetación"}
            </p>
          </button>

          <button
            onClick={() => setSelectedDataset("moisture")}
            className={`p-6 rounded-xl border-4 transition-all ${
              selectedDataset === "moisture"
                ? "border-blue-600 bg-blue-100 shadow-lg scale-105"
                : "border-blue-400 bg-white hover:bg-blue-50"
            }`}
          >
            <Droplets className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-bold text-blue-800 font-mono">
              {language === "en" ? "SOIL MOISTURE" : "HUMEDAD DEL SUELO"}
            </h3>
            <p className="text-sm text-blue-600 mt-1">{language === "en" ? "Water Content" : "Contenido de Agua"}</p>
          </button>

          <button
            onClick={() => setSelectedDataset("lst")}
            className={`p-6 rounded-xl border-4 transition-all ${
              selectedDataset === "lst"
                ? "border-red-600 bg-red-100 shadow-lg scale-105"
                : "border-red-400 bg-white hover:bg-red-50"
            }`}
          >
            <Thermometer className="w-8 h-8 text-red-600 mb-2" />
            <h3 className="font-bold text-red-800 font-mono">LST</h3>
            <p className="text-sm text-red-600 mt-1">{language === "en" ? "Temperature" : "Temperatura"}</p>
          </button>

          <button
            onClick={() => setSelectedDataset("precipitation")}
            className={`p-6 rounded-xl border-4 transition-all ${
              selectedDataset === "precipitation"
                ? "border-sky-600 bg-sky-100 shadow-lg scale-105"
                : "border-sky-400 bg-white hover:bg-sky-50"
            }`}
          >
            <Cloud className="w-8 h-8 text-sky-600 mb-2" />
            <h3 className="font-bold text-sky-800 font-mono">
              {language === "en" ? "PRECIPITATION" : "PRECIPITACIÓN"}
            </h3>
            <p className="text-sm text-sky-600 mt-1">{language === "en" ? "Rainfall" : "Lluvia"}</p>
          </button>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl border-4 border-amber-600 p-6 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-amber-800 font-mono mb-4">
            {language === "en" ? "Annual Trends" : "Tendencias Anuales"}
          </h2>
          <div className="h-96">
            {historicalData && getChartData() && <Line data={getChartData()!} options={chartOptions} />}
          </div>
        </div>

        {/* Educational Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border-4 border-green-600 p-6 shadow-lg">
            <h3 className="text-xl font-bold text-green-800 font-mono mb-4 flex items-center gap-2">
              <Satellite className="w-6 h-6" />
              {language === "en" ? "Data Sources" : "Fuentes de Datos"}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-bold text-green-800">MODIS (Terra/Aqua)</p>
                <p className="text-green-600">
                  {language === "en"
                    ? "Provides NDVI and LST data for vegetation and temperature monitoring"
                    : "Proporciona datos NDVI y LST para monitoreo de vegetación y temperatura"}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-bold text-blue-800">SMAP</p>
                <p className="text-blue-600">
                  {language === "en"
                    ? "Soil Moisture Active Passive satellite measures soil moisture globally"
                    : "Satélite de Humedad del Suelo mide la humedad del suelo globalmente"}
                </p>
              </div>
              <div className="p-3 bg-sky-50 rounded-lg">
                <p className="font-bold text-sky-800">GPM</p>
                <p className="text-sky-600">
                  {language === "en"
                    ? "Global Precipitation Measurement provides rainfall data"
                    : "Medición Global de Precipitación proporciona datos de lluvia"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-4 border-amber-600 p-6 shadow-lg">
            <h3 className="text-xl font-bold text-amber-800 font-mono mb-4">
              {language === "en" ? "Real-World Applications" : "Aplicaciones del Mundo Real"}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-amber-50 rounded-lg">
                <p className="font-bold text-amber-800">
                  {language === "en" ? "Precision Agriculture" : "Agricultura de Precisión"}
                </p>
                <p className="text-amber-600">
                  {language === "en"
                    ? "Farmers use NASA data to optimize irrigation and fertilization"
                    : "Los agricultores usan datos NASA para optimizar riego y fertilización"}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-bold text-green-800">
                  {language === "en" ? "Drought Monitoring" : "Monitoreo de Sequías"}
                </p>
                <p className="text-green-600">
                  {language === "en"
                    ? "Early warning systems help farmers prepare for water scarcity"
                    : "Sistemas de alerta temprana ayudan a agricultores a prepararse para escasez de agua"}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-bold text-blue-800">
                  {language === "en" ? "Crop Yield Prediction" : "Predicción de Rendimiento"}
                </p>
                <p className="text-blue-600">
                  {language === "en"
                    ? "Satellite data helps predict harvest outcomes for better planning"
                    : "Datos satelitales ayudan a predecir resultados de cosecha para mejor planificación"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="mt-8 bg-white rounded-xl border-4 border-purple-600 p-6 shadow-lg">
          <h3 className="text-xl font-bold text-purple-800 font-mono mb-4">
            {language === "en" ? "Learn More" : "Aprende Más"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://earthdata.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border-2 border-purple-300"
            >
              <p className="font-bold text-purple-800">NASA Earthdata</p>
              <p className="text-sm text-purple-600 mt-1">
                {language === "en" ? "Access NASA's Earth observation data" : "Accede a datos de observación terrestre"}
              </p>
            </a>
            <a
              href="https://appliedsciences.nasa.gov/what-we-do/capacity-building/arset"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border-2 border-purple-300"
            >
              <p className="font-bold text-purple-800">ARSET Training</p>
              <p className="text-sm text-purple-600 mt-1">
                {language === "en"
                  ? "Free training on using NASA data"
                  : "Capacitación gratuita sobre uso de datos NASA"}
              </p>
            </a>
            <a
              href="https://www.spaceappschallenge.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border-2 border-purple-300"
            >
              <p className="font-bold text-purple-800">Space Apps Challenge</p>
              <p className="text-sm text-purple-600 mt-1">
                {language === "en" ? "Join the global hackathon" : "Únete al hackathon global"}
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
