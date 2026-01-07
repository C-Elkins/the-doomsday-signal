import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SignalCategory } from '@/lib/types'
import { Plus } from '@phosphor-icons/react'

interface AddSignalDialogProps {
  onAddSignal: (category: SignalCategory, description: string, weight: number) => void
}

export function AddSignalDialog({ onAddSignal }: AddSignalDialogProps) {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState<SignalCategory>('geopolitical')
  const [description, setDescription] = useState('')
  const [weight, setWeight] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description.trim() && weight !== 0) {
      onAddSignal(category, description.trim(), weight)
      setDescription('')
      setWeight(0)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 font-mono uppercase tracking-wide">
          <Plus weight="bold" />
          Add Signal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-mono uppercase tracking-wide">Add New Signal</DialogTitle>
        </DialogHeader>
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
              Impact Weight
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                placeholder="0"
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
      </DialogContent>
    </Dialog>
  )
}
