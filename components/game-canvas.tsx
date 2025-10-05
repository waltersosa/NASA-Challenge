"use client"

import { useEffect, useRef } from "react"
import { type Language, useTranslation } from "@/lib/i18n"

interface GameCanvasProps {
  cropHealth: number
  animalHealth: number
  currentMonth: number
  currentLevel: 1 | 2 | 3
  language: Language
  lastDecisionCorrect: boolean
}

type CropType = "corn" | "tomato" | "lettuce" | "carrot"
type AnimalType = "cow" | "chicken"

interface Crop {
  type: CropType
  x: number
  y: number
  growthStage: number
  swayOffset: number
  swaySpeed: number
}

interface Animal {
  type: AnimalType
  x: number
  y: number
  health: number
  frame: number
  targetX: number
  targetY: number
  speed: number
}

export function GameCanvas({
  cropHealth,
  animalHealth,
  currentMonth,
  currentLevel,
  language,
  lastDecisionCorrect,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cropsRef = useRef<Crop[]>([])
  const animalsRef = useRef<Animal[]>([])
  const farmerRef = useRef({
    x: 100,
    y: 0,
    direction: 1,
    action: "walking" as "walking" | "working" | "idle",
    actionTimer: 0,
    frame: 0,
  })
  const farmer2Ref = useRef({
    x: 500,
    y: 0,
    direction: -1,
    action: "walking" as "walking" | "working" | "idle",
    actionTimer: 0,
    frame: 0,
  })
  const t = useTranslation(language)

  const getFieldStatus = (health: number): string => {
    if (health > 80) return t.fieldStatus.excellent
    if (health > 60) return t.fieldStatus.good
    if (health > 40) return t.fieldStatus.fair
    if (health > 20) return t.fieldStatus.poor
    return t.fieldStatus.critical
  }

  useEffect(() => {
    if (currentLevel === 1 && cropsRef.current.length === 0) {
      const cropTypes: CropType[] = ["corn", "tomato", "lettuce", "carrot"]
      const newCrops: Crop[] = []
      const rows = 3
      const cols = 6

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          newCrops.push({
            type: cropTypes[Math.floor(Math.random() * cropTypes.length)],
            x: col,
            y: row,
            growthStage: 0,
            swayOffset: Math.random() * Math.PI * 2,
            swaySpeed: 0.02 + Math.random() * 0.02,
          })
        }
      }
      cropsRef.current = newCrops
    } else if (currentLevel === 3 && cropsRef.current.length === 0) {
      const cropTypes: CropType[] = ["corn", "tomato", "lettuce", "carrot"]
      const newCrops: Crop[] = []
      const rows = 4
      const cols = 8

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          newCrops.push({
            type: cropTypes[Math.floor(Math.random() * cropTypes.length)],
            x: col,
            y: row,
            growthStage: 0,
            swayOffset: Math.random() * Math.PI * 2,
            swaySpeed: 0.02 + Math.random() * 0.02,
          })
        }
      }
      cropsRef.current = newCrops
    }
  }, [currentLevel])

  useEffect(() => {
    if ((currentLevel === 2 || currentLevel === 3) && animalsRef.current.length === 0) {
      const newAnimals: Animal[] = []
      const numCows = currentLevel === 3 ? 6 : 4
      const numChickens = currentLevel === 3 ? 8 : 6

      for (let i = 0; i < numCows; i++) {
        const x = 100 + i * 120
        const y = 200 + Math.random() * 100
        newAnimals.push({
          type: "cow",
          x,
          y,
          health: 100,
          frame: 0,
          targetX: x,
          targetY: y,
          speed: 0.5,
        })
      }

      for (let i = 0; i < numChickens; i++) {
        const x = 80 + i * 90
        const y = 350 + Math.random() * 50
        newAnimals.push({
          type: "chicken",
          x,
          y,
          health: 100,
          frame: 0,
          targetX: x,
          targetY: y,
          speed: 1,
        })
      }

      animalsRef.current = newAnimals
    }
  }, [currentLevel])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationFrame = 0

    const animate = () => {
      animationFrame++

      if (currentLevel === 1) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "#87CEEB")
        gradient.addColorStop(0.7, "#B0E0E6")
        gradient.addColorStop(1, "#90EE90")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else if (currentLevel === 2) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "#FFD700")
        gradient.addColorStop(0.5, "#FFA500")
        gradient.addColorStop(1, "#7CB342")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "#4A90E2")
        gradient.addColorStop(0.4, "#5DADE2")
        gradient.addColorStop(0.7, "#67B26F")
        gradient.addColorStop(1, "#8BC34A")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      if (currentLevel === 1) {
        ctx.fillStyle = "#FFD700"
        ctx.beginPath()
        ctx.arc(canvas.width - 80, 60, 30, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = "#FFD700"
        ctx.lineWidth = 3
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4
          ctx.beginPath()
          ctx.moveTo(canvas.width - 80 + Math.cos(angle) * 35, 60 + Math.sin(angle) * 35)
          ctx.lineTo(canvas.width - 80 + Math.cos(angle) * 50, 60 + Math.sin(angle) * 50)
          ctx.stroke()
        }
      } else if (currentLevel === 2) {
        ctx.fillStyle = "#FF6347"
        ctx.beginPath()
        ctx.arc(canvas.width - 80, 60, 35, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = "rgba(255, 99, 71, 0.3)"
        ctx.beginPath()
        ctx.arc(canvas.width - 80, 60, 50, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.fillStyle = "#FDB813"
        ctx.beginPath()
        ctx.arc(canvas.width - 80, 60, 28, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = "#4A90E2"
        ctx.lineWidth = 2
        ctx.strokeRect(canvas.width - 150, 40, 30, 20)
        ctx.fillStyle = "#4A90E2"
        ctx.fillRect(canvas.width - 148, 42, 26, 16)
        for (let i = 1; i < 3; i++) {
          ctx.strokeStyle = "#2E5C8A"
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(canvas.width - 148 + i * 8, 42)
          ctx.lineTo(canvas.width - 148 + i * 8, 58)
          ctx.stroke()
        }
      }

      const cloudOffset = (animationFrame * 0.2) % canvas.width
      drawCloud(ctx, 100 + cloudOffset, 50, 60)
      drawCloud(ctx, canvas.width - 200 + cloudOffset, 80, 50)

      const soilHeight = 200

      if (currentLevel === 1) {
        ctx.fillStyle = "#8B4513"
      } else if (currentLevel === 2) {
        ctx.fillStyle = "#7CB342"
      } else {
        ctx.fillStyle = "#6D4C41"
      }
      ctx.fillRect(0, canvas.height - soilHeight, canvas.width, soilHeight)

      if (currentLevel === 1) {
        ctx.fillStyle = "#654321"
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * canvas.width
          const y = canvas.height - soilHeight + Math.random() * soilHeight
          ctx.fillRect(x, y, 3, 2)
        }
      } else if (currentLevel === 2) {
        ctx.fillStyle = "#558B2F"
        for (let i = 0; i < 100; i++) {
          const x = (i * canvas.width) / 100
          const y = canvas.height - soilHeight + Math.random() * 30
          const sway = Math.sin(animationFrame * 0.05 + i) * 2
          ctx.fillRect(x + sway, y, 2, 4)
        }
      } else {
        ctx.strokeStyle = "#424242"
        ctx.lineWidth = 2
        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          ctx.moveTo(0, canvas.height - soilHeight + 40 + i * 30)
          ctx.lineTo(canvas.width, canvas.height - soilHeight + 40 + i * 30)
          ctx.stroke()
        }
        ctx.fillStyle = "#2196F3"
        for (let i = 0; i < 20; i++) {
          const x = (i * canvas.width) / 20
          const y = canvas.height - soilHeight + 40
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.fillStyle = "#228B22"
      ctx.fillRect(0, canvas.height - soilHeight - 5, canvas.width, 5)

      if (currentLevel === 1) {
        const startX = 100
        const startY = canvas.height - soilHeight + 20
        const spacingX = 80
        const spacingY = 60

        cropsRef.current.forEach((crop) => {
          const x = startX + crop.x * spacingX
          const y = startY + crop.y * spacingY
          const growthStage = Math.min(currentMonth, 6)
          crop.growthStage = growthStage

          crop.swayOffset += crop.swaySpeed
          const sway = Math.sin(crop.swayOffset) * 3

          drawCropByType(ctx, crop.type, x + sway, y, cropHealth, growthStage, animationFrame)
        })
      } else if (currentLevel === 2) {
        animalsRef.current.forEach((animal) => {
          animal.health = animalHealth
          animal.frame = Math.floor(animationFrame / 10) % 4

          if (animationFrame % 120 === 0) {
            animal.targetX = 50 + Math.random() * (canvas.width - 150)
            animal.targetY = canvas.height - soilHeight + 20 + Math.random() * 150
          }

          const dx = animal.targetX - animal.x
          const dy = animal.targetY - animal.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance > 2) {
            animal.x += (dx / distance) * animal.speed
            animal.y += (dy / distance) * animal.speed
          }

          if (animal.type === "cow") {
            drawCow(ctx, animal.x, animal.y, animal.health, animal.frame, currentMonth)
          } else {
            drawChicken(ctx, animal.x, animal.y, animal.health, animal.frame, currentMonth)
          }
        })
      } else {
        const startX = 50
        const startY = canvas.height - soilHeight + 20
        const spacingX = 70
        const spacingY = 60

        cropsRef.current.forEach((crop, idx) => {
          const x = startX + (idx % 8) * spacingX
          const y = startY + Math.floor(idx / 8) * spacingY
          const growthStage = Math.min(currentMonth, 6)
          crop.growthStage = growthStage

          crop.swayOffset += crop.swaySpeed
          const sway = Math.sin(crop.swayOffset) * 3

          drawCropByType(ctx, crop.type, x + sway, y, cropHealth, growthStage, animationFrame)
        })

        animalsRef.current.forEach((animal) => {
          animal.health = animalHealth
          animal.frame = Math.floor(animationFrame / 10) % 4

          if (animationFrame % 120 === 0) {
            animal.targetX = 50 + Math.random() * (canvas.width - 150)
            animal.targetY = canvas.height - soilHeight + 100 + Math.random() * 80
          }

          const dx = animal.targetX - animal.x
          const dy = animal.targetY - animal.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance > 2) {
            animal.x += (dx / distance) * animal.speed
            animal.y += (dy / distance) * animal.speed
          }

          if (animal.type === "cow") {
            drawCow(ctx, animal.x, animal.y, animal.health, animal.frame, currentMonth)
          } else {
            drawChicken(ctx, animal.x, animal.y, animal.health, animal.frame, currentMonth)
          }
        })

        ctx.strokeStyle = "#8B4513"
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height - soilHeight)
        ctx.lineTo(canvas.width / 2, canvas.height)
        ctx.stroke()
      }

      const farmer = farmerRef.current
      farmer.frame = Math.floor(animationFrame / 8) % 4
      farmer.actionTimer++

      if (farmer.action === "walking") {
        farmer.x += farmer.direction * 1.5
        if (farmer.x > canvas.width - 100 || farmer.x < 50) {
          farmer.direction *= -1
          if (Math.random() > 0.7) {
            farmer.action = "working"
            farmer.actionTimer = 0
          }
        }
      } else if (farmer.action === "working") {
        if (farmer.actionTimer > 60) {
          farmer.action = "walking"
          farmer.actionTimer = 0
        }
      }

      farmer.y = canvas.height - soilHeight - 60
      drawFarmer(ctx, farmer.x, farmer.y, farmer.direction, farmer.action, farmer.frame)

      if (currentLevel === 3) {
        const farmer2 = farmer2Ref.current
        farmer2.frame = Math.floor(animationFrame / 8) % 4
        farmer2.actionTimer++

        if (farmer2.action === "walking") {
          farmer2.x += farmer2.direction * 1.5
          if (farmer2.x > canvas.width - 100 || farmer2.x < canvas.width / 2 + 50) {
            farmer2.direction *= -1
            if (Math.random() > 0.7) {
              farmer2.action = "working"
              farmer2.actionTimer = 0
            }
          }
        } else if (farmer2.action === "working") {
          if (farmer2.actionTimer > 60) {
            farmer2.action = "walking"
            farmer2.actionTimer = 0
          }
        }

        farmer2.y = canvas.height - soilHeight - 60
        drawFarmer(ctx, farmer2.x, farmer2.y, farmer2.direction, farmer2.action, farmer2.frame)
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
      ctx.fillRect(10, 10, 280, currentLevel === 3 ? 100 : 80)
      ctx.strokeStyle = "#00FFFF"
      ctx.lineWidth = 2
      ctx.strokeRect(10, 10, 280, currentLevel === 3 ? 100 : 80)

      ctx.fillStyle = "#00FFFF"
      ctx.font = "bold 16px monospace"
      let viewTitle = ""
      if (currentLevel === 1) viewTitle = t.game.fieldView
      else if (currentLevel === 2) viewTitle = t.game.pastureView
      else viewTitle = t.game.farmView

      ctx.fillText(`${viewTitle} - ${t.game.month} ${currentMonth}/6`, 20, 35)

      if (currentLevel === 3) {
        ctx.fillText(`🌱 ${t.game.health}: ${getFieldStatus(cropHealth)}`, 20, 60)
        ctx.fillText(`🐄 ${t.game.health}: ${getFieldStatus(animalHealth)}`, 20, 80)
      } else {
        const currentHealth = currentLevel === 1 ? cropHealth : animalHealth
        const status = getFieldStatus(currentHealth)
        ctx.fillText(`${currentLevel === 1 ? "🌱" : "🐄"} ${t.game.health}: ${status}`, 20, 60)
      }

      ctx.font = "12px monospace"
      if (currentLevel === 1) {
        ctx.fillText(
          `${cropsRef.current.length} ${language === "en" ? "plants" : "plantas"}`,
          20,
          currentLevel === 3 ? 95 : 80,
        )
      } else if (currentLevel === 2) {
        ctx.fillText(`${animalsRef.current.length} ${language === "en" ? "animals" : "animales"}`, 20, 80)
      } else {
        ctx.fillText(
          `${cropsRef.current.length} ${language === "en" ? "plants" : "plantas"}, ${animalsRef.current.length} ${language === "en" ? "animals" : "animales"}`,
          20,
          95,
        )
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [cropHealth, animalHealth, currentMonth, currentLevel, language, t, lastDecisionCorrect])

  return (
    <div className="border-2 border-cyan-400 rounded-lg overflow-hidden bg-black/60 backdrop-blur h-full min-h-[500px] shadow-lg shadow-cyan-500/30">
      <div className="bg-black/80 border-b-2 border-cyan-400 px-4 py-3">
        <h2 className="text-lg font-bold text-cyan-400 font-mono flex items-center gap-2 neon-text">
          {currentLevel === 1 && `🌾 ${t.game.fieldView}`}
          {currentLevel === 2 && `🐄 ${t.game.pastureView}`}
          {currentLevel === 3 && `🏡 ${t.game.farmView}`}
        </h2>
      </div>
      <canvas ref={canvasRef} className="w-full h-[calc(100%-56px)]" />
    </div>
  )
}

