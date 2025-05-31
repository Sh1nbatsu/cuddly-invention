import { Dispatch, SetStateAction } from 'react'

import {
  LockedUpgradeButton,
  StyledUpgradeBuyButtonsContainer,
  StyledUpgradeSidebar,
  StyledUpgradesList,
  UpgradeButton,
  UpgradeCostText,
  UpgradeEffectText,
  UpgradeLevelText,
} from '@/features/game/game-upgrades/game-upgrades.styled'

import { useUpgradesContext } from '@/entities/game/game-upgrades/game-upgrades.context'
import { formatNumber, getLevel } from '@/entities/game/model/game.lib'
import { CustomButton } from '@/shared/ui/custom-button/custom-button.ui'

interface SidebarUpgradesProps {
  buyAmount: number
  setBuyAmount: (amount: number) => void
  score: number
  setScore: Dispatch<SetStateAction<number>>
}

const BUY_AMOUNTS = [1, 10, 100]

function formatTwoDecimals(num: number): string {
  return parseFloat(num.toFixed(2)).toString()
}

export const GameUpgradesSidebar = ({
  buyAmount,
  setBuyAmount,
  score,
  setScore,
}: SidebarUpgradesProps) => {
  const { upgrades, buyUpgrade, getUpgradeTotalCost, getUpgradeTotalPower } =
    useUpgradesContext()

  const lastPurchasedIndex = upgrades.reduce(
    (max, upg, i) => (upg.amount > 0 && i > max ? i : max),
    -1
  )

  const nextIndex = lastPurchasedIndex + 1

  return (
    <StyledUpgradeSidebar>
      <h4 style={{ marginTop: 0 }}>Усиления</h4>

      <StyledUpgradeBuyButtonsContainer>
        {BUY_AMOUNTS.map(amount => (
          <CustomButton
            key={amount}
            onClick={() => setBuyAmount(amount)}
            active={buyAmount === amount}
            variant="retro">
            x{amount}
          </CustomButton>
        ))}
      </StyledUpgradeBuyButtonsContainer>

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
            const level = getLevel(upg.amount)
            levelText = `Уровень: ${level}`

            const effectValue = getUpgradeTotalPower(upg.id)
            const formattedEffectValue = formatTwoDecimals(effectValue)
            effectText = `+${formattedEffectValue} / сек.`
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
    </StyledUpgradeSidebar>
  )
}
