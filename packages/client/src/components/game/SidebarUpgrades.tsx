import { FC, Dispatch, SetStateAction } from 'react'
import { CustomButton } from '@/components/CustomButton/CustomButton'
import { useUpgradesContext } from './provider/upgradesProvider'
import { getLevel } from '@/components/game/upgrades/autoclick'

interface SidebarUpgradesProps {
  buyAmount: number
  setBuyAmount: (amount: number) => void
  score: number
  setScore: Dispatch<SetStateAction<number>>
  formatNumber: (num: number) => string
}

export const SidebarUpgrades: FC<SidebarUpgradesProps> = ({
  buyAmount,
  setBuyAmount,
  score,
  setScore,
  formatNumber,
}) => {
  const { upgrades, buyUpgrade, getUpgradeTotalCost, getUpgradeTotalPower } =
    useUpgradesContext()

  const lastPurchasedIndex = upgrades
    .map((upg, i) => (upg.amount > 0 ? i : -1))
    .filter(i => i >= 0)
    .reduce((max, i) => (i > max ? i : max), -1)

  const nextIndex = lastPurchasedIndex + 1

  return (
    <div
      style={{
        minWidth: 320,
        maxHeight: '-webkit-fill-available',
        padding: 12,
        borderRight: '2px solid var(--color-primary)',
        overflow: 'auto',
      }}>
      <h4 style={{ marginTop: 0 }}>Усиления</h4>

      <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        {[1, 10, 100].map(amount => (
          <CustomButton
            key={amount}
            onClick={() => setBuyAmount(amount)}
            active={buyAmount === amount}
            variant="retro">
            x{amount}
          </CustomButton>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
        {upgrades.map((upg, i) => {
          const isUnlocked =
            i === 0 || i <= lastPurchasedIndex || i === nextIndex

          if (!isUnlocked) {
            return (
              <button
                key={upg.id}
                style={{
                  background: '#fff',
                  border: '1px dashed #ccc',
                  padding: 16,
                  borderRadius: 6,
                  opacity: 0.5,
                  fontSize: 24,
                  fontWeight: 'bold',
                  userSelect: 'none',
                  cursor: 'not-allowed',
                }}
                disabled>
                ?
              </button>
            )
          }

          const totalCost = getUpgradeTotalCost(
            upg.getCost,
            upg.amount,
            buyAmount
          )

          const canAfford = score >= totalCost

          let effectText = ''
          let effectColor = '#666'
          let levelText = ''

          if (upg.id.startsWith('autoclick_')) {
            const effectValue = getUpgradeTotalPower(upg.id)
            const level = getLevel(upg.amount)

            effectText = `+${formatNumber(effectValue)} / сек.`
            levelText = `Уровень: ${level}`

            if (upg.amount > 0) effectColor = '#007700'
          }

          return (
            <button
              key={upg.id}
              style={{
                background: '#fff',
                border: canAfford
                  ? '1px solid var(--color-primary)'
                  : '1px dashed #ccc',
                padding: 8,
                borderRadius: 6,
                textAlign: 'left',
                cursor: canAfford ? 'pointer' : 'not-allowed',
                opacity: canAfford ? 1 : 0.5,
                transition: 'border-color 0.3s ease',
              }}
              onClick={() => buyUpgrade(upg.id, score, setScore, buyAmount)}
              disabled={!canAfford}>
              <div>
                <strong>
                  {upg.name} ({upg.amount})
                </strong>
              </div>
              {levelText && (
                <div style={{ fontSize: 12, color: '#666' }}>{levelText}</div>
              )}
              <div style={{ fontSize: 12, color: '#666' }}>
                Цена: {formatNumber(totalCost)}
              </div>
              <div style={{ fontSize: 12, color: effectColor }}>
                {effectText}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
