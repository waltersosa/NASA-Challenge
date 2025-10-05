"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Award } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

interface FinalQuizProps {
  language: Language
  onComplete: (score: number, passed: boolean) => void
}

export function FinalQuiz({ language, onComplete }: FinalQuizProps) {
  const t = useTranslation(language)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])

  const questions: QuizQuestion[] =
    language === "en"
      ? [
          {
            question: "What does NDVI measure?",
            options: ["Soil temperature", "Vegetation health and density", "Water pH levels", "Animal population"],
            correctIndex: 1,
            explanation:
              "NDVI (Normalized Difference Vegetation Index) measures vegetation health by analyzing how plants reflect light. Healthy plants have higher NDVI values.",
          },
          {
            question: "When should you irrigate crops based on soil moisture data?",
            options: [
              "When soil moisture is above 0.8",
              "Only during full moon",
              "When soil moisture drops below 0.3",
              "Every day regardless of data",
            ],
            correctIndex: 2,
            explanation:
              "Irrigation should be applied when soil moisture drops below critical levels (typically 0.3), indicating that plants may not have enough water available.",
          },
          {
            question: "What does high LST (Land Surface Temperature) indicate for livestock?",
            options: [
              "Animals need more food",
              "Perfect conditions for grazing",
              "Potential heat stress requiring cooling measures",
              "Time to vaccinate animals",
            ],
            correctIndex: 2,
            explanation:
              "High LST values indicate elevated temperatures that can cause heat stress in animals. Farmers should provide shade, water, and cooling measures.",
          },
          {
            question: "Why is sustainability important in farming?",
            options: [
              "It makes crops grow faster",
              "It ensures long-term productivity while protecting the environment",
              "It reduces the need for satellites",
              "It only matters for organic farms",
            ],
            correctIndex: 1,
            explanation:
              "Sustainable farming practices ensure that we can continue producing food for future generations while minimizing environmental impact and resource depletion.",
          },
          {
            question: "How do NASA satellites help farmers?",
            options: [
              "They control the weather",
              "They provide real-time data for informed decision-making",
              "They automatically water crops",
              "They scare away pests",
            ],
            correctIndex: 1,
            explanation:
              "NASA satellites provide valuable data (NDVI, soil moisture, temperature) that helps farmers make informed decisions about irrigation, fertilization, and animal management.",
          },
        ]
      : [
          {
            question: "¿Qué mide el NDVI?",
            options: [
              "Temperatura del suelo",
              "Salud y densidad de la vegetación",
              "Niveles de pH del agua",
              "Población animal",
            ],
            correctIndex: 1,
            explanation:
              "NDVI (Índice de Vegetación de Diferencia Normalizada) mide la salud de la vegetación analizando cómo las plantas reflejan la luz. Las plantas sanas tienen valores NDVI más altos.",
          },
          {
            question: "¿Cuándo se debe regar los cultivos según los datos de humedad del suelo?",
            options: [
              "Cuando la humedad del suelo está por encima de 0.8",
              "Solo durante luna llena",
              "Cuando la humedad del suelo cae por debajo de 0.3",
              "Todos los días sin importar los datos",
            ],
            correctIndex: 2,
            explanation:
              "El riego debe aplicarse cuando la humedad del suelo cae por debajo de niveles críticos (típicamente 0.3), indicando que las plantas pueden no tener suficiente agua disponible.",
          },
          {
            question: "¿Qué indica un LST (Temperatura Superficial Terrestre) alto para el ganado?",
            options: [
              "Los animales necesitan más comida",
              "Condiciones perfectas para pastoreo",
              "Potencial estrés por calor que requiere medidas de enfriamiento",
              "Momento de vacunar animales",
            ],
            correctIndex: 2,
            explanation:
              "Valores altos de LST indican temperaturas elevadas que pueden causar estrés por calor en los animales. Los agricultores deben proporcionar sombra, agua y medidas de enfriamiento.",
          },
          {
            question: "¿Por qué es importante la sostenibilidad en la agricultura?",
            options: [
              "Hace que los cultivos crezcan más rápido",
              "Asegura productividad a largo plazo mientras protege el medio ambiente",
              "Reduce la necesidad de satélites",
              "Solo importa para granjas orgánicas",
            ],
            correctIndex: 1,
            explanation:
              "Las prácticas agrícolas sostenibles aseguran que podamos continuar produciendo alimentos para futuras generaciones mientras minimizamos el impacto ambiental y el agotamiento de recursos.",
          },
          {
            question: "¿Cómo ayudan los satélites de la NASA a los agricultores?",
            options: [
              "Controlan el clima",
              "Proporcionan datos en tiempo real para toma de decisiones informadas",
              "Riegan automáticamente los cultivos",
              "Ahuyentan plagas",
            ],
            correctIndex: 1,
            explanation:
              "Los satélites de la NASA proporcionan datos valiosos (NDVI, humedad del suelo, temperatura) que ayudan a los agricultores a tomar decisiones informadas sobre riego, fertilización y gestión animal.",
          },
        ]

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    const isCorrect = selectedAnswer === questions[currentQuestion].correctIndex
    if (isCorrect) {
      setScore(score + 1)
    }
    setAnswers([...answers, isCorrect])
    setShowFeedback(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      const passed = score >= 3
      onComplete(score, passed)
    }
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-6 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="bg-black/30 border-4 border-purple-500 rounded-lg p-8 backdrop-blur">
          <div className="text-center mb-8">
            <Award className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-purple-100 font-mono mb-2">{t.quiz.title}</h1>
            <p className="text-purple-300 font-mono">
              {t.quiz.question} {currentQuestion + 1} {t.quiz.of} {questions.length}
            </p>
          </div>

          <div className="bg-black/40 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white font-mono mb-6 text-balance">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all font-mono ${
                    selectedAnswer === index
                      ? "border-purple-400 bg-purple-500/20"
                      : "border-purple-500/30 bg-purple-900/20 hover:border-purple-400/50"
                  } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedAnswer === index ? "border-purple-400 bg-purple-400" : "border-purple-400/50"
                      }`}
                    >
                      {selectedAnswer === index && <div className="w-3 h-3 rounded-full bg-white" />}
                    </div>
                    <span className="text-white">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {showFeedback && (
            <div
              className={`rounded-lg p-6 mb-6 border-2 ${
                selectedAnswer === question.correctIndex
                  ? "bg-green-500/20 border-green-500"
                  : "bg-red-500/20 border-red-500"
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                {selectedAnswer === question.correctIndex ? (
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                )}
                <div>
                  <p
                    className={`font-bold font-mono mb-2 ${selectedAnswer === question.correctIndex ? "text-green-400" : "text-red-400"}`}
                  >
                    {selectedAnswer === question.correctIndex ? t.quiz.correct : t.quiz.incorrect}
                  </p>
                  <p className="text-white font-mono text-sm">
                    <span className="font-bold">{t.quiz.explanation}</span> {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-purple-300 font-mono">
              {t.quiz.score}: {score}/{questions.length}
            </div>
            {!showFeedback ? (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="font-mono bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                {t.quiz.submit}
              </Button>
            ) : (
              <Button onClick={handleNext} className="font-mono bg-purple-600 hover:bg-purple-700" size="lg">
                {currentQuestion < questions.length - 1 ? t.quiz.next : t.quiz.finish}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
