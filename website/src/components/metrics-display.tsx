'use client'

import { Card } from './ui/card'
import { useQuery } from '@tanstack/react-query'
import { TrendingUp, Clock, DollarSign, Users } from 'lucide-react'

interface Metric {
  label: string
  value: string | number
  change: string
  icon: React.ElementType
}

export function MetricsDisplay() {
  const { data: metrics } = useQuery({
    queryKey: ['metrics'],
    queryFn: async () => {
      // In production, this would fetch from your API
      return {
        workflows: 127,
        timeSaved: '3,847',
        revenue: '$47,293',
        activeUsers: 892,
      }
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  })

  const displayMetrics: Metric[] = [
    {
      label: 'Active Workflows',
      value: metrics?.workflows || 0,
      change: '+12%',
      icon: TrendingUp,
    },
    {
      label: 'Hours Saved/Week',
      value: metrics?.timeSaved || '0',
      change: '+28%',
      icon: Clock,
    },
    {
      label: 'Revenue Generated',
      value: metrics?.revenue || '$0',
      change: '+43%',
      icon: DollarSign,
    },
    {
      label: 'Active Users',
      value: metrics?.activeUsers || 0,
      change: '+19%',
      icon: Users,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayMetrics.map((metric) => (
        <MetricCard key={metric.label} metric={metric} />
      ))}
    </div>
  )
}

function MetricCard({ metric }: { metric: Metric }) {
  const Icon = metric.icon
  
  return (
    <Card className="p-6 glass border-empire-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{metric.label}</p>
          <p className="text-2xl font-bold mt-1">{metric.value}</p>
          <p className="text-sm text-green-400 mt-1">{metric.change}</p>
        </div>
        <Icon className="h-8 w-8 text-empire-400" />
      </div>
    </Card>
  )
}