function drawFarmer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  direction: number,
  action: string,
  frame: number,
) {
  ctx.save()
  if (direction < 0) {
    ctx.scale(-1, 1)
    x = -x - 40
  }

  ctx.fillStyle = "#FFD4A3"
  ctx.fillRect(x + 12, y, 16, 16)

  ctx.fillStyle = "#8B4513"
  ctx.fillRect(x + 8, y - 8, 24, 8)
  ctx.fillRect(x + 12, y - 12, 16, 4)

  ctx.fillStyle = "#4169E1"
  ctx.fillRect(x + 8, y + 16, 24, 24)

  ctx.fillStyle = "#FFD4A3"
  if (action === "working") {
    const armAngle = Math.sin(frame * 0.5) * 10
    ctx.fillRect(x + 4, y + 20 + armAngle, 8, 16)
    ctx.fillRect(x + 28, y + 20 - armAngle, 8, 16)
  } else {
    const armSwing = Math.sin(frame * 0.5) * 5
    ctx.fillRect(x + 4, y + 20 + armSwing, 8, 16)
    ctx.fillRect(x + 28, y + 20 - armSwing, 8, 16)
  }

  ctx.fillStyle = "#2F4F4F"
  if (action === "walking") {
    const legSwing = Math.sin(frame * 0.5) * 8
    ctx.fillRect(x + 12, y + 40 + legSwing, 8, 20)
    ctx.fillRect(x + 20, y + 40 - legSwing, 8, 20)
  } else {
    ctx.fillRect(x + 12, y + 40, 8, 20)
    ctx.fillRect(x + 20, y + 40, 8, 20)
  }

  if (action === "working") {
    ctx.strokeStyle = "#8B4513"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(x + 36, y + 24)
    ctx.lineTo(x + 44, y + 40)
    ctx.stroke()

    ctx.fillStyle = "#696969"
    ctx.fillRect(x + 42, y + 40, 8, 4)
  }

  ctx.restore()
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
  ctx.beginPath()
  ctx.arc(x, y, size * 0.5, 0, Math.PI * 2)
  ctx.arc(x + size * 0.4, y, size * 0.4, 0, Math.PI * 2)
  ctx.arc(x + size * 0.8, y, size * 0.5, 0, Math.PI * 2)
  ctx.fill()
}

