import {
  CustomButton,
  CustomWrapper,
  NavigationDiv,
  ScrollableDiv,
} from './Leaderboard.styled'

import { LeaderboardWidget } from '@/widgets/leaderboard/leader-scroll.ui'

export const Leaderboard = () => {
  return (
    <CustomWrapper>
      <ScrollableDiv id="scrollableDiv">
        <LeaderboardWidget />
      </ScrollableDiv>
      <NavigationDiv>
        <CustomButton variant="retro">Ещё раз?</CustomButton>
      </NavigationDiv>
    </CustomWrapper>
  )
}
