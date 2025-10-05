"use client"

import { Button } from "@/components/ui/button"
import { Sprout, Play, RotateCcw, Info, Settings, Award } from "lucide-react"
import { useState } from "react"
import { type Language, useTranslation } from "@/lib/i18n"

interface MainMenuProps {
  onNewGame: () => void
  onContinue: () => void
  onSettings: () => void
  hasSavedGame: boolean
  language: Language
  level3Completed: boolean
  onViewCertificate: () => void
}

export function MainMenu({
  onNewGame,
  onContinue,
  onSettings,
  hasSavedGame,
  language,
  level3Completed,
  onViewCertificate,
}: MainMenuProps) {
  const [showInfo, setShowInfo] = useState(false)
  const t = useTranslation(language)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-teal-400 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-8 border-4 border-green-400 rounded-2xl mb-6 bg-green-950/70 backdrop-blur shadow-2xl transform hover:scale-105 transition-transform">
            <Sprout className="w-24 h-24 text-green-400 animate-pulse" />
          </div>
          <h1 className="text-6xl font-bold text-green-100 font-mono mb-4 text-balance drop-shadow-2xl tracking-tight">
            {t.mainMenu.title}
          </h1>
          <p className="text-xl text-green-200 font-mono text-balance mb-3 drop-shadow-lg">{t.mainMenu.subtitle}</p>
          <p className="text-base text-green-300 font-mono bg-green-950/50 inline-block px-4 py-2 rounded-full">
            {t.mainMenu.team}
          </p>
        </div>

        {!showInfo ? (
          <>
            <div className="space-y-4 mb-8">
              <Button
                onClick={onNewGame}
                size="lg"
                className="w-full font-mono text-xl h-20 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-xl transform hover:scale-105 transition-all"
              >
                <Play className="w-7 h-7 mr-3" />
                {t.mainMenu.newGame}
              </Button>

              {hasSavedGame && (
                <Button
                  onClick={onContinue}
                  size="lg"
                  variant="outline"
                  className="w-full font-mono text-xl h-20 bg-green-950/70 border-2 border-green-400 text-green-100 hover:bg-green-900 shadow-xl transform hover:scale-105 transition-all"
                >
                  <RotateCcw className="w-7 h-7 mr-3" />
                  {t.mainMenu.continue}
                </Button>
              )}

              {level3Completed && (
                <Button
                  onClick={onViewCertificate}
                  size="lg"
                  className="w-full font-mono text-xl h-20 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 shadow-xl transform hover:scale-105 transition-all"
                >
                  <Award className="w-7 h-7 mr-3" />
                  {language === "en" ? "VIEW CERTIFICATE" : "VER CERTIFICADO"}
                </Button>
              )}

              <Button
                onClick={onSettings}
                size="lg"
                variant="outline"
                className="w-full font-mono text-xl h-20 bg-green-950/70 border-2 border-green-400 text-green-100 hover:bg-green-900 shadow-xl transform hover:scale-105 transition-all"
              >
                <Settings className="w-7 h-7 mr-3" />
                {t.mainMenu.settings}
              </Button>

              <Button
                onClick={() => setShowInfo(true)}
                size="lg"
                variant="secondary"
                className="w-full font-mono text-xl h-20 bg-emerald-700 hover:bg-emerald-600 shadow-xl transform hover:scale-105 transition-all"
              >
                <Info className="w-7 h-7 mr-3" />
                {t.mainMenu.howToPlay}
              </Button>
            </div>

            {/* Credits */}
            <div className="text-center text-sm text-green-200 font-mono bg-green-950/50 p-4 rounded-lg">
              <p className="mb-1">{t.mainMenu.credits}</p>
              <p>{t.mainMenu.version}</p>
            </div>
          </>
        ) : (
          <div className="border-4 border-green-400 rounded-lg p-8 bg-green-950/90 backdrop-blur shadow-2xl max-h-[70vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-green-400 font-mono mb-6">{t.mainMenu.howToPlay}</h2>

            <div className="space-y-4 text-sm font-mono text-green-100">
              <div>
                <h3 className="text-green-400 font-bold mb-2 text-lg">🎯 {t.mainMenu.objective}</h3>
                <p>{t.mainMenu.objectiveText}</p>
              </div>

              <div>
                <h3 className="text-green-400 font-bold mb-2 text-lg">📊 {t.mainMenu.nasaData}</h3>
                <p>• {t.mainMenu.ndviDesc}</p>
                <p>• {t.mainMenu.soilMoistureDesc}</p>
                <p>• {t.mainMenu.lstDesc}</p>
              </div>

              <div>
                <h3 className="text-green-400 font-bold mb-2 text-lg">🎮 {t.mainMenu.gameplay}</h3>
                <p>{t.mainMenu.gameplayStep1}</p>
                <p>{t.mainMenu.gameplayStep2}</p>
                <p>{t.mainMenu.gameplayStep3}</p>
                <p>{t.mainMenu.gameplayStep4}</p>
              </div>

              <div>
                <h3 className="text-green-400 font-bold mb-2 text-lg">🏆 {t.mainMenu.scoring}</h3>
                <p>• {t.mainMenu.productivityDesc}</p>
                <p>• {t.mainMenu.sustainabilityDesc}</p>
                <p>• {t.mainMenu.healthDesc}</p>
              </div>

              <div>
                <h3 className="text-green-400 font-bold mb-2 text-lg">💡 {t.mainMenu.tips}</h3>
                <p>• {t.mainMenu.tip1}</p>
                <p>• {t.mainMenu.tip2}</p>
                <p>• {t.mainMenu.tip3}</p>
                <p>• {t.mainMenu.tip4}</p>
              </div>

              <div>
                <h3 className="text-green-400 font-bold mb-2 text-lg">🌍 {t.mainMenu.realWorld}</h3>
                <p>{t.mainMenu.realWorldText}</p>
              </div>
            </div>

            <Button
              onClick={() => setShowInfo(false)}
              size="lg"
              className="w-full font-mono mt-6 bg-green-600 hover:bg-green-500"
            >
              {t.mainMenu.backToMenu}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
