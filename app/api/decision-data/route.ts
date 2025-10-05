import { type NextRequest, NextResponse } from "next/server"

// LEVEL 1: Crop Farming - Focus on NDVI and Soil Moisture
const level1Decisions = [
  {
    month: 1,
    question: "Early planting season: Your seeds are germinating. What's your irrigation strategy?",
    context:
      "Month 1: Seeds just planted. NDVI is 0.15 (expected for bare soil with new seeds). Soil moisture is 0.70 (good). Recent rainfall has provided adequate water.",
    options: [
      {
        text: "Start daily heavy irrigation to accelerate germination",
        isCorrect: false,
        feedback:
          "Incorrect. Soil moisture is already excellent at 0.70. Over-watering seeds can cause rot and fungal diseases. Seeds need moisture, not flooding.",
      },
      {
        text: "Monitor soil moisture and water only if it drops below 0.50",
        isCorrect: true,
        feedback:
          "Correct! With good soil moisture (0.70), seeds have what they need. Smart farmers conserve water and only irrigate when necessary. This is sustainable farming.",
      },
      {
        text: "Apply fertilizer immediately to boost early growth",
        isCorrect: false,
        feedback:
          "Incorrect. Seeds don't need fertilizer yet - they have stored nutrients. The low NDVI (0.15) is normal for newly planted fields. Fertilizer would be wasted.",
      },
    ],
  },
  {
    month: 2,
    question: "Seedlings are emerging! NDVI shows vegetation growth. How do you support this critical phase?",
    context:
      "Month 2: Seedlings visible. NDVI has jumped to 0.35 (healthy emergence). Soil moisture has decreased to 0.52 due to plant uptake and evaporation.",
    options: [
      {
        text: "Apply nitrogen fertilizer to maximize early growth",
        isCorrect: false,
        feedback:
          "Incorrect. Young seedlings are still using seed nutrients. NDVI of 0.35 shows healthy growth. Early fertilization can burn tender roots and waste resources.",
      },
      {
        text: "Provide light irrigation to maintain soil moisture above 0.45",
        isCorrect: true,
        feedback:
          "Correct! Soil moisture at 0.52 is adequate but declining. Light irrigation prevents stress while avoiding waste. Seedlings need consistent moisture for root development.",
      },
      {
        text: "No action needed - let nature take its course",
        isCorrect: false,
        feedback:
          "Incorrect. While moisture is currently adequate, the declining trend (0.70 → 0.52) means intervention will soon be needed. Proactive farming prevents crop stress.",
      },
    ],
  },
  {
    month: 3,
    question: "Rapid growth phase! Your crops are developing fast. What's your management priority?",
    context:
      "Month 3: Vegetative growth peak. NDVI is 0.58 (excellent growth). However, soil moisture has dropped to 0.38 - below optimal for this growth stage.",
    options: [
      {
        text: "Increase irrigation immediately - crops are water-stressed",
        isCorrect: true,
        feedback:
          "Correct! During peak growth (NDVI 0.58), crops need maximum water. Moisture at 0.38 is too low and will limit growth. Immediate irrigation prevents yield loss.",
      },
      {
        text: "Apply heavy fertilization to boost the excellent NDVI further",
        isCorrect: false,
        feedback:
          "Incorrect. NDVI is already excellent (0.58). The problem is water (0.38), not nutrients. Adding fertilizer without water will stress plants and waste resources.",
      },
      {
        text: "Reduce irrigation to save water for later months",
        isCorrect: false,
        feedback:
          "Incorrect. This is the worst time to reduce water. Peak growth requires maximum resources. Water stress now will permanently reduce your final yield.",
      },
    ],
  },
  {
    month: 4,
    question: "Flowering and fruit set beginning! This is the most critical month. What's your approach?",
    context:
      "Month 4: Reproductive stage starting. NDVI peaked at 0.72 (maximum vegetation). Soil moisture improved to 0.55 after your irrigation. Crops are forming flowers/fruits.",
    options: [
      {
        text: "Maintain consistent irrigation and add potassium fertilizer for fruit development",
        isCorrect: true,
        feedback:
          "Correct! Flowering/fruiting is the most critical phase. Consistent water (0.55 is good) plus potassium helps fruit formation. This maximizes yield and quality.",
      },
      {
        text: "Stop fertilization - NDVI is already at maximum",
        isCorrect: false,
        feedback:
          "Incorrect. While vegetative growth (NDVI) is maxed, crops now need different nutrients for fruit development. Potassium and phosphorus are crucial for yield.",
      },
      {
        text: "Reduce water to stress plants into producing more fruits",
        isCorrect: false,
        feedback:
          "Incorrect. This is a myth. Water stress during flowering causes flower drop and reduces fruit set. Consistent moisture is essential for maximum yield.",
      },
    ],
  },
  {
    month: 5,
    question: "Crops are maturing and filling out. NDVI is naturally declining. How do you finish strong?",
    context:
      "Month 5: Maturation phase. NDVI decreased to 0.65 (normal as plants mature). Soil moisture is 0.48. Fruits/grains are filling and gaining weight.",
    options: [
      {
        text: "Panic and apply emergency fertilizer to restore NDVI",
        isCorrect: false,
        feedback:
          "Incorrect. NDVI decline from 0.72 to 0.65 is completely normal during maturation. Plants naturally yellow as they redirect energy to fruits. Fertilizer would be wasted.",
      },
      {
        text: "Continue moderate irrigation to support fruit filling",
        isCorrect: true,
        feedback:
          "Correct! Maturing crops still need water for fruit/grain filling. Moisture at 0.48 is adequate but should be maintained. The NDVI decline is natural and expected.",
      },
      {
        text: "Stop all irrigation to force early harvest",
        isCorrect: false,
        feedback:
          "Incorrect. Premature water cutoff reduces final yield and quality. Fruits/grains need water to reach full size and weight. Patience increases profit.",
      },
    ],
  },
  {
    month: 6,
    question: "Final month before harvest! How do you prepare for maximum yield and quality?",
    context:
      "Month 6: Pre-harvest. NDVI is 0.58 (mature crops). Soil moisture is 0.42. Crops are nearly ready. Weather forecast shows dry conditions ahead.",
    options: [
      {
        text: "Apply final heavy irrigation to maximize crop weight",
        isCorrect: false,
        feedback:
          "Incorrect. Excess water before harvest can reduce quality, cause splitting, and delay harvest. Moisture at 0.42 is adequate for mature crops.",
      },
      {
        text: "Gradually reduce irrigation and prepare harvest equipment",
        isCorrect: true,
        feedback:
          "Correct! Mature crops need less water. Gradual drying improves harvest conditions and crop quality. Smart farmers prepare equipment and plan harvest timing.",
      },
      {
        text: "Apply final fertilization for next season's soil",
        isCorrect: false,
        feedback:
          "Incorrect. Post-harvest is the time for soil amendments, not now. Current crops can't use nutrients, and fertilizer will leach away before next planting.",
      },
    ],
  },
]

