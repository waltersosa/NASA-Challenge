"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Volume2, VolumeX, Globe, Trash2 } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"
import { useState } from "react"

interface SettingsPanelProps {
  language: Language
  onLanguageChange: (lang: Language) => void
  onBack: () => void
}

export function SettingsPanel({ language, onLanguageChange, onBack }: SettingsPanelProps) {
  const t = useTranslation(language)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [musicVolume, setMusicVolume] = useState(70)
  const [effectsVolume, setEffectsVolume] = useState(80)
  const [autosave, setAutosave] = useState(true)

  const handleReset = () => {
    localStorage.removeItem("nasa-farm-save")
    setShowResetConfirm(false)
    onBack()
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button onClick={onBack} variant="ghost" size="icon">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary font-mono">{t.settings.title}</h1>
            <p className="text-sm text-muted-foreground font-mono">{t.mainMenu.team}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Language Settings */}
          <div className="border border-primary/30 rounded-lg p-6 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-primary font-mono">{t.settings.language}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => onLanguageChange("en")}
                variant={language === "en" ? "default" : "outline"}
                className="font-mono"
              >
                {t.settings.english}
              </Button>
              <Button
                onClick={() => onLanguageChange("es")}
                variant={language === "es" ? "default" : "outline"}
                className="font-mono"
              >
                {t.settings.spanish}
              </Button>
            </div>
          </div>

          {/* Sound Settings */}
          <div className="border border-primary/30 rounded-lg p-6 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              )}
              <h2 className="text-xl font-bold text-primary font-mono">{t.settings.sound}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-mono text-muted-foreground">{t.settings.music}</span>
                  <span className="text-sm font-mono text-primary">{musicVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-mono text-muted-foreground">{t.settings.effects}</span>
                  <span className="text-sm font-mono text-primary">{effectsVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={effectsVolume}
                  onChange={(e) => setEffectsVolume(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Gameplay Settings */}
          <div className="border border-primary/30 rounded-lg p-6 bg-card/50 backdrop-blur">
            <h2 className="text-xl font-bold text-primary font-mono mb-4">{t.settings.gameplay}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">{t.settings.autosave}</span>
                <Button
                  onClick={() => setAutosave(!autosave)}
                  variant={autosave ? "default" : "outline"}
                  className="font-mono"
                >
                  {autosave ? t.settings.on : t.settings.off}
                </Button>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-xs font-mono text-muted-foreground">
                  {language === "en"
                    ? "Graphics quality is set to maximum for the best experience. This setting cannot be changed."
                    : "La calidad gráfica está configurada al máximo para la mejor experiencia. Esta configuración no se puede cambiar."}
                </p>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="border border-red-600/30 rounded-lg p-6 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-bold text-red-500 font-mono">{t.settings.data}</h2>
            </div>
            {!showResetConfirm ? (
              <Button onClick={() => setShowResetConfirm(true)} variant="destructive" className="w-full font-mono">
                {t.settings.resetProgress}
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-mono text-muted-foreground">{t.settings.resetConfirm}</p>
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={() => setShowResetConfirm(false)} variant="outline" className="font-mono">
                    {t.settings.cancel}
                  </Button>
                  <Button onClick={handleReset} variant="destructive" className="font-mono">
                    {t.settings.confirm}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
