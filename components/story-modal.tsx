"use client"

import { Button } from "@/components/ui/button"
import { Rocket, Sprout, Beef, Tractor } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface StoryModalProps {
  language: Language
  type: "intro" | "level1" | "level2" | "level3" | "final"
  onContinue: () => void
}

export function StoryModal({ language, type, onContinue }: StoryModalProps) {
  const t = useTranslation(language)

  const getIcon = () => {
    switch (type) {
      case "intro":
        return <Rocket className="w-20 h-20 text-blue-400" />
      case "level1":
        return <Sprout className="w-20 h-20 text-green-400" />
      case "level2":
        return <Beef className="w-20 h-20 text-orange-400" />
      case "level3":
        return <Tractor className="w-20 h-20 text-amber-400" />
      case "final":
        return <Rocket className="w-20 h-20 text-purple-400" />
    }
  }

  const getStory = () => {
    switch (type) {
      case "intro":
        return t.story.intro
      case "level1":
        return t.story.level1Intro
      case "level2":
        return t.story.level2Intro
      case "level3":
        return t.story.level3Intro
      case "final":
        return t.story.finalIntro
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 border-4 border-blue-500 rounded-lg p-8 max-w-2xl w-full mx-4 shadow-2xl">
        <div className="text-center mb-8">
          <div className="mb-6 animate-pulse">{getIcon()}</div>
          <div className="bg-black/30 rounded-lg p-6">
            <p className="text-white font-mono text-lg leading-relaxed whitespace-pre-line">{getStory()}</p>
          </div>
        </div>

        <Button onClick={onContinue} className="w-full font-mono bg-blue-600 hover:bg-blue-700" size="lg">
          BEGIN MISSION →
        </Button>
      </div>
    </div>
  )
}