// LEVEL 2: Livestock Farming - Focus on LST, Animal Health, and Pasture Management
const level2Decisions = [
  {
    month: 1,
    question: "New livestock arrived! How do you establish healthy pasture management from day one?",
    context:
      "Month 1: Fresh livestock on pasture. LST is 22°C (comfortable). Pasture NDVI is 0.45 (moderate grass). Animals are adjusting to new environment.",
    options: [
      {
        text: "Allow unlimited grazing to help animals settle in",
        isCorrect: false,
        feedback:
          "Incorrect. Overgrazing from day one damages pasture recovery. NDVI of 0.45 shows moderate grass that needs management. Rotational grazing protects long-term pasture health.",
      },
      {
        text: "Implement rotational grazing and monitor pasture NDVI",
        isCorrect: true,
        feedback:
          "Correct! Rotational grazing prevents overgrazing and maintains pasture health. Monitoring NDVI helps you move animals before grass is damaged. This is sustainable livestock management.",
      },
      {
        text: "Keep animals in barns until pasture NDVI reaches 0.70",
        isCorrect: false,
        feedback:
          "Incorrect. NDVI of 0.45 is adequate for grazing. Animals need outdoor access for health. Waiting for perfect conditions wastes good pasture and stresses confined animals.",
      },
    ],
  },
  {
    month: 2,
    question: "Temperature rising! LST shows increasing heat. How do you protect animal welfare?",
    context:
      "Month 2: Early heat wave. LST has jumped to 28°C (warm). Pasture NDVI is 0.38 (declining from grazing). Animals showing early heat stress signs.",
    options: [
      {
        text: "Provide shade structures and increase water availability",
        isCorrect: true,
        feedback:
          "Correct! LST of 28°C causes heat stress. Shade and water are critical for animal welfare. This prevents health issues and maintains productivity.",
      },
      {
        text: "Increase feed to boost animal energy",
        isCorrect: false,
        feedback:
          "Incorrect. More feed generates more body heat through digestion. In hot weather, animals need cooling measures, not extra feed. This would worsen heat stress.",
      },
      {
        text: "Continue normal operations - animals will adapt",
        isCorrect: false,
        feedback:
          "Incorrect. Heat stress at 28°C is serious. Without intervention, animals suffer reduced productivity, health problems, and even death. Proactive management is essential.",
      },
    ],
  },
  {
    month: 3,
    question: "Pasture degradation alert! NDVI dropping while animals need nutrition. What's your strategy?",
    context:
      "Month 3: Pasture stress. LST is 26°C (moderate). Pasture NDVI has dropped to 0.28 (overgrazed). Animals need food but pasture needs recovery.",
    options: [
      {
        text: "Move animals to fresh pasture and rest the degraded area",
        isCorrect: true,
        feedback:
          "Correct! NDVI of 0.28 shows severe overgrazing. Resting pasture allows grass recovery. Moving animals prevents further damage and maintains animal nutrition.",
      },
      {
        text: "Keep animals on current pasture - grass will regrow",
        isCorrect: false,
        feedback:
          "Incorrect. Continuous grazing on degraded pasture (NDVI 0.28) prevents recovery and causes permanent damage. Grass needs rest to regrow roots and leaves.",
      },
      {
        text: "Apply fertilizer to boost pasture growth immediately",
        isCorrect: false,
        feedback:
          "Incorrect. Fertilizer can't help grass that's grazed to the ground. The pasture needs rest first, then fertilizer. Applying it now wastes resources and pollutes.",
      },
    ],
  },
  {
    month: 4,
    question: "Peak summer heat! LST at dangerous levels. How do you prevent livestock losses?",
    context:
      "Month 4: Extreme heat. LST has reached 32°C (dangerous). Pasture NDVI recovering to 0.35 on rested areas. Animals showing severe heat stress.",
    options: [
      {
        text: "Implement emergency cooling: sprinklers, fans, and adjust feeding times",
        isCorrect: true,
        feedback:
          "Correct! LST of 32°C is life-threatening. Emergency cooling prevents deaths. Feeding at cooler times reduces heat from digestion. This is crisis management.",
      },
      {
        text: "Move animals to the recovering pasture for fresh grass",
        isCorrect: false,
        feedback:
          "Incorrect. While pasture is recovering (NDVI 0.35), the immediate threat is heat (32°C), not nutrition. Moving stressed animals in extreme heat can cause deaths.",
      },
      {
        text: "Reduce water to prevent animals from overdrinking",
        isCorrect: false,
        feedback:
          "Incorrect. This is dangerous misinformation. Animals need maximum water in extreme heat. Restricting water causes dehydration, organ failure, and death.",
      },
    ],
  },
  {
    month: 5,
    question: "Temperature moderating, pasture recovering. How do you optimize animal productivity?",
    context:
      "Month 5: Conditions improving. LST dropped to 24°C (comfortable). Pasture NDVI is 0.52 (good recovery). Animals recovering from heat stress.",
    options: [
      {
        text: "Gradually increase grazing time and supplement with quality feed",
        isCorrect: true,
        feedback:
          "Correct! Moderate temperature (24°C) and recovered pasture (NDVI 0.52) allow increased grazing. Supplements help animals regain condition after heat stress.",
      },
      {
        text: "Immediately return to maximum grazing to make up lost time",
        isCorrect: false,
        feedback:
          "Incorrect. Aggressive grazing damages recovering pasture (NDVI 0.52). Animals also need gradual recovery from heat stress. Patience protects long-term productivity.",
      },
      {
        text: "Keep animals on supplements only to fully rest pasture",
        isCorrect: false,
        feedback:
          "Incorrect. Pasture NDVI of 0.52 is good for grazing. Keeping animals off wastes good grass and increases feed costs unnecessarily. Balance is key.",
      },
    ],
  },
  {
    month: 6,
    question: "Final month: Preparing for seasonal transition. How do you finish the season strong?",
    context:
      "Month 6: Season end. LST is 20°C (ideal). Pasture NDVI is 0.58 (excellent). Animals in good condition. Planning for next season needed.",
    options: [
      {
        text: "Maintain current management and plan pasture renovation for next season",
        isCorrect: true,
        feedback:
          "Correct! Excellent conditions (LST 20°C, NDVI 0.58) mean current management works. Planning ahead for pasture improvement ensures long-term success.",
      },
      {
        text: "Maximize grazing to use all available grass before season ends",
        isCorrect: false,
        feedback:
          "Incorrect. Overgrazing at season end damages pasture for next year. Leaving residual grass (NDVI 0.58) protects soil and provides quick regrowth next season.",
      },
      {
        text: "Sell all animals immediately to avoid winter costs",
        isCorrect: false,
        feedback:
          "Incorrect. With excellent conditions and healthy animals, this is poor business. Strategic planning for winter is better than panic selling at potentially low prices.",
      },
    ],
  },
]

