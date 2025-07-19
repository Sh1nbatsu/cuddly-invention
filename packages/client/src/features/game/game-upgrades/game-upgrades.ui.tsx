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
  UpgradeNameText,
  UpgradeInfoRow,
} from '@/features/game/game-upgrades/game-upgrades.styled'
import { useUpgradesContext } from '@/entities/game/game-upgrades/game-upgrades.context'
import { CustomButton } from '@/shared/ui/custom-button/custom-button.ui'
import { achievementService } from '@/notification/achievement-service'

interface SidebarUpgradesProps {
  buyAmount: number
  setBuyAmount: (amount: number) => void
  score: number
  setScore: Dispatch<SetStateAction<number>>
}

const BUY_AMOUNTS = [1, 10, 100]

const formatNumberSpaces = (num: number) => {
  const [intPart, decPart] = num.toFixed(2).split('.')
  const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  const decTrimmed = decPart.replace(/0+$/, '')
  return decTrimmed ? `${intFormatted}.${decTrimmed}` : intFormatted
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

  const handleBuyUpgrade = (
    upgradeId: string,
    upgradeName: string,
    prevAmount: number
  ) => {
    buyUpgrade(upgradeId, score, setScore, buyAmount)
    achievementService.processPurchase(
      upgradeId,
      upgradeName,
      prevAmount + buyAmount
    )
  }

  return (
    <StyledUpgradeSidebar>
      <h4 style={{ marginTop: 0, color: 'var(--color-text)' }}>Усиления</h4>

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
          if (!isUnlocked)
            return <LockedUpgradeButton key={upg.id}>?</LockedUpgradeButton>

          const totalCost = getUpgradeTotalCost(
            upg.getCost,
            upg.amount,
            buyAmount
          )
          const canAfford = score >= totalCost

          let levelText = ''
          let effectText = ''
          let effectActive = false
          if (upg.id.startsWith('autoclick_')) {
            levelText = `Уровень: ${upg.amount}`
            effectText = `+${formatNumberSpaces(
              getUpgradeTotalPower(upg.id)
            )}/сек.`
            effectActive = upg.amount > 0
          }

          return (
            <UpgradeButton
              key={upg.id}
              onClick={() => handleBuyUpgrade(upg.id, upg.name, upg.amount)}
              disabled={!canAfford}
              $canAfford={canAfford}>
              <UpgradeNameText>{upg.name}</UpgradeNameText>

              <UpgradeInfoRow>
                {levelText && <UpgradeLevelText>{levelText}</UpgradeLevelText>}
                <UpgradeEffectText $active={effectActive}>
                  {effectText}
                </UpgradeEffectText>
              </UpgradeInfoRow>

              <UpgradeCostText>
                Цена: {formatNumberSpaces(totalCost)}
              </UpgradeCostText>
            </UpgradeButton>
          )
        })}
      </StyledUpgradesList>
    </StyledUpgradeSidebar>
  )
}
