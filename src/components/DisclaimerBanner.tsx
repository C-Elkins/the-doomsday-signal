import { Alert, AlertDescription } from '@/components/ui/alert'
import { Warning } from '@phosphor-icons/react'

export function DisclaimerBanner() {
  return (
    <Alert className="border-2 border-primary bg-card">
      <Warning className="h-5 w-5" weight="bold" />
      <AlertDescription className="font-mono text-xs leading-relaxed">
        <strong className="font-bold uppercase tracking-wide">Educational Project:</strong> This application simulates global risk signals for educational and artistic purposes. It does not predict real-world events, use classified intelligence, or provide actionable security assessments. All data is fictional or derived from public sources with transparent weighting systems.
      </AlertDescription>
    </Alert>
  )
}
