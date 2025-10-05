"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Lock, CheckCircle2, Trophy } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface LevelSelectProps {
  onSelectLevel: (level: 1 | 2 | 3) => void
  level1Completed: boolean
  level2Completed: boolean
  language: Language
  onBack: () => void
}

export function LevelSelect({ onSelectLevel, level1Completed, level2Completed, language, onBack }: LevelSelectProps) {
  const t = useTranslation(language)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button onClick={onBack} variant="ghost" size="icon" className="text-green-100 hover:bg-green-800">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-green-100 font-mono">{t.levels.selectLevel}</h1>
            <p className="text-sm text-green-200 font-mono">{t.mainMenu.team}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Level 1 */}
          <button
            onClick={() => onSelectLevel(1)}
            className="border-4 border-green-500 rounded-lg p-8 bg-gradient-to-br from-green-900/80 to-green-700/80 hover:from-green-800/90 hover:to-green-600/90 transition-all text-left relative overflow-hidden group backdrop-blur"
          >
            <div className="absolute top-4 right-4">
              {level1Completed && <CheckCircle2 className="w-8 h-8 text-green-400" />}
            </div>

            <div className="text-6xl mb-4">🌾</div>
            <h2 className="text-2xl font-bold text-green-300 font-mono mb-2">{t.levels.level1Name}</h2>
            <p className="text-sm text-green-100 font-mono mb-4">{t.levels.level1Desc}</p>

            <div className="space-y-2 text-xs font-mono text-green-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span>{t.nasa.ndvi}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                <span>{t.nasa.soilMoisture}</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <span className="inline-block px-4 py-2 bg-green-600 text-white font-mono rounded group-hover:bg-green-500 transition-colors">
                {level1Completed ? t.levels.completed : "START"}
              </span>
            </div>
          </button>

          {/* Level 2 */}
          <button
            onClick={() => level1Completed && onSelectLevel(2)}
            disabled={!level1Completed}
            className={`border-4 rounded-lg p-8 text-left relative overflow-hidden group backdrop-blur ${
              level1Completed
                ? "border-amber-500 bg-gradient-to-br from-amber-900/80 to-amber-700/80 hover:from-amber-800/90 hover:to-amber-600/90"
                : "border-gray-600 bg-gradient-to-br from-gray-900/80 to-gray-700/80 cursor-not-allowed opacity-60"
            } transition-all`}
          >
            {!level1Completed && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="text-center">
                  <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-bold text-gray-300 font-mono">{t.levels.locked}</p>
                </div>
              </div>
            )}

            {level1Completed && (
              <div className="absolute top-4 right-4">
                {level2Completed ? (
                  <CheckCircle2 className="w-8 h-8 text-amber-400" />
                ) : (
                  <div className="px-3 py-1 bg-amber-600 text-white text-xs font-mono rounded">{t.levels.unlocked}</div>
                )}
              </div>
            )}

            <div className="text-6xl mb-4">🐄</div>
            <h2 className="text-2xl font-bold text-amber-300 font-mono mb-2">{t.levels.level2Name}</h2>
            <p className="text-sm text-amber-100 font-mono mb-4">{t.levels.level2Desc}</p>

            <div className="space-y-2 text-xs font-mono text-amber-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full" />
                <span>{t.nasa.lst}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span>{t.nasa.ndvi}</span>
              </div>
            </div>

            {level1Completed && (
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-2 bg-amber-600 text-white font-mono rounded group-hover:bg-amber-500 transition-colors">
                  {level2Completed ? t.levels.completed : "START"}
                </span>
              </div>
            )}
          </button>

          {/* Level 3 - EPIC FINAL LEVEL */}
          <button
            onClick={() => level2Completed && onSelectLevel(3)}
            disabled={!level2Completed}
            className={`border-4 rounded-lg p-8 text-left relative overflow-hidden group backdrop-blur ${
              level2Completed
                ? "border-purple-500 bg-gradient-to-br from-purple-900/80 to-purple-700/80 hover:from-purple-800/90 hover:to-purple-600/90"
                : "border-gray-600 bg-gradient-to-br from-gray-900/80 to-gray-700/80 cursor-not-allowed opacity-60"
            } transition-all`}
          >
            {!level2Completed && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="text-center">
                  <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-bold text-gray-300 font-mono">{t.levels.locked}</p>
                </div>
              </div>
            )}

            {level2Completed && (
              <div className="absolute top-4 right-4">
                <Trophy className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
            )}

            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-purple-300 font-mono mb-2">{t.levels.level3Name}</h2>
            <p className="text-sm text-purple-100 font-mono mb-4">{t.levels.level3Desc}</p>

            <div className="space-y-2 text-xs font-mono text-purple-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span>{t.nasa.ndvi}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                <span>{t.nasa.soilMoisture}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full" />
                <span>{t.nasa.lst}</span>
              </div>
            </div>

            {level2Completed && (
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-2 bg-purple-600 text-white font-mono rounded group-hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/50">
                  START FINAL CHALLENGE
                </span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