function drawCropByType(
  ctx: CanvasRenderingContext2D,
  type: CropType,
  x: number,
  y: number,
  health: number,
  growthStage: number,
  animationFrame: number,
) {
  const healthFactor = health / 100
  const size = 10 + growthStage * 6

  switch (type) {
    case "corn":
      drawCorn(ctx, x, y, size, healthFactor, growthStage, animationFrame)
      break
    case "tomato":
      drawTomato(ctx, x, y, size, healthFactor, growthStage, animationFrame)
      break
    case "lettuce":
      drawLettuce(ctx, x, y, size, healthFactor, growthStage, animationFrame)
      break
    case "carrot":
      drawCarrot(ctx, x, y, size, healthFactor, growthStage, animationFrame)
      break
  }
}

function drawCorn(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  healthFactor: number,
  stage: number,
  animationFrame: number,
) {
  if (stage < 1) return

  const height = size * 3 * healthFactor
  const stemColor = healthFactor > 0.7 ? "#228B22" : healthFactor > 0.4 ? "#9ACD32" : "#8B8B00"

  ctx.fillStyle = stemColor
  ctx.fillRect(x - 3, y - height, 6, height)

  if (stage >= 2) {
    ctx.fillStyle = healthFactor > 0.7 ? "#32CD32" : healthFactor > 0.4 ? "#9ACD32" : "#808000"
    for (let i = 0; i < Math.min(stage, 4); i++) {
      const leafY = y - height * 0.3 - i * 8
      const leafSway = Math.sin(animationFrame * 0.05 + i) * 2
      ctx.beginPath()
      ctx.moveTo(x - 3, leafY)
      ctx.lineTo(x - 15 + leafSway, leafY - 5)
      ctx.lineTo(x - 12 + leafSway, leafY + 5)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(x + 3, leafY)
      ctx.lineTo(x + 15 - leafSway, leafY - 5)
      ctx.lineTo(x + 12 - leafSway, leafY + 5)
      ctx.fill()
    }
  }

  if (stage >= 5) {
    ctx.fillStyle = "#FFD700"
    ctx.fillRect(x - 6, y - height - 12, 12, 16)
    ctx.fillStyle = "#FFA500"
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        ctx.fillRect(x - 5 + i * 4, y - height - 10 + j * 4, 2, 2)
      }
    }
  }
}

