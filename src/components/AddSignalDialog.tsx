import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { SignalCategory } from '@/lib/types'
import { signalPresets, getPresetsByCategory } from '@/lib/signal-presets'
import { Plus, Lightning } from '@phosphor-icons/react'

interface AddSignalDialogProps {
  onAddSignal: (category: SignalCategory, description: string, weight: number, decayRate?: number) => void
}

export function AddSignalDialog({ onAddSignal }: AddSignalDialogProps) {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState<SignalCategory>('geopolitical')
  const [description, setDescription] = useState('')
  const [weight, setWeight] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description.trim() && weight !== 0) {
      onAddSignal(category, description.trim(), weight, 0.05)
      setDescription('')
      setWeight(0)
      setOpen(false)
    }
  }

  const handlePresetClick = (presetId: string) => {
    const preset = signalPresets.find(p => p.id === presetId)
    if (preset) {
      onAddSignal(preset.category, preset.description, preset.weight, preset.decayRate)
      setOpen(false)
    }
  }

  const categoryPresets = {
    geopolitical: getPresetsByCategory('geopolitical'),
    cyber: getPresetsByCategory('cyber'),
    media: getPresetsByCategory('media'),
    strategic: getPresetsByCategory('strategic'),
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 font-mono uppercase tracking-wide" aria-label="Add new signal">
          <Plus weight="bold" />
          Add Signal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="font-mono uppercase tracking-wide">Add New Signal</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="presets" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presets" className="font-mono text-xs uppercase tracking-wide gap-2">
              <Lightning weight="fill" />
              Quick Presets
            </TabsTrigger>
            <TabsTrigger value="custom" className="font-mono text-xs uppercase tracking-wide gap-2">
              <Plus weight="bold" />
              Custom Signal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="presets" className="space-y-4">
            <Tabs defaultValue="geopolitical" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="geopolitical" className="font-mono text-xs">
                  Geo
                </TabsTrigger>
                <TabsTrigger value="cyber" className="font-mono text-xs">
                  Cyber
                </TabsTrigger>
                <TabsTrigger value="media" className="font-mono text-xs">
                  Media
                </TabsTrigger>
                <TabsTrigger value="strategic" className="font-mono text-xs">
                  Strategic
                </TabsTrigger>
              </TabsList>

              {Object.entries(categoryPresets).map(([cat, presets]) => (
                <TabsContent key={cat} value={cat} className="mt-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                      {presets.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => handlePresetClick(preset.id)}
                          className="w-full text-left p-4 border border-border rounded-lg hover:bg-accent/50 hover:border-accent transition-colors group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 space-y-1">
                              <div className="font-mono text-sm font-semibold text-foreground group-hover:text-accent-foreground">
                                {preset.name}
                              </div>
                              <div className="font-mono text-xs text-muted-foreground">
                                {preset.description}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <Badge 
                                variant={preset.weight > 0 ? "destructive" : "secondary"}
                                className="font-display text-sm tabular-nums"
                              >
                                {preset.weight > 0 ? '+' : ''}{preset.weight}
                              </Badge>
                              <span className="text-xs text-muted-foreground font-mono">
                                decay {(preset.decayRate * 100).toFixed(0)}%/hr
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="custom">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="font-mono text-xs uppercase tracking-wide">
                  Category
                </Label>
                <Select value={category} onValueChange={(val) => setCategory(val as SignalCategory)}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geopolitical">Geopolitical</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="cyber">Cyber</SelectItem>
                    <SelectItem value="strategic">Strategic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-mono text-xs uppercase tracking-wide">
                  Description
                </Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter signal description..."
                  className="font-mono text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className="font-mono text-xs uppercase tracking-wide">
                  Impact Weight (required, non-zero)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="weight"
                    type="number"
                    value={weight === 0 ? '' : weight}
                    onChange={(e) => setWeight(e.target.value === '' ? 0 : Number(e.target.value))}
                    placeholder="Enter impact weight..."
                    className="font-display text-lg tabular-nums"
                    step="1"
                    required
                  />
                  <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    +ve = escalation, -ve = de-escalation
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="font-mono">
                  Cancel
                </Button>
                <Button type="submit" className="font-mono uppercase tracking-wide">
                  Add Signal
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
