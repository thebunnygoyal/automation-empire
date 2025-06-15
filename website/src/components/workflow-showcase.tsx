'use client'

import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Activity, PlayCircle, Pause } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

interface Workflow {
  id: string
  name: string
  status: 'active' | 'paused' | 'error'
  executions: number
  lastRun: string
  category: string
}

export function WorkflowShowcase() {
  const { data: workflows } = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      // This would fetch from n8n API in production
      return [
        {
          id: '1',
          name: 'NFT Gaming Floor Monitor',
          status: 'active',
          executions: 1847,
          lastRun: '2 minutes ago',
          category: 'Web3',
        },
        {
          id: '2',
          name: 'Whale Gaming Tracker',
          status: 'active',
          executions: 923,
          lastRun: '5 minutes ago',
          category: 'Analytics',
        },
        {
          id: '3',
          name: 'Discord Gaming Community Empire',
          status: 'active',
          executions: 3472,
          lastRun: '1 minute ago',
          category: 'Community',
        },
        {
          id: '4',
          name: 'DeFi Gaming Yield Hunter',
          status: 'paused',
          executions: 612,
          lastRun: '1 hour ago',
          category: 'DeFi',
        },
      ] as Workflow[]
    },
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {workflows?.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  )
}

function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <Card className="p-6 glass border-empire-700 hover:border-empire-500 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{workflow.name}</h3>
          <Badge variant="outline" className="mt-1">
            {workflow.category}
          </Badge>
        </div>
        <StatusIndicator status={workflow.status} />
      </div>
      
      <div className="space-y-2 text-sm text-gray-400">
        <div className="flex items-center justify-between">
          <span>Executions</span>
          <span className="font-mono">{workflow.executions.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Last Run</span>
          <span>{workflow.lastRun}</span>
        </div>
      </div>
      
      <div className="mt-4 flex gap-2">
        <Button size="sm" variant="outline" className="flex-1">
          <Activity className="h-4 w-4 mr-1" />
          View Details
        </Button>
        {workflow.status === 'active' ? (
          <Button size="sm" variant="ghost">
            <Pause className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="sm" variant="ghost">
            <PlayCircle className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  )
}

function StatusIndicator({ status }: { status: Workflow['status'] }) {
  const colors = {
    active: 'bg-green-500',
    paused: 'bg-yellow-500',
    error: 'bg-red-500',
  }
  
  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${colors[status]} animate-pulse`} />
      <span className="text-xs text-gray-400 capitalize">{status}</span>
    </div>
  )
}