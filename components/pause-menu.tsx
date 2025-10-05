"use client"

import { Button } from "@/components/ui/button"
import { Pause, Play, RotateCcw, Settings, Home } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"
import { useState } from "react"

interface PauseMenuProps {
  language: Language
  onResume: () => void
  onRestart: () => void
  onSettings: () => void
  onMainMenu: () => void
}

export function PauseMenu({ language, onResume, onRestart, onSettings, onMainMenu }: PauseMenuProps) {
  const t = useTranslation(language)
  const [showRestartConfirm, setShowRestartConfirm] = useState(false)
  const [showMenuConfirm, setShowMenuConfirm] = useState(false)

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gradient-to-br from-amber-900 to-green-900 border-4 border-amber-600 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-8">
          <Pause className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-amber-100 font-mono">{t.pause.title}</h2>
        </div>

        {!showRestartConfirm && !showMenuConfirm ? (
          <div className="space-y-3">
            <Button onClick={onResume} className="w-full font-mono bg-green-600 hover:bg-green-700" size="lg">
              <Play className="w-4 h-4 mr-2" />
              {t.pause.resume}
            </Button>

            <Button
              onClick={() => setShowRestartConfirm(true)}
              className="w-full font-mono bg-amber-600 hover:bg-amber-700"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.pause.restart}
            </Button>

            <Button onClick={onSettings} className="w-full font-mono bg-blue-600 hover:bg-blue-700" size="lg">
              <Settings className="w-4 h-4 mr-2" />
              {t.pause.settings}
            </Button>

            <Button
              onClick={() => setShowMenuConfirm(true)}
              className="w-full font-mono bg-red-600 hover:bg-red-700"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2" />
              {t.pause.mainMenu}
            </Button>
          </div>
        ) : showRestartConfirm ? (
          <div className="space-y-4">
            <p className="text-amber-100 font-mono text-center">{t.pause.confirmRestart}</p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowRestartConfirm(false)}
                className="flex-1 font-mono bg-gray-600 hover:bg-gray-700"
              >
                {t.pause.cancel}
              </Button>
              <Button onClick={onRestart} className="flex-1 font-mono bg-red-600 hover:bg-red-700">
                {t.pause.confirm}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-amber-100 font-mono text-center">{t.pause.confirmMenu}</p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowMenuConfirm(false)}
                className="flex-1 font-mono bg-gray-600 hover:bg-gray-700"
              >
                {t.pause.cancel}
              </Button>
              <Button onClick={onMainMenu} className="flex-1 font-mono bg-red-600 hover:bg-red-700">
                {t.pause.confirm}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
