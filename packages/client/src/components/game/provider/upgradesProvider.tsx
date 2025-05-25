import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { autoclickUpgrades } from '@/components/game/upgrades/autoclick'

type Upgrade = {
  id: string
  name: string
  amount: number
  getCost: (level: number) => number
  getPower: (level: number) => number
  basePower?: number
}

export type UpgradesContextType = {
  upgrades: Upgrade[]
  buyUpgrade: (
    id: string,
    score: number,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    amount: number
  ) => void
  getUpgradeTotalCost: (
    getCost: (level: number) => number,
    currentAmount: number,
    buyAmount: number
  ) => number
  getUpgradeTotalPower: (id: string) => number
  getUpgradesTotalPower: () => number
}

const UpgradesContext = createContext<UpgradesContextType | undefined>(
  undefined
)

const STORAGE_KEY = 'game_upgrades'

export type UpgradesProviderProps = {
  children: ReactNode
}

export const UpgradesProvider: React.FC<UpgradesProviderProps> = ({
  children,
}) => {
  const [upgrades, setUpgrades] = useState<Upgrade[]>(() => {
    if (typeof window === 'undefined') return []

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Omit<
          Upgrade,
          'getCost' | 'getPower'
        >[]
        return autoclickUpgrades.map(upg => {
          const savedUpg = parsed.find(u => u.id === upg.id)
          return {
            ...upg,
            amount: savedUpg ? savedUpg.amount : 0,
          }
        })
      } catch {
        return autoclickUpgrades.map(upg => ({ ...upg, amount: 0 }))
      }
    }
    return autoclickUpgrades.map(upg => ({ ...upg, amount: 0 }))
  })

  useEffect(() => {
    const toSave = upgrades.map(({ id, name, amount, basePower }) => ({
      id,
      name,
      amount,
      basePower,
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  }, [upgrades])

  const buyUpgrade = useCallback(
    (
      id: string,
      score: number,
      setScore: React.Dispatch<React.SetStateAction<number>>,
      amount: number
    ) => {
      const upg = upgrades.find(u => u.id === id)
      if (!upg) return

      let totalCost = 0
      for (let i = 1; i <= amount; i++) {
        totalCost += upg.getCost(upg.amount + i)
      }

      if (score < totalCost) return

      setScore(prev => prev - totalCost)

      setUpgrades(current => {
        const idx = current.findIndex(u => u.id === id)
        if (idx === -1) return current

        const updated = [...current]
        updated[idx] = { ...current[idx], amount: current[idx].amount + amount }
        return updated
      })
    },
    [upgrades]
  )

  const getUpgradeTotalCost = useCallback(
    (
      getCost: (level: number) => number,
      currentAmount: number,
      buyAmount: number
    ): number => {
      let total = 0
      for (let i = 1; i <= buyAmount; i++) {
        total += getCost(currentAmount + i)
      }
      return total
    },
    []
  )

  const getUpgradeTotalPower = useCallback(
    (id: string): number => {
      const upg = upgrades.find(u => u.id === id)
      if (!upg || !upg.getPower) return 0

      let totalPower = 0
      for (let i = 1; i <= upg.amount; i++) {
        totalPower += upg.getPower(i)
      }

      return totalPower
    },
    [upgrades]
  )

  const getUpgradesTotalPower = useCallback((): number => {
    return upgrades.reduce((total, upg) => {
      return total + getUpgradeTotalPower(upg.id)
    }, 0)
  }, [upgrades, getUpgradeTotalPower])

  return (
    <UpgradesContext.Provider
      value={{
        upgrades,
        buyUpgrade,
        getUpgradeTotalCost,
        getUpgradeTotalPower,
        getUpgradesTotalPower,
      }}>
      {children}
    </UpgradesContext.Provider>
  )
}

export const useUpgradesContext = (): UpgradesContextType => {
  const context = useContext(UpgradesContext)

  if (!context) {
    throw new Error(
      'useUpgradesContext должен использоваться внутри UpgradesProvider.'
    )
  }

  return context
}
