import React from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import { gql, useQuery } from '@apollo/client'

const GET_PLAYER_COUNT = gql`
  query GetPlayerCount {
    playerCount
  }
`

const GET_PLAYER_STATS = gql`
  query {
    completedPlayerCount
    nullPlayerCount
    invitedPlayerCount
  }
`

const WidgetsDropdown = () => {
  const { loading, error, data } = useQuery(GET_PLAYER_COUNT)
  const { loading: statsLoading, error: statsError, data: statsData } = useQuery(GET_PLAYER_STATS)

  if (loading || statsLoading) return <p>Loading...</p>
  if (error || statsError) return <p>Error: {error?.message || statsError?.message}</p>

  const playerCount = data.playerCount
  const completedPlayerCount = statsData.completedPlayerCount
  const nullPlayerCount = statsData.nullPlayerCount
  const invitedPlayerCount = statsData.invitedPlayerCount
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 py-4"
          color="primary"
          value={<div className="my-4">{playerCount}</div>}
          title="Нийт хүмүүсийн тоо"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 py-4"
          color="success"
          value={<div className="my-2 pb-[10px]">{completedPlayerCount}</div>}
          title="Амжилттай хариу гарсан хүмүүсийн тоо"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 py-4"
          color="warning"
          value={<div className="my-4">{invitedPlayerCount}</div>}
          title="Урьсан хүмүүсийн тоо"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 py-4"
          color="danger"
          value={<div className="my-4">{nullPlayerCount}</div>}
          title="Хариу гараагүй хүмүүсийн тоо"
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
