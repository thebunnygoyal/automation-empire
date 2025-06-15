'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Zap, TrendingUp, Shield, Globe } from 'lucide-react'
import Link from 'next/link'
import { MetricsDisplay } from '@/components/metrics-display'
import { WorkflowShowcase } from '@/components/workflow-showcase'

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-empire-500/20 to-empire-600/20 blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              <span className="gradient-text">Automation Empire</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
              Transform wishful thinking into unstoppable automated empires that dominate markets 24/7/365.
              Build systems that scale while you sleep.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/dashboard">
                <Button size="lg" className="group">
                  Enter the Empire
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/workflows">
                <Button size="lg" variant="outline">
                  Browse Workflows
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Live Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20"
          >
            <MetricsDisplay />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Build Your Empire With
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Lightning Fast"
              description="Deploy workflows in minutes, not months. Speed is your advantage."
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Infinite Scale"
              description="Built for 10x growth from day one. Your empire has no limits."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Battle Tested"
              description="Enterprise-grade security and reliability. Sleep soundly."
            />
            <FeatureCard
              icon={<Globe className="h-8 w-8" />}
              title="Global Reach"
              description="Deploy anywhere, serve everyone. The world is your market."
            />
          </div>
        </div>
      </section>

      {/* Workflow Showcase */}
      <section className="px-6 py-24 lg:px-8 border-t border-empire-800">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Active Workflows
          </h2>
          <WorkflowShowcase />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 lg:px-8 border-t border-empire-800">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your Empire?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join the ranks of automation emperors who dominate their markets.
          </p>
          <Link href="/get-started">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="p-6 h-full glass border-empire-700 hover:border-empire-500 transition-colors">
        <div className="text-empire-400 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </Card>
    </motion.div>
  )
}