"use client"

import { Button } from "@/components/ui/button"
import { Trophy, TrendingUp, Leaf, RotateCcw, Home } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface GameOverProps {
  productivityScore: number
  sustainabilityScore: number
  cropHealth: number
  animalHealth: number
  decisions: any[]
  currentLevel: 1 | 2 | 3
  level1Completed: boolean
  level2Completed: boolean
  onRestart: () => void
  onMenu: () => void
  onNextLevel: () => void
  language: Language
}

export function GameOver({
  productivityScore,
  sustainabilityScore,
  cropHealth,
  animalHealth,
  decisions,
  currentLevel,
  level1Completed,
  level2Completed,
  onRestart,
  onMenu,
  onNextLevel,
  language,
}: GameOverProps) {
  const t = useTranslation(language)
  const correctDecisions = decisions.filter((d) => d.isCorrect).length
  const totalDecisions = decisions.length
  const accuracy = totalDecisions > 0 ? (correctDecisions / totalDecisions) * 100 : 0

  const currentHealth =
    currentLevel === 1 ? cropHealth : currentLevel === 2 ? animalHealth : Math.min(cropHealth, animalHealth)
  const finalScore = Math.round((productivityScore + sustainabilityScore + currentHealth) / 3)

  const getRank = (score: number) => {
    if (score >= 90) return { rank: t.gameOver.excellent, color: "text-yellow-400" }
    if (score >= 75) return { rank: t.gameOver.good, color: "text-green-400" }
    if (score >= 60) return { rank: t.gameOver.fair, color: "text-blue-400" }
    return { rank: t.gameOver.poor, color: "text-red-400" }
  }

  const rankInfo = getRank(finalScore)

  const canProceed =
    (currentLevel === 1 && level1Completed && finalScore > 60) ||
    (currentLevel === 2 && level2Completed && finalScore > 60)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl font-bold text-cyan-400 font-mono mb-2 neon-text">{t.gameOver.title}</h1>
          <p className="text-green-400 font-mono">{t.gameOver.finalScores}</p>
        </div>

        {/* Rank */}
        <div className="border-2 border-cyan-400 rounded-lg p-8 bg-black/60 backdrop-blur mb-6 text-center shadow-lg shadow-cyan-500/30">
          <p className="text-sm text-cyan-400 font-mono mb-2">{t.gameOver.performance}</p>
          <h2 className={`text-5xl font-bold font-mono mb-4 ${rankInfo.color}`}>{rankInfo.rank}</h2>
          <div className="text-6xl font-bold text-cyan-400 font-mono">{finalScore}</div>
          <p className="text-sm text-green-400 font-mono mt-2">
            {language === "en" ? "OVERALL SCORE" : "PUNTUACIÓN GENERAL"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border-2 border-cyan-400 rounded-lg p-6 bg-black/60 backdrop-blur text-center shadow-lg shadow-cyan-500/30">
            <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-cyan-400 font-mono mb-1">{productivityScore}</div>
            <p className="text-xs text-green-400 font-mono">{t.gameOver.productivity}</p>
          </div>

          <div className="border-2 border-green-400 rounded-lg p-6 bg-black/60 backdrop-blur text-center shadow-lg shadow-green-500/30">
            <Leaf className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-green-400 font-mono mb-1">{sustainabilityScore}</div>
            <p className="text-xs text-cyan-400 font-mono">{t.gameOver.sustainability}</p>
          </div>

          <div className="border-2 border-yellow-400 rounded-lg p-6 bg-black/60 backdrop-blur text-center shadow-lg shadow-yellow-500/30">
            <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-yellow-400 font-bold">H</span>
            </div>
            <div className="text-3xl font-bold text-yellow-400 font-mono mb-1">{currentHealth}%</div>
            <p className="text-xs text-cyan-400 font-mono">
              {currentLevel === 1
                ? t.gameOver.cropHealth
                : currentLevel === 2
                  ? t.gameOver.animalHealth
                  : t.gameOver.overallHealth}
            </p>
          </div>
        </div>

        {/* Decision Summary */}
        <div className="border-2 border-cyan-400 rounded-lg p-6 bg-black/60 backdrop-blur mb-6 shadow-lg shadow-cyan-500/30">
          <h3 className="text-lg font-bold text-cyan-400 font-mono mb-4">{t.gameOver.decisions}</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-green-400 font-mono mb-1">{t.gameOver.correct}</p>
              <p className="text-2xl font-bold text-green-400 font-mono">
                {correctDecisions}/{totalDecisions}
              </p>
            </div>
            <div>
              <p className="text-sm text-cyan-400 font-mono mb-1">
                {language === "en" ? "Accuracy Rate" : "Tasa de Precisión"}
              </p>
              <p className="text-2xl font-bold text-cyan-400 font-mono">{accuracy.toFixed(0)}%</p>
            </div>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {decisions.map((d, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-mono">
                <span className={`w-3 h-3 rounded-full ${d.isCorrect ? "bg-green-400" : "bg-red-400"}`} />
                <span className="text-cyan-400">
                  {t.game.month} {d.month}:
                </span>
                <span className="text-green-400 flex-1 truncate">{d.decision}</span>
                <span className={d.isCorrect ? "text-green-400" : "text-red-400"}>{d.isCorrect ? "✓" : "✗"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Summary */}
        <div className="border-2 border-green-400 rounded-lg p-6 bg-black/60 backdrop-blur mb-6 shadow-lg shadow-green-500/30">
          <h3 className="text-lg font-bold text-green-400 font-mono mb-4">{t.gameOver.whatYouLearned}</h3>
          <div className="space-y-3 text-sm font-mono text-cyan-400">
            <div className="flex items-start gap-3">
              <span className="text-green-400">•</span>
              <p>{t.gameOver.learningPoint1}</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">•</span>
              <p>{t.gameOver.learningPoint2}</p>
            </div>
            {currentLevel >= 2 && (
              <div className="flex items-start gap-3">
                <span className="text-green-400">•</span>
                <p>{t.gameOver.learningPoint3}</p>
              </div>
            )}
            <div className="flex items-start gap-3">
              <span className="text-green-400">•</span>
              <p>{t.gameOver.learningPoint4}</p>
            </div>
            {currentLevel === 3 && (
              <div className="flex items-start gap-3">
                <span className="text-green-400">•</span>
                <p>{t.gameOver.learningPoint5}</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            onClick={onRestart}
            size="lg"
            className="font-mono px-8 bg-cyan-500/20 hover:bg-cyan-500/30 border-2 border-cyan-400 text-cyan-400"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {t.gameOver.restart}
          </Button>
          {canProceed && (
            <Button
              onClick={onNextLevel}
              size="lg"
              className="font-mono px-8 bg-green-500/20 hover:bg-green-500/30 border-2 border-green-400 text-green-400"
            >
              {t.gameOver.nextLevel}
            </Button>
          )}
          <Button
            onClick={onMenu}
            size="lg"
            className="font-mono px-8 bg-purple-500/20 hover:bg-purple-500/30 border-2 border-purple-400 text-purple-400"
          >
            <Home className="w-4 h-4 mr-2" />
            {t.gameOver.menu}
          </Button>
        </div>
      </div>
    </div>
  )
}
