import { CustomWrapper, ScrollableDiv } from './Leaderboard.styled'

import { LeaderboardWidget } from '@/widgets/leaderboard/leaderboard.ui'

export const Leaderboard = () => {
  return (
    <CustomWrapper>
      <ScrollableDiv id="scrollableDiv">
        <LeaderboardWidget />
      </ScrollableDiv>
    </CustomWrapper>
  )
}
