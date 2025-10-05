"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Info } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface DecisionPanelProps {
  currentMonth: number
  currentLevel: number
  onDecision: (decision: string, isCorrect: boolean, correctAnswer?: string) => void
  onBack: () => void
  language: Language
}

export function DecisionPanel({ currentMonth, currentLevel, onDecision, onBack, language }: DecisionPanelProps) {
  const t = useTranslation(language)
  const [decisionData, setDecisionData] = useState<any>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showContext, setShowContext] = useState(false)

  useEffect(() => {
    fetch(`/api/decision-data?month=${currentMonth}&level=${currentLevel}&lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        setDecisionData(data)
        setSelectedOption(null)
        setShowFeedback(false)
        setShowContext(currentMonth === 1)
      })
  }, [currentMonth, currentLevel, language])

  if (!decisionData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-primary font-mono">{t.decision.analyzing}</p>
        </div>
      </div>
    )
  }

  const handleOptionSelect = (index: number) => {
    if (showFeedback) return
    setSelectedOption(index)
  }

  const handleSubmit = () => {
    if (selectedOption === null) return
    setShowFeedback(true)
  }

  const handleContinue = () => {
    if (selectedOption === null) return
    const option = decisionData.options[selectedOption]
    const correctOption = decisionData.options.find((opt: any) => opt.isCorrect)
    onDecision(option.text, option.isCorrect, correctOption?.text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-amber-600 rounded-full mb-4">
            <span className="text-white font-mono font-bold">
              {t.game.month} {decisionData.month} / 6
            </span>
          </div>
          <h1 className="text-3xl font-bold text-amber-900 font-mono mb-4 text-balance">{decisionData.question}</h1>
        </div>

        {/* Context Card */}
        <div className="border-4 border-amber-600 rounded-lg p-6 bg-white shadow-lg mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-700 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-amber-800 font-mono">{t.decision.briefing}</h3>
                <button
                  onClick={() => setShowContext(!showContext)}
                  className="text-xs text-amber-700 hover:text-amber-900 transition-colors font-mono"
                >
                  {showContext ? "HIDE DETAILS" : "SHOW DETAILS"}
                </button>
              </div>
              <p className="text-sm text-gray-700 font-mono">{decisionData.context}</p>
              {showContext && (
                <div className="mt-4 p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
                  <h4 className="text-amber-800 font-bold text-sm mb-2">Understanding the Data:</h4>
                  <ul className="text-xs text-gray-700 space-y-2">
                    <li>
                      • <span className="text-green-600 font-bold">NDVI values:</span> Compare current NDVI to previous
                      months. Is vegetation health improving or declining?
                    </li>
                    <li>
                      • <span className="text-blue-600 font-bold">Soil moisture:</span> Check if moisture is adequate
                      for the current growth stage. Low moisture during peak growth is critical.
                    </li>
                    {currentLevel >= 2 && (
                      <li>
                        • <span className="text-red-600 font-bold">Temperature (LST):</span> High temperatures can
                        stress animals. Monitor for heat stress indicators.
                      </li>
                    )}
                    <li>
                      • <span className="text-amber-700 font-bold">Sustainability:</span> Avoid over-using resources.
                      Only intervene when data shows it's necessary.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-6">
          {decisionData.options.map((option: any, index: number) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={showFeedback}
              className={`w-full text-left p-6 rounded-lg border-4 transition-all ${
                selectedOption === index
                  ? "border-amber-600 bg-amber-50"
                  : "border-amber-300 bg-white hover:border-amber-500"
              } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"} shadow-lg`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                    selectedOption === index ? "border-amber-600 bg-amber-600" : "border-amber-400"
                  }`}
                >
                  {selectedOption === index && <div className="w-3 h-3 rounded-full bg-white" />}
                </div>
                <div className="flex-1">
                  <p className="text-base font-mono text-gray-900 mb-2">{option.text}</p>
                  {showFeedback && selectedOption === index && (
                    <div
                      className={`mt-4 p-4 rounded-lg border-2 ${
                        option.isCorrect ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {option.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p
                            className={`font-bold text-sm font-mono mb-1 ${option.isCorrect ? "text-green-600" : "text-red-600"}`}
                          >
                            {option.isCorrect ? "CORRECT DECISION" : "INCORRECT DECISION"}
                          </p>
                          <p className="text-sm text-gray-700 font-mono">{option.feedback}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {!showFeedback ? (
            <>
              <Button onClick={onBack} variant="outline" size="lg" className="font-mono bg-transparent">
                {t.nasa.back}
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                size="lg"
                className="font-mono bg-amber-600 hover:bg-amber-700 px-8"
              >
                {t.decision.confirm}
              </Button>
            </>
          ) : (
            <Button onClick={handleContinue} size="lg" className="font-mono bg-green-600 hover:bg-green-700 px-8">
              {t.decision.continue} →
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
