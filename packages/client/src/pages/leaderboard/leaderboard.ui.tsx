import {
  ScrollableDiv,
  NavigationDiv,
  CustomWrapper,
  CustomButton,
} from './leaderboard.styled'

import { LeaderboardWidget } from '@/widgets/leaderboard/leader-scroll.ui'
import { FullscreenToggler } from '@/shared/ui/fullscreen-toggler/fullscreen-toggler.ui'

export const Leaderboard = () => {
  return (
    <CustomWrapper>
      <FullscreenToggler />
      <ScrollableDiv id="scrollableDiv">
        <LeaderboardWidget />
      </ScrollableDiv>
      <NavigationDiv>
        <CustomButton variant="retro">Ещё раз?</CustomButton>
      </NavigationDiv>
    </CustomWrapper>
  )
}
