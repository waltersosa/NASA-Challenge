"use client"

import { Button } from "@/components/ui/button"
import { Satellite, Sprout, TrendingUp, Globe, Award, ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <header className="border-b border-slate-800">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Satellite className="w-6 h-6 text-blue-400" />
              <Sprout className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-xl font-bold text-white">NASA Farm Navigators</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Launch App
              </Button>
            </Link>
            <Button className="bg-white text-slate-900 hover:bg-slate-100">Get Started</Button>
          </div>
        </nav>
      </header>

      {/* Hero Content */}
      <section className="container mx-auto px-6 py-24 lg:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-4">
            <Satellite className="w-4 h-4" />
            <span>Powered by Real NASA Satellite Data</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
            The complete platform to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              farm the future.
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Your team's toolkit to learn sustainable agriculture. Build knowledge, make data-driven decisions, and
            master precision farming with real NASA satellite technology.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-6">
                Start Learning
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-white hover:bg-slate-800 text-lg px-8 py-6 bg-transparent"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-white">3</div>
              <div className="text-slate-400">Learning Levels</div>
              <div className="text-sm text-slate-500">Progressive difficulty</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-white">100%</div>
              <div className="text-slate-400">Real NASA Data</div>
              <div className="text-sm text-slate-500">Authentic satellite imagery</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-white">6</div>
              <div className="text-slate-400">Months Simulated</div>
              <div className="text-sm text-slate-500">Per farming season</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-white">∞</div>
              <div className="text-slate-400">Learning Potential</div>
              <div className="text-sm text-slate-500">Master sustainable farming</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-green-400 text-sm font-semibold">
              <Globe className="w-4 h-4" />
              SATELLITE INTELLIGENCE
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Faster decisions. Better harvests.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              The platform for precision agriculture. Learn to use real NASA satellite data including NDVI (vegetation
              health), LST (land surface temperature), and soil moisture to make informed farming decisions with
              confidence.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">Real-time Monitoring</div>
                  <div className="text-slate-400 text-sm">Track crop and livestock health with NASA satellite data</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">Data-Driven Decisions</div>
                  <div className="text-slate-400 text-sm">Make choices based on scientific evidence and analysis</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">Sustainable Practices</div>
                  <div className="text-slate-400 text-sm">Learn eco-friendly farming methods for the future</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-slate-800 p-8 backdrop-blur">
              <div className="w-full h-full rounded-xl bg-slate-900/50 border border-slate-700 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Satellite className="w-24 h-24 text-blue-400 mx-auto" />
                  <div className="text-white font-semibold text-xl">NASA Satellite View</div>
                  <div className="text-slate-400 text-sm">Real-time farm monitoring</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-500/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* Learning Levels */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">Make learning seamless.</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Progressive levels designed to build your expertise from crops to livestock to integrated farming systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-slate-800 rounded-2xl p-8 bg-slate-900/50 hover:border-green-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-6">
              <Sprout className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Level 1: Crops</h3>
            <p className="text-slate-400 mb-6">
              Master crop management using NDVI data to monitor vegetation health and optimize irrigation decisions.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span>Vegetation monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span>Irrigation management</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span>Soil health analysis</span>
              </div>
            </div>
          </div>

          <div className="border border-slate-800 rounded-2xl p-8 bg-slate-900/50 hover:border-blue-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Level 2: Livestock</h3>
            <p className="text-slate-400 mb-6">
              Learn animal welfare management using temperature data to prevent heat stress and optimize grazing.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Heat stress prevention</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Grazing optimization</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Animal health tracking</span>
              </div>
            </div>
          </div>

          <div className="border border-slate-800 rounded-2xl p-8 bg-slate-900/50 hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-6">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Level 3: Integrated</h3>
            <p className="text-slate-400 mb-6">
              Master the complete farm ecosystem by balancing crops, livestock, and sustainability for maximum
              efficiency.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Holistic farm management</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Resource optimization</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Sustainability certification</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="rounded-3xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-slate-800 p-12 lg:p-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to navigate the future of farming?</h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of learners mastering sustainable agriculture with NASA technology.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-12 py-6">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Satellite className="w-5 h-5 text-blue-400" />
                <Sprout className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-lg font-bold text-white">NASA Farm Navigators</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/" className="hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/" className="hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            © 2025 NASA Farm Navigators. Educational simulator using real NASA satellite data.
          </div>
        </div>
      </footer>
    </div>
  )
}
