"use client"

import { Button } from "@/components/ui/button"
import { Award, Download, Share2, ArrowLeft, Satellite, Sprout } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface CertificateViewerProps {
  language: Language
  quizScore: number
  quizPassed: boolean
  onBack: () => void
}

export function CertificateViewer({ language, quizScore, quizPassed, onBack }: CertificateViewerProps) {
  const t = useTranslation(language)

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    alert("Certificate download feature coming soon!")
  }

  const handleShare = () => {
    // In a real implementation, this would share on social media
    alert("Certificate sharing feature coming soon!")
  }

  if (!quizPassed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white border-4 border-amber-600 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-amber-800 mb-4">{t.quiz.fail}</h2>
          <p className="text-gray-600 mb-6">
            {language === "en"
              ? "Complete the final quiz with a passing score to earn your certificate."
              : "Completa el cuestionario final con una puntuación aprobatoria para obtener tu certificado."}
          </p>
          <Button onClick={onBack} className="bg-amber-600 hover:bg-amber-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.settings.back}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="mb-6 flex justify-between items-center">
          <Button onClick={onBack} variant="outline" className="border-amber-600 text-amber-800 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.settings.back}
          </Button>
          <div className="flex gap-2">
            <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              {language === "en" ? "Download" : "Descargar"}
            </Button>
            <Button onClick={handleShare} className="bg-blue-600 hover:bg-blue-700">
              <Share2 className="w-4 h-4 mr-2" />
              {language === "en" ? "Share" : "Compartir"}
            </Button>
          </div>
        </div>

        <div className="bg-white border-8 border-amber-600 rounded-lg p-12 shadow-2xl">
          <div className="border-4 border-amber-400 rounded-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Satellite className="w-12 h-12 text-blue-600" />
                <Sprout className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-amber-800 mb-2">NASA FARM NAVIGATORS</h1>
              <p className="text-lg text-gray-600 font-mono">
                {language === "en" ? "Educational Agricultural Simulator" : "Simulador Agrícola Educativo"}
              </p>
            </div>

            {/* Certificate Title */}
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-amber-100 to-green-100 px-6 py-3 rounded-lg mb-4">
                <h2 className="text-2xl font-bold text-amber-800">
                  {language === "en" ? "CERTIFICATE OF COMPLETION" : "CERTIFICADO DE FINALIZACIÓN"}
                </h2>
              </div>
              <p className="text-gray-600 italic">{language === "en" ? "This certifies that" : "Esto certifica que"}</p>
            </div>

            {/* Recipient */}
            <div className="text-center mb-8">
              <div className="border-b-2 border-amber-600 pb-2 mb-6 max-w-md mx-auto">
                <p className="text-3xl font-bold text-amber-900">
                  {language === "en" ? "Certified Farmer" : "Agricultor Certificado"}
                </p>
              </div>
            </div>

            {/* Achievement */}
            <div className="text-center mb-8">
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">{t.gameOver.certificateText}</p>
            </div>

            {/* Score Badge */}
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-br from-amber-400 to-green-500 rounded-full p-1">
                <div className="bg-white rounded-full px-8 py-4">
                  <div className="text-center">
                    <Award className="w-12 h-12 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 font-mono">
                      {language === "en" ? "Final Score" : "Puntuación Final"}
                    </p>
                    <p className="text-3xl font-bold text-amber-800">{quizScore}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Mastered */}
            <div className="mb-8">
              <h3 className="text-center text-lg font-bold text-amber-800 mb-4">{t.gameOver.whatYouLearned}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  <span>{t.gameOver.learningPoint1}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  <span>{t.gameOver.learningPoint2}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  <span>{t.gameOver.learningPoint3}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  <span>{t.gameOver.learningPoint4}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-amber-300 pt-6 mt-8">
              <div className="flex justify-between items-end">
                <div className="text-center flex-1">
                  <div className="border-t-2 border-gray-400 pt-2 mb-2 max-w-xs mx-auto">
                    <p className="text-sm font-bold text-gray-700">
                      {language === "en" ? "Date Issued" : "Fecha de Emisión"}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-center flex-1">
                  <div className="border-t-2 border-gray-400 pt-2 mb-2 max-w-xs mx-auto">
                    <p className="text-sm font-bold text-gray-700">
                      {language === "en" ? "Authorized By" : "Autorizado Por"}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">NASA Farm Navigators Program</p>
                </div>
              </div>
            </div>

            {/* Seal */}
            <div className="flex justify-center mt-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-green-600 flex items-center justify-center border-4 border-amber-700">
                <Award className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6 font-mono">
          {language === "en"
            ? "Powered by NASA Earth Observation Data • Educational Simulator v2.0"
            : "Impulsado por Datos de Observación Terrestre de la NASA • Simulador Educativo v2.0"}
        </p>
      </div>
    </div>
  )
}