function drawTomato(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  healthFactor: number,
  stage: number,
  animationFrame: number,
) {
  if (stage < 1) return

  const height = size * 2.5 * healthFactor
  const stemColor = healthFactor > 0.7 ? "#2F4F2F" : healthFactor > 0.4 ? "#556B2F" : "#6B6B2F"

  ctx.fillStyle = stemColor
  ctx.fillRect(x - 2, y - height, 4, height)

  if (stage >= 2) {
    ctx.fillStyle = healthFactor > 0.7 ? "#228B22" : healthFactor > 0.4 ? "#6B8E23" : "#808000"
    for (let i = 0; i < Math.min(stage, 3); i++) {
      const leafY = y - height * 0.4 - i * 10
      const leafSway = Math.sin(animationFrame * 0.05 + i) * 1.5
      for (let j = 0; j < 3; j++) {
        ctx.beginPath()
        ctx.arc(x - 10 + j * 5 + leafSway, leafY, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(x + 10 - j * 5 - leafSway, leafY, 4, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  if (stage >= 4) {
    const tomatoColor = stage >= 5 ? "#FF6347" : "#90EE90"
    const bounce = Math.sin(animationFrame * 0.03) * 0.5
    ctx.fillStyle = tomatoColor
    ctx.beginPath()
    ctx.arc(x - 8, y - height * 0.6 + bounce, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x + 8, y - height * 0.5 - bounce, 6, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
    ctx.beginPath()
    ctx.arc(x - 10, y - height * 0.6 - 2 + bounce, 2, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawLettuce(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  healthFactor: number,
  stage: number,
  animationFrame: number,
) {
  if (stage < 1) return

  const leafSize = size * healthFactor
  const leafColor = healthFactor > 0.7 ? "#90EE90" : healthFactor > 0.4 ? "#9ACD32" : "#808000"

  for (let layer = 0; layer < Math.min(stage, 4); layer++) {
    const currentSize = leafSize - layer * 3
    ctx.fillStyle = leafColor
    ctx.globalAlpha = 0.8

    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 + Math.sin(animationFrame * 0.03 + i) * 0.1
      const leafX = x + Math.cos(angle) * (currentSize * 0.5)
      const leafY = y - 10 - layer * 5 + Math.sin(angle) * (currentSize * 0.5)

      ctx.beginPath()
      ctx.ellipse(leafX, leafY, currentSize * 0.6, currentSize * 0.4, angle, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  ctx.globalAlpha = 1

  if (stage >= 5) {
    ctx.fillStyle = "#7FFF00"
    ctx.beginPath()
    ctx.arc(x, y - 15, leafSize * 0.8, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawCarrot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  healthFactor: number,
  stage: number,
  animationFrame: number,
) {
  if (stage < 1) return

  const topHeight = size * 1.5 * healthFactor
  ctx.fillStyle = healthFactor > 0.7 ? "#228B22" : healthFactor > 0.4 ? "#6B8E23" : "#808000"

  for (let i = 0; i < Math.min(stage, 5); i++) {
    const angle = (i * Math.PI) / 2.5 - Math.PI / 2
    const sway = Math.sin(animationFrame * 0.05 + i) * 2
    ctx.beginPath()
    ctx.moveTo(x, y - 5)
    ctx.lineTo(x + Math.cos(angle) * 12 + sway, y - topHeight)
    ctx.lineTo(x + Math.cos(angle) * 10 + sway, y - 5)
    ctx.fill()
  }

  if (stage >= 4) {
    const rootSize = Math.min(stage * 3, 15) * healthFactor
    ctx.fillStyle = stage >= 5 ? "#FF8C00" : "#FFA500"

    ctx.beginPath()
    ctx.moveTo(x - rootSize * 0.4, y)
    ctx.lineTo(x, y + rootSize)
    ctx.lineTo(x + rootSize * 0.4, y)
    ctx.closePath()
    ctx.fill()

    ctx.strokeStyle = "#D2691E"
    ctx.lineWidth = 1
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.moveTo(x - 2, y + i * 4)
      ctx.lineTo(x + 2, y + i * 4)
      ctx.stroke()
    }
  }
}

function drawCow(ctx: CanvasRenderingContext2D, x: number, y: number, health: number, frame: number, month: number) {
  const size = 40 + month * 5
  const healthFactor = health / 100

  ctx.fillStyle = healthFactor > 0.7 ? "#8B4513" : healthFactor > 0.4 ? "#A0826D" : "#8B7355"
  ctx.fillRect(x, y, size * 1.5, size)

  ctx.fillStyle = "#FFFFFF"
  ctx.beginPath()
  ctx.arc(x + size * 0.3, y + size * 0.3, size * 0.2, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(x + size * 0.9, y + size * 0.5, size * 0.25, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = healthFactor > 0.7 ? "#8B4513" : "#A0826D"
  ctx.fillRect(x + size * 1.5, y + size * 0.2, size * 0.8, size * 0.6)

  ctx.fillStyle = "#654321"
  ctx.fillRect(x + size * 1.5, y, size * 0.2, size * 0.3)
  ctx.fillRect(x + size * 2.1, y, size * 0.2, size * 0.3)

  ctx.strokeStyle = "#F5DEB3"
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(x + size * 1.6, y)
  ctx.lineTo(x + size * 1.5, y - size * 0.3)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x + size * 2.2, y)
  ctx.lineTo(x + size * 2.3, y - size * 0.3)
  ctx.stroke()

  const legOffset = frame % 2 === 0 ? 2 : -2
  ctx.fillStyle = "#654321"
  ctx.fillRect(x + size * 0.2, y + size, size * 0.3, size * 0.6 + legOffset)
  ctx.fillRect(x + size * 0.7, y + size, size * 0.3, size * 0.6 - legOffset)
  ctx.fillRect(x + size * 1.0, y + size, size * 0.3, size * 0.6 + legOffset)
  ctx.fillRect(x + size * 1.3, y + size, size * 0.3, size * 0.6 - legOffset)

  ctx.strokeStyle = "#654321"
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(x, y + size * 0.5)
  ctx.quadraticCurveTo(x - size * 0.3, y + size * 0.3, x - size * 0.2, y + size * 0.8)
  ctx.stroke()

  ctx.fillStyle = "#000000"
  ctx.beginPath()
  ctx.arc(x + size * 1.7, y + size * 0.4, 3, 0, Math.PI * 2)
  ctx.fill()

  if (health < 70) {
    ctx.fillStyle = health < 40 ? "#FF0000" : "#FFA500"
    ctx.font = "bold 20px monospace"
    ctx.fillText("!", x + size, y - 10)
  }
}

function drawChicken(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  health: number,
  frame: number,
  month: number,
) {
  const size = 20 + month * 2
  const healthFactor = health / 100

  ctx.fillStyle = healthFactor > 0.7 ? "#FFFFFF" : healthFactor > 0.4 ? "#F5F5DC" : "#D3D3D3"
  ctx.beginPath()
  ctx.ellipse(x, y, size * 0.8, size, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + size * 0.6, y - size * 0.5, size * 0.5, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = "#FF0000"
  ctx.beginPath()
  ctx.moveTo(x + size * 0.5, y - size * 0.8)
  ctx.lineTo(x + size * 0.6, y - size * 1.1)
  ctx.lineTo(x + size * 0.7, y - size * 0.8)
  ctx.fill()

  ctx.fillStyle = "#FFA500"
  ctx.beginPath()
  ctx.moveTo(x + size * 0.9, y - size * 0.5)
  ctx.lineTo(x + size * 1.2, y - size * 0.4)
  ctx.lineTo(x + size * 0.9, y - size * 0.3)
  ctx.fill()

  ctx.fillStyle = "#000000"
  ctx.beginPath()
  ctx.arc(x + size * 0.7, y - size * 0.6, 2, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = healthFactor > 0.7 ? "#F0E68C" : "#D3D3D3"
  const wingFlap = frame % 2 === 0 ? 0 : -5
  ctx.beginPath()
  ctx.ellipse(x - size * 0.3, y + wingFlap, size * 0.4, size * 0.6, -0.3, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = "#FFA500"
  ctx.lineWidth = 3
  const legOffset = frame % 2 === 0 ? 2 : -2
  ctx.beginPath()
  ctx.moveTo(x - size * 0.2, y + size)
  ctx.lineTo(x - size * 0.2, y + size + 10 + legOffset)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x + size * 0.2, y + size)
  ctx.lineTo(x + size * 0.2, y + size + 10 - legOffset)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(x - size * 0.2, y + size + 10 + legOffset)
  ctx.lineTo(x - size * 0.4, y + size + 10 + legOffset)
  ctx.moveTo(x - size * 0.2, y + size + 10 + legOffset)
  ctx.lineTo(x, y + size + 10 + legOffset)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x + size * 0.2, y + size + 10 - legOffset)
  ctx.lineTo(x, y + size + 10 - legOffset)
  ctx.moveTo(x + size * 0.2, y + size + 10 - legOffset)
  ctx.lineTo(x + size * 0.4, y + size + 10 - legOffset)
  ctx.stroke()

  if (health > 70 && month >= 4) {
    ctx.fillStyle = "#F5DEB3"
    ctx.beginPath()
    ctx.ellipse(x - size * 1.2, y + size + 5, 6, 8, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  if (health < 70) {
    ctx.fillStyle = health < 40 ? "#FF0000" : "#FFA500"
    ctx.font = "bold 16px monospace"
    ctx.fillText("!", x + size * 0.5, y - size * 1.2)
  }
}
