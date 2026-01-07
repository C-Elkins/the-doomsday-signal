import { SignalCategory } from './types'

export interface SignalPreset {
  id: string
  category: SignalCategory
  name: string
  description: string
  weight: number
  decayRate: number
}

export const signalPresets: SignalPreset[] = [
  {
    id: 'treaty-withdrawal-major',
    category: 'geopolitical',
    name: 'Major Treaty Withdrawal',
    description: 'Nation withdraws from major arms control treaty',
    weight: 15,
    decayRate: 0.03,
  },
  {
    id: 'treaty-withdrawal-minor',
    category: 'geopolitical',
    name: 'Minor Treaty Withdrawal',
    description: 'Nation withdraws from regional cooperation agreement',
    weight: 8,
    decayRate: 0.05,
  },
  {
    id: 'military-exercise-border',
    category: 'geopolitical',
    name: 'Military Exercise Near Border',
    description: 'Large-scale military drills near contested border',
    weight: 10,
    decayRate: 0.06,
  },
  {
    id: 'sanctions-imposed',
    category: 'geopolitical',
    name: 'Economic Sanctions Imposed',
    description: 'Major economic sanctions placed on nation-state',
    weight: 7,
    decayRate: 0.04,
  },
  {
    id: 'un-emergency-meeting',
    category: 'geopolitical',
    name: 'Emergency UN Security Council Meeting',
    description: 'UNSC convenes emergency session on security crisis',
    weight: 12,
    decayRate: 0.05,
  },
  {
    id: 'diplomatic-talks',
    category: 'geopolitical',
    name: 'High-Level Diplomatic Talks Announced',
    description: 'Major powers announce peace negotiations',
    weight: -12,
    decayRate: 0.04,
  },
  {
    id: 'cyber-critical-infrastructure',
    category: 'cyber',
    name: 'Critical Infrastructure Cyber Attack',
    description: 'Nation-state linked attack on power grid or water systems',
    weight: 14,
    decayRate: 0.05,
  },
  {
    id: 'cyber-government-breach',
    category: 'cyber',
    name: 'Government Network Breach',
    description: 'Foreign actors breach classified government systems',
    weight: 11,
    decayRate: 0.06,
  },
  {
    id: 'cyber-ddos-campaign',
    category: 'cyber',
    name: 'Coordinated DDoS Campaign',
    description: 'State-sponsored distributed denial of service attacks',
    weight: 6,
    decayRate: 0.08,
  },
  {
    id: 'cyber-election-interference',
    category: 'cyber',
    name: 'Election Infrastructure Attack',
    description: 'Cyber operations targeting voting systems or registration',
    weight: 13,
    decayRate: 0.05,
  },
  {
    id: 'cyber-financial-system',
    category: 'cyber',
    name: 'Financial System Cyber Attack',
    description: 'Nation-state attack on banking or payment systems',
    weight: 12,
    decayRate: 0.06,
  },
  {
    id: 'cyber-comms-blackout',
    category: 'cyber',
    name: 'Communications Blackout',
    description: 'Internet or telecom infrastructure disrupted by foreign actors',
    weight: 9,
    decayRate: 0.07,
  },
  {
    id: 'media-nuclear-rhetoric',
    category: 'media',
    name: 'Nuclear Rhetoric Escalation',
    description: 'State leaders make explicit nuclear threats',
    weight: 16,
    decayRate: 0.04,
  },
  {
    id: 'media-propaganda-spike',
    category: 'media',
    name: 'State Propaganda Spike',
    description: 'Sharp increase in state-affiliated hostile messaging',
    weight: 7,
    decayRate: 0.08,
  },
  {
    id: 'media-dehumanizing',
    category: 'media',
    name: 'Dehumanizing Language Campaign',
    description: 'Systematic dehumanization of opposing population',
    weight: 10,
    decayRate: 0.06,
  },
  {
    id: 'media-disinfo-campaign',
    category: 'media',
    name: 'Disinformation Campaign',
    description: 'Coordinated false narrative spread across platforms',
    weight: 8,
    decayRate: 0.07,
  },
  {
    id: 'strategic-missile-test',
    category: 'strategic',
    name: 'Ballistic Missile Test',
    description: 'Nation conducts ICBM or intermediate-range missile test',
    weight: 13,
    decayRate: 0.05,
  },
  {
    id: 'strategic-nuclear-test',
    category: 'strategic',
    name: 'Nuclear Weapons Test',
    description: 'Nation conducts underground or atmospheric nuclear test',
    weight: 20,
    decayRate: 0.03,
  },
  {
    id: 'strategic-readiness-increase',
    category: 'strategic',
    name: 'Military Readiness Increase',
    description: 'Nation publicly raises defense readiness level',
    weight: 14,
    decayRate: 0.05,
  },
  {
    id: 'strategic-satellite-launch',
    category: 'strategic',
    name: 'Military Satellite Launch',
    description: 'Nation launches reconnaissance or weapons satellite',
    weight: 9,
    decayRate: 0.06,
  },
  {
    id: 'strategic-ceasefire',
    category: 'strategic',
    name: 'Ceasefire Agreement',
    description: 'Active conflict parties agree to cessation of hostilities',
    weight: -15,
    decayRate: 0.04,
  },
]

export function getPresetsByCategory(category: SignalCategory): SignalPreset[] {
  return signalPresets.filter((preset) => preset.category === category)
}

export function getPresetById(id: string): SignalPreset | undefined {
  return signalPresets.find((preset) => preset.id === id)
}
