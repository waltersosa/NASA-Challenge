"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, XCircle, CheckCircle } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface AlertModalProps {
  language: Language
  type: "wrong-decision" | "critical-health" | "success"
  correctAnswer?: string
  consequence?: string
  onClose: () => void
}

export function AlertModal({ language, type, correctAnswer, consequence, onClose }: AlertModalProps) {
  const t = useTranslation(language)

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`border-4 rounded-lg p-8 max-w-lg w-full mx-4 shadow-2xl ${
          type === "success"
            ? "bg-gradient-to-br from-green-900 to-green-800 border-green-500"
            : type === "critical-health"
              ? "bg-gradient-to-br from-red-900 to-red-800 border-red-500"
              : "bg-gradient-to-br from-orange-900 to-orange-800 border-orange-500"
        }`}
      >
        <div className="text-center mb-6">
          {type === "success" ? (
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4 animate-bounce" />
          ) : type === "critical-health" ? (
            <AlertTriangle className="w-20 h-20 text-red-400 mx-auto mb-4 animate-pulse" />
          ) : (
            <XCircle className="w-20 h-20 text-orange-400 mx-auto mb-4 animate-pulse" />
          )}

          <h2 className="text-2xl font-bold text-white font-mono mb-4">
            {type === "critical-health"
              ? t.alerts.criticalHealth
              : type === "success"
                ? "SUCCESS!"
                : t.alerts.wrongDecision}
          </h2>

          {type === "wrong-decision" && correctAnswer && (
            <div className="bg-black/30 rounded-lg p-4 mb-4 text-left">
              <p className="text-amber-300 font-mono font-bold mb-2">{t.alerts.correctAnswer}</p>
              <p className="text-white font-mono text-sm">{correctAnswer}</p>
            </div>
          )}

          {consequence && (
            <div className="bg-black/30 rounded-lg p-4 mb-4 text-left">
              <p className="text-red-300 font-mono font-bold mb-2">{t.alerts.consequence}</p>
              <p className="text-white font-mono text-sm">{consequence}</p>
            </div>
          )}

          {type === "critical-health" && <p className="text-white font-mono text-sm mb-4">{t.alerts.healthLow}</p>}

          {type === "wrong-decision" && <p className="text-amber-200 font-mono text-sm italic">{t.alerts.learnMore}</p>}
        </div>

        <Button onClick={onClose} className="w-full font-mono bg-white text-black hover:bg-gray-200" size="lg">
          {type === "critical-health" ? t.alerts.lastChance : "CONTINUE"}
        </Button>
      </div>
    </div>
  )
}