// LEVEL 3: Integrated Farm - Combines crops AND animals with complex interactions
const level3Decisions = [
  {
    month: 1,
    question: "Starting your integrated farm! How do you balance crop planting and livestock management?",
    context:
      "Month 1: New integrated operation. Crop field NDVI: 0.18 (newly planted). Pasture NDVI: 0.42. Soil moisture: 0.68. LST: 21°C. You have both crops and animals to manage.",
    options: [
      {
        text: "Focus all resources on crops first, then deal with animals later",
        isCorrect: false,
        feedback:
          "Incorrect. Integrated farming requires simultaneous management. Neglecting animals causes welfare issues and lost productivity. Balance is essential.",
      },
      {
        text: "Implement rotational grazing while monitoring crop soil moisture",
        isCorrect: true,
        feedback:
          "Correct! Integrated farms need parallel management. Rotational grazing protects pasture while crop monitoring ensures good establishment. This is systems thinking.",
      },
      {
        text: "Use animal manure immediately on newly planted crops",
        isCorrect: false,
        feedback:
          "Incorrect. Fresh manure on new crops can burn plants and introduce pathogens. Manure should be composted first. Timing and processing matter in integrated systems.",
      },
    ],
  },
  {
    month: 2,
    question: "Resource allocation challenge! Both crops and pasture need attention. What's your priority?",
    context:
      "Month 2: Competing demands. Crop NDVI: 0.38 (growing well). Pasture NDVI: 0.35 (declining). Soil moisture: 0.50 (adequate). LST: 25°C (warming). Limited water available.",
    options: [
      {
        text: "Prioritize crop irrigation - they're more valuable",
        isCorrect: false,
        feedback:
          "Incorrect. Pasture NDVI (0.35) shows stress while crops (0.38) are adequate. Neglecting pasture forces expensive supplemental feeding. Integrated farms optimize total system value.",
      },
      {
        text: "Split resources: light crop irrigation and rotate animals to rest pasture",
        isCorrect: true,
        feedback:
          "Correct! Crops need some water (0.50 moisture is borderline) but pasture needs rest more than water. Rotation is free and effective. This is efficient resource management.",
      },
      {
        text: "Focus on animals only - crops can wait",
        isCorrect: false,
        feedback:
          "Incorrect. Crop soil moisture at 0.50 is declining. Ignoring crops during growth phase causes permanent yield loss. Integrated management means balancing both.",
      },
    ],
  },
  {
    month: 3,
    question: "Synergy opportunity! How can you use integration advantages to improve both systems?",
    context:
      "Month 3: Integration potential. Crop NDVI: 0.55 (excellent). Pasture NDVI: 0.30 (needs recovery). Soil moisture: 0.42. LST: 27°C. Composted manure available.",
    options: [
      {
        text: "Apply composted manure to recovering pasture and increase crop irrigation",
        isCorrect: true,
        feedback:
          "Correct! Manure boosts pasture recovery (NDVI 0.30 needs help). Crop irrigation maintains excellent growth (0.55). This is true integrated farming - using synergies.",
      },
      {
        text: "Sell the manure for profit and buy commercial fertilizer",
        isCorrect: false,
        feedback:
          "Incorrect. Selling manure loses the main integration benefit - free, organic fertilizer. Buying commercial fertilizer increases costs and environmental impact.",
      },
      {
        text: "Graze animals on crop field edges to reduce mowing",
        isCorrect: false,
        feedback:
          "Incorrect. Animals near crops risk contamination and damage. With pasture NDVI at 0.30, animals need managed grazing, not crop field access.",
      },
    ],
  },
  {
    month: 4,
    question: "Heat crisis affecting both crops and animals! How do you manage this complex emergency?",
    context:
      "Month 4: Extreme heat. Crop NDVI: 0.68 (peak but stressed). Pasture NDVI: 0.40 (recovering). Soil moisture: 0.35 (low). LST: 33°C (dangerous). Water limited.",
    options: [
      {
        text: "Emergency protocol: prioritize animal cooling, then critical crop irrigation",
        isCorrect: true,
        feedback:
          "Correct! At 33°C, animal deaths are imminent - they're the priority. Then irrigate crops at critical growth stage. This is crisis triage in integrated systems.",
      },
      {
        text: "Irrigate crops only - they represent the biggest investment",
        isCorrect: false,
        feedback:
          "Incorrect. Animal welfare and lives come first in extreme heat (33°C). Dead animals are total loss. Crops can partially recover from stress. Ethics and economics align here.",
      },
      {
        text: "Do nothing - both systems will naturally adapt to heat",
        isCorrect: false,
        feedback:
          "Incorrect. LST of 33°C is life-threatening. Without intervention, you'll lose animals and crops. Integrated farms need active management, especially in crises.",
      },
    ],
  },
  {
    month: 5,
    question: "Recovery phase: How do you rebuild both systems after the heat crisis?",
    context:
      "Month 5: Post-crisis. Crop NDVI: 0.62 (recovering). Pasture NDVI: 0.48 (improving). Soil moisture: 0.52 (better). LST: 24°C (comfortable). Systems stressed but viable.",
    options: [
      {
        text: "Gradual recovery: balanced irrigation, rotational grazing, and system monitoring",
        isCorrect: true,
        feedback:
          "Correct! Both systems need gentle recovery. Balanced approach prevents further stress while rebuilding productivity. Monitoring ensures you catch problems early.",
      },
      {
        text: "Aggressive recovery: maximum inputs to both systems immediately",
        isCorrect: false,
        feedback:
          "Incorrect. Stressed systems can't handle maximum inputs. Overwatering stressed crops causes disease. Overgrazing recovering pasture (NDVI 0.48) causes damage.",
      },
      {
        text: "Focus recovery on whichever system is more profitable",
        isCorrect: false,
        feedback:
          "Incorrect. Integrated farms depend on both systems working together. Neglecting one breaks the integration benefits and reduces total farm profitability.",
      },
    ],
  },
  {
    month: 6,
    question: "Final month: Harvest planning while maintaining animal productivity. How do you optimize both?",
    context:
      "Month 6: Season end. Crop NDVI: 0.58 (mature, ready). Pasture NDVI: 0.55 (good). Soil moisture: 0.45. LST: 22°C (ideal). Planning harvest and next season.",
    options: [
      {
        text: "Plan crop harvest timing, maintain animal management, and design next season's integration",
        isCorrect: true,
        feedback:
          "Correct! Mature crops (NDVI 0.58) need harvest planning. Animals on good pasture (0.55) need continued management. Planning integration for next season maximizes benefits.",
      },
      {
        text: "Harvest crops immediately and sell all animals to simplify operations",
        isCorrect: false,
        feedback:
          "Incorrect. Rushing harvest reduces quality. Selling healthy animals on good pasture wastes the integration you've built. Integrated farming is a long-term strategy.",
      },
      {
        text: "Delay harvest to graze animals on crop residues first",
        isCorrect: false,
        feedback:
          "Incorrect. Crops at optimal maturity (NDVI 0.58) should be harvested promptly for quality. Post-harvest residue grazing is good, but harvest timing comes first.",
      },
    ],
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const month = Number.parseInt(searchParams.get("month") || "1")
  const level = Number.parseInt(searchParams.get("level") || "1")

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  let decisionData
  if (level === 1) {
    decisionData = level1Decisions[month - 1] || level1Decisions[0]
  } else if (level === 2) {
    decisionData = level2Decisions[month - 1] || level2Decisions[0]
  } else {
    decisionData = level3Decisions[month - 1] || level3Decisions[0]
  }

  return NextResponse.json(decisionData)
}
