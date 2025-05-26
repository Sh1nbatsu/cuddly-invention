import { Dispatch, SetStateAction } from 'react'
import { CustomButton } from '@/components/CustomButton/CustomButton'
import { useUpgradesContext } from '@/components/Game/provider/upgradesProvider'
import { getLevel } from '@/components/Game/upgrades/autoclick'

import {
  StyledSidebar,
  StyledBuyButtonsContainer,
  StyledUpgradesList,
  LockedUpgradeButton,
  UpgradeButton,
  UpgradeLevelText,
  UpgradeCostText,
  UpgradeEffectText,
} from '@/components/Game/styled' // путь скорректируй по структуре проекта

interface SidebarUpgradesProps {
  buyAmount: number
  setBuyAmount: (amount: number) => void
  score: number
  setScore: Dispatch<SetStateAction<number>>
  formatNumber: (num: number) => string
}

const BUY_AMOUNTS = [1, 10, 100]

export const SidebarUpgrades = ({
  buyAmount,
  setBuyAmount,
  score,
  setScore,
  formatNumber,
}: SidebarUpgradesProps) => {
  const { upgrades, buyUpgrade, getUpgradeTotalCost, getUpgradeTotalPower } =
    useUpgradesContext()

  const lastPurchasedIndex = upgrades.reduce(
    (max, upg, i) => (upg.amount > 0 && i > max ? i : max),
    -1
  )

  const nextIndex = lastPurchasedIndex + 1

  return (
    <StyledSidebar>
      <h4 style={{ marginTop: 0 }}>Усиления</h4>

      <StyledBuyButtonsContainer>
        {BUY_AMOUNTS.map(amount => (
          <CustomButton
            key={amount}
            onClick={() => setBuyAmount(amount)}
            active={buyAmount === amount}
            variant="retro">
            x{amount}
          </CustomButton>
        ))}
      </StyledBuyButtonsContainer>

      <StyledUpgradesList>
        {upgrades.map((upg, i) => {
          const isUnlocked =
            i === 0 || i <= lastPurchasedIndex || i === nextIndex

          if (!isUnlocked) {
            return <LockedUpgradeButton key={upg.id}>?</LockedUpgradeButton>
          }

          const totalCost = getUpgradeTotalCost(
            upg.getCost,
            upg.amount,
            buyAmount
          )
          const canAfford = score >= totalCost

          let effectText = ''
          let levelText = ''
          let effectActive = false

          if (upg.id.startsWith('autoclick_')) {
            const effectValue = getUpgradeTotalPower(upg.id)
            const level = getLevel(upg.amount)

            effectText = `+${formatNumber(effectValue)} / сек.`
            levelText = `Уровень: ${level}`

            if (upg.amount > 0) effectActive = true
          }

          return (
            <UpgradeButton
              key={upg.id}
              onClick={() => buyUpgrade(upg.id, score, setScore, buyAmount)}
              disabled={!canAfford}
              $canAfford={canAfford}>
              <div>
                <strong>
                  {upg.name} ({upg.amount})
                </strong>
              </div>
              {levelText && <UpgradeLevelText>{levelText}</UpgradeLevelText>}
              <UpgradeCostText>Цена: {formatNumber(totalCost)}</UpgradeCostText>
              <UpgradeEffectText $active={effectActive}>
                {effectText}
              </UpgradeEffectText>
            </UpgradeButton>
          )
        })}
      </StyledUpgradesList>
    </StyledSidebar>
  )
}
