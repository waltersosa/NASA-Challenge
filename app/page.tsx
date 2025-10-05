"use client"

import { useState, useEffect, useRef } from "react"
import { GameCanvas } from "@/components/game-canvas"
import { NASAPanel } from "@/components/nasa-panel"
import { DecisionPanel } from "@/components/decision-panel"
import { GameOver } from "@/components/game-over"
import { MainMenu } from "@/components/main-menu"
import { LevelSelect } from "@/components/level-select"
import { SettingsPanel } from "@/components/settings-panel"
import { PauseMenu } from "@/components/pause-menu"
import { AlertModal } from "@/components/alert-modal"
import { StoryModal } from "@/components/story-modal"
import { FinalQuiz } from "@/components/final-quiz"
import { CertificateViewer } from "@/components/certificate-viewer"
import { Button } from "@/components/ui/button"
import { Satellite, Sprout, Pause, Volume2, VolumeX } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

type GameLevel = 1 | 2 | 3

type GameState =
  | "menu"
  | "settings"
  | "levelSelect"
  | "story"
  | "farm"
  | "nasa"
  | "decision"
  | "gameover"
  | "finalQuiz"
  | "certificateViewer"

export default function Home() {
  const [language, setLanguage] = useState<Language>("en")
  const [gameState, setGameState] = useState<GameState>("menu")
  const [storyType, setStoryType] = useState<"intro" | "level1" | "level2" | "level3" | "final">("intro")
  const [currentLevel, setCurrentLevel] = useState<GameLevel>(1)
  const [currentMonth, setCurrentMonth] = useState(1)
  const [cropHealth, setCropHealth] = useState(100)
  const [animalHealth, setAnimalHealth] = useState(100)
  const [productivityScore, setProductivityScore] = useState(0)
  const [sustainabilityScore, setSustainabilityScore] = useState(100)
  const [decisions, setDecisions] = useState<any[]>([])
  const [level1Completed, setLevel1Completed] = useState(false)
  const [level2Completed, setLevel2Completed] = useState(false)
  const [level3Completed, setLevel3Completed] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState<"wrong-decision" | "critical-health" | "success" | "red-alert">(
    "wrong-decision",
  )
  const [alertData, setAlertData] = useState<{ correctAnswer?: string; consequence?: string; alertMessage?: string }>(
    {},
  )
  const [isMuted, setIsMuted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [currentNASAData, setCurrentNASAData] = useState<any>(null)
  const [lastDecisionCorrect, setLastDecisionCorrect] = useState(true)

  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null)
  const correctSoundRef = useRef<HTMLAudioElement | null>(null)
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null)
  const alertSoundRef = useRef<HTMLAudioElement | null>(null)

  const t = useTranslation(language)

  useEffect(() => {
    backgroundMusicRef.current = new Audio("https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3")
    backgroundMusicRef.current.loop = true
    backgroundMusicRef.current.volume = 0.3

    correctSoundRef.current = new Audio("https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3")
    correctSoundRef.current.volume = 0.5

    wrongSoundRef.current = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_a935a9d5e0.mp3")
    wrongSoundRef.current.volume = 0.5

    alertSoundRef.current = new Audio("https://cdn.pixabay.com/audio/2022/03/24/audio_c8c6e4e2f8.mp3")
    alertSoundRef.current.volume = 0.6

    return () => {
      backgroundMusicRef.current?.pause()
      correctSoundRef.current?.pause()
      wrongSoundRef.current?.pause()
      alertSoundRef.current?.pause()
    }
  }, [])

  useEffect(() => {
    if (backgroundMusicRef.current) {
      if (isMuted || gameState === "menu" || gameState === "settings") {
        backgroundMusicRef.current.pause()
      } else {
        backgroundMusicRef.current.play().catch(() => {})
      }
    }
  }, [isMuted, gameState])

  useEffect(() => {
    if (currentNASAData && gameState === "farm") {
      const ndvi = currentNASAData.current?.ndvi || 1
      const lst = currentNASAData.current?.lst || 20

      if (ndvi < 0.3) {
        setAlertType("red-alert")
        setAlertData({
          alertMessage: `CRITICAL: NDVI at ${ndvi.toFixed(2)} - Vegetation health critically low!`,
        })
        setShowAlert(true)
        if (!isMuted) alertSoundRef.current?.play().catch(() => {})
      } else if (lst > 35 && currentLevel >= 2) {
        setAlertType("red-alert")
        setAlertData({
          alertMessage: `HEAT STRESS ALERT: LST at ${lst.toFixed(1)}°C - Animals at risk!`,
        })
        setShowAlert(true)
        if (!isMuted) alertSoundRef.current?.play().catch(() => {})
      }
    }
  }, [currentNASAData, gameState, currentLevel, isMuted])

  useEffect(() => {
    const saveData = {
      currentMonth,
      cropHealth,
      animalHealth,
      productivityScore,
      sustainabilityScore,
      decisions,
      currentLevel,
      level1Completed,
      level2Completed,
      level3Completed,
      language,
      timestamp: Date.now(),
    }
    localStorage.setItem("nasa-farm-save", JSON.stringify(saveData))
  }, [
    currentMonth,
    cropHealth,
    animalHealth,
    productivityScore,
    sustainabilityScore,
    decisions,
    currentLevel,
    level1Completed,
    level2Completed,
    level3Completed,
    language,
  ])

  useEffect(() => {
    const saved = localStorage.getItem("nasa-farm-save")
    if (saved) {
      const data = JSON.parse(saved)
      setCurrentMonth(data.currentMonth || 1)
      setCropHealth(data.cropHealth || 100)
      setAnimalHealth(data.animalHealth || 100)
      setProductivityScore(data.productivityScore || 0)
      setSustainabilityScore(data.sustainabilityScore || 100)
      setDecisions(data.decisions || [])
      setCurrentLevel(data.currentLevel || 1)
      setLevel1Completed(data.level1Completed || false)
      setLevel2Completed(data.level2Completed || false)
      setLevel3Completed(data.level3Completed || false)
      setLanguage(data.language || "en")
    }
  }, [])

  const startNewGame = () => {
    setStoryType("intro")
    setGameState("story")
  }

  const selectLevel = (level: GameLevel) => {
    if (level === 2 && !level1Completed) return
    if (level === 3 && !level2Completed) return

    setCurrentLevel(level)
    setCurrentMonth(1)
    setCropHealth(100)
    setAnimalHealth(100)
    setProductivityScore(0)
    setSustainabilityScore(100)
    setDecisions([])

    if (level === 1) setStoryType("level1")
    else if (level === 2) setStoryType("level2")
    else setStoryType("level3")
    setGameState("story")
  }

  const continueGame = () => {
    setGameState("farm")
  }

  const openSettings = () => {
    setGameState("settings")
  }

  const openNASAPanel = () => {
    setGameState("nasa")
  }

  const closeNASAPanel = () => {
    setGameState("farm")
  }

  const openDecisionPanel = () => {
    setGameState("decision")
  }

  const makeDecision = (decision: string, isCorrect: boolean, correctAnswer?: string) => {
    if (!isMuted) {
      if (isCorrect) {
        correctSoundRef.current?.play().catch(() => {})
      } else {
        wrongSoundRef.current?.play().catch(() => {})
      }
    }

    setLastDecisionCorrect(isCorrect)

    const newDecisions = [...decisions, { month: currentMonth, decision, isCorrect, level: currentLevel }]
    setDecisions(newDecisions)

    if (isCorrect) {
      if (currentLevel === 1 || currentLevel === 3) {
        setCropHealth(Math.min(100, cropHealth + 10))
      }
      if (currentLevel === 2 || currentLevel === 3) {
        setAnimalHealth(Math.min(100, animalHealth + 10))
      }
      setProductivityScore(productivityScore + 20)
    } else {
      const healthDrop = 15
      const sustainDrop = 10

      if (currentLevel === 1 || currentLevel === 3) {
        setCropHealth(Math.max(0, cropHealth - healthDrop))
      }
      if (currentLevel === 2 || currentLevel === 3) {
        setAnimalHealth(Math.max(0, animalHealth - healthDrop))
      }
      setSustainabilityScore(Math.max(0, sustainabilityScore - sustainDrop))

      setAlertType("wrong-decision")
      setAlertData({
        correctAnswer,
        consequence: `${t.game.health} -${healthDrop}%, ${t.game.sustainability} -${sustainDrop}%`,
      })
      setShowAlert(true)
    }

    const newHealth = currentLevel === 1 ? cropHealth - 15 : animalHealth - 15
    if (!isCorrect && newHealth < 30 && newHealth > 0) {
      setTimeout(() => {
        setAlertType("critical-health")
        setAlertData({})
        setShowAlert(true)
      }, 2000)
    }

    if (currentMonth >= 6) {
      const finalCropHealth = currentLevel === 1 || currentLevel === 3 ? cropHealth : 100
      const finalAnimalHealth = currentLevel === 2 || currentLevel === 3 ? animalHealth : 100
      const minHealth = Math.min(finalCropHealth, finalAnimalHealth)

      if (currentLevel === 1 && finalCropHealth > 60) {
        setLevel1Completed(true)
      }
      if (currentLevel === 2 && finalAnimalHealth > 60) {
        setLevel2Completed(true)
      }
      if (currentLevel === 3 && minHealth > 60) {
        setLevel3Completed(true)
        setStoryType("final")
        setGameState("story")
        return
      }
      setGameState("gameover")
    } else {
      setCurrentMonth(currentMonth + 1)
      setGameState("farm")
    }
  }

  const hasSavedGame = () => {
    return localStorage.getItem("nasa-farm-save") !== null
  }

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
  }

  const proceedToNextLevel = () => {
    if (currentLevel === 1 && level1Completed) {
      selectLevel(2)
    } else if (currentLevel === 2 && level2Completed) {
      selectLevel(3)
    }
  }

  const handlePause = () => {
    setIsPaused(true)
  }

  const handleResume = () => {
    setIsPaused(false)
  }

  const handleRestartLevel = () => {
    selectLevel(currentLevel)
    setIsPaused(false)
  }

  const handlePauseSettings = () => {
    setIsPaused(false)
    setGameState("settings")
  }

  const handlePauseMenu = () => {
    setIsPaused(false)
    setGameState("menu")
  }

  const handleStoryContinue = () => {
    if (storyType === "intro") {
      setGameState("levelSelect")
    } else if (storyType === "final") {
      setGameState("finalQuiz")
    } else {
      setGameState("farm")
    }
  }

  const handleQuizComplete = (score: number, passed: boolean) => {
    const percentage = (score / 5) * 100
    setQuizScore(percentage)
    setQuizPassed(passed && percentage >= 90)
    setGameState("certificateViewer")
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleViewCertificate = () => {
    setGameState("certificateViewer")
  }

  if (gameState === "menu") {
    return (
      <MainMenu
        onNewGame={startNewGame}
        onContinue={continueGame}
        onSettings={openSettings}
        hasSavedGame={hasSavedGame()}
        language={language}
        level3Completed={level3Completed}
        onViewCertificate={handleViewCertificate}
      />
    )
  }

  if (gameState === "settings") {
    return (
      <SettingsPanel
        language={language}
        onLanguageChange={handleLanguageChange}
        onBack={() => setGameState("menu")}
        isMuted={isMuted}
        onMuteChange={toggleMute}
      />
    )
  }

  if (gameState === "levelSelect") {
    return (
      <LevelSelect
        onSelectLevel={selectLevel}
        level1Completed={level1Completed}
        level2Completed={level2Completed}
        language={language}
        onBack={() => setGameState("menu")}
      />
    )
  }

  if (gameState === "story") {
    return <StoryModal language={language} type={storyType} onContinue={handleStoryContinue} />
  }

  if (gameState === "finalQuiz") {
    return <FinalQuiz language={language} onComplete={handleQuizComplete} />
  }

  if (gameState === "certificateViewer") {
    return (
      <CertificateViewer
        language={language}
        quizScore={quizScore}
        quizPassed={quizPassed}
        onBack={() => setGameState("menu")}
      />
    )
  }

  if (gameState === "gameover") {
    return (
      <GameOver
        productivityScore={productivityScore}
        sustainabilityScore={sustainabilityScore}
        cropHealth={cropHealth}
        animalHealth={animalHealth}
        decisions={decisions}
        currentLevel={currentLevel}
        level1Completed={level1Completed}
        level2Completed={level2Completed}
        onRestart={startNewGame}
        onMenu={() => setGameState("menu")}
        onNextLevel={proceedToNextLevel}
        language={language}
      />
    )
  }

  if (gameState === "nasa") {
    return (
      <NASAPanel
        currentMonth={currentMonth}
        currentLevel={currentLevel}
        onClose={closeNASAPanel}
        onProceed={openDecisionPanel}
        language={language}
        onDataLoaded={setCurrentNASAData}
      />
    )
  }

  if (gameState === "decision") {
    return (
      <DecisionPanel
        currentMonth={currentMonth}
        currentLevel={currentLevel}
        onDecision={makeDecision}
        onBack={() => setGameState("nasa")}
        language={language}
      />
    )
  }

  const currentHealth =
    currentLevel === 1 ? cropHealth : currentLevel === 2 ? animalHealth : Math.min(cropHealth, animalHealth)

  const getLevelTitle = () => {
    if (currentLevel === 1) return t.game.levelCrop
    if (currentLevel === 2) return t.game.levelLivestock
    return t.game.levelIntegrated
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <header className="border-b-2 border-cyan-400 bg-black/80 backdrop-blur shadow-lg shadow-cyan-500/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sprout className="w-6 h-6 text-green-400 animate-pulse" />
            <h1 className="text-xl font-bold text-cyan-400 font-mono tracking-wider">NASA FARM NAVIGATORS</h1>
            <span className="text-sm text-green-400 font-mono">
              {t.game.level} {currentLevel}: {getLevelTitle()}
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm font-mono">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">{t.game.month}:</span>
              <span className="text-green-400 font-bold">{currentMonth}/6</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">{t.game.health}:</span>
              <span
                className={`font-bold ${currentHealth > 70 ? "text-green-400" : currentHealth > 40 ? "text-yellow-400" : "text-red-400"}`}
              >
                {currentHealth}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">{t.game.productivity}:</span>
              <span className="text-green-400 font-bold">{productivityScore}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">{t.game.sustainability}:</span>
              <span className="text-green-400 font-bold">{sustainabilityScore}</span>
            </div>
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-cyan-500/20 rounded transition-colors border border-cyan-400/30"
              title={isMuted ? t.settings.on : t.settings.off}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-cyan-400" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
            </button>
            <button
              onClick={handlePause}
              className="p-2 hover:bg-cyan-500/20 rounded transition-colors border border-cyan-400/30"
              title={t.pause.title}
            >
              <Pause className="w-5 h-5 text-cyan-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          <div className="lg:col-span-2">
            <GameCanvas
              cropHealth={cropHealth}
              animalHealth={animalHealth}
              currentMonth={currentMonth}
              currentLevel={currentLevel}
              language={language}
              lastDecisionCorrect={lastDecisionCorrect}
            />
          </div>

          <div className="space-y-4">
            <div className="border-2 border-cyan-400 rounded-lg p-4 bg-black/60 backdrop-blur shadow-lg shadow-cyan-500/30">
              <h2 className="text-lg font-bold text-cyan-400 font-mono mb-4 flex items-center gap-2">
                <Satellite className="w-5 h-5 animate-pulse" />
                {t.game.missionControl}
              </h2>

              <div className="space-y-3">
                <Button
                  onClick={openNASAPanel}
                  className="w-full font-mono bg-cyan-500/20 hover:bg-cyan-500/30 border-2 border-cyan-400 text-cyan-400"
                  size="lg"
                >
                  <Satellite className="w-4 h-4 mr-2" />
                  {t.game.viewNasaData}
                </Button>

                <Button
                  onClick={openDecisionPanel}
                  className="w-full font-mono bg-green-500/20 hover:bg-green-500/30 border-2 border-green-400 text-green-400"
                  size="lg"
                >
                  {t.game.makeDecision}
                </Button>
              </div>
            </div>

            <div className="border-2 border-cyan-400 rounded-lg p-4 bg-black/60 backdrop-blur shadow-lg shadow-cyan-500/30">
              <h3 className="text-sm font-bold text-cyan-400 font-mono mb-3">
                {currentLevel === 1 ? t.game.cropStatus : currentLevel === 2 ? t.game.animalStatus : t.game.farmStatus}
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-cyan-400">{t.game.health}</span>
                    <span className="text-green-400">{currentHealth}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-cyan-400/30">
                    <div
                      className={`h-full transition-all ${currentHealth > 70 ? "bg-green-400" : currentHealth > 40 ? "bg-yellow-400" : "bg-red-400"}`}
                      style={{ width: `${currentHealth}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-cyan-400">{t.game.sustainability}</span>
                    <span className="text-green-400">{sustainabilityScore}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-cyan-400/30">
                    <div className="h-full bg-green-400 transition-all" style={{ width: `${sustainabilityScore}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {decisions.length > 0 && (
              <div className="border-2 border-cyan-400 rounded-lg p-4 bg-black/60 backdrop-blur shadow-lg shadow-cyan-500/30">
                <h3 className="text-sm font-bold text-cyan-400 font-mono mb-3">{t.game.recentDecisions}</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {decisions
                    .slice(-3)
                    .reverse()
                    .map((d, i) => (
                      <div key={i} className="text-xs font-mono flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${d.isCorrect ? "bg-green-400" : "bg-red-400"}`} />
                        <span className="text-cyan-400">
                          {t.game.month} {d.month}:
                        </span>
                        <span className="text-green-400 truncate flex-1">{d.decision}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {isPaused && (
        <PauseMenu
          language={language}
          onResume={handleResume}
          onRestart={handleRestartLevel}
          onSettings={handlePauseSettings}
          onMainMenu={handlePauseMenu}
        />
      )}

      {showAlert && (
        <AlertModal
          language={language}
          type={alertType}
          correctAnswer={alertData.correctAnswer}
          consequence={alertData.consequence}
          alertMessage={alertData.alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  )
}
