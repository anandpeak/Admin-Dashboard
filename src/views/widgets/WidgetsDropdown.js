import React from 'react'
import { CRow, CCol } from '@coreui/react'
import { useQuery } from '@apollo/client'
import { GET_PLAYER_COUNT } from 'src/apollo/useQuery'
import { GET_PLAYER_STATS } from 'src/apollo/useQuery'
import { Link } from 'react-router-dom'

const WidgetsDropdown = () => {
  const { loading, error, data } = useQuery(GET_PLAYER_COUNT)
  const { loading: statsLoading, error: statsError, data: statsData } = useQuery(GET_PLAYER_STATS)
  console.log(data)
  if (loading || statsLoading) return <p>Loading...</p>
  if (error || statsError) return <p>Error: {error?.message || statsError?.message}</p>

  const playerCount = data.GetPlayerCount
  const completedPlayerCount = statsData.completedPlayerCount
  const nullPlayerCount = statsData.nullPlayerCount
  const invitedPlayerCount = statsData.invitedPlayerCount
  return (
    <CRow className="mb-3 ">
      <CCol sm={6} lg={3}>
        <div className="bg-[#0000ff] opacity-75 mb-2 py-4 px-4 lg-0 lg:h-[129.5px] sm:h-[129.5px] md:h-[106px] border rounded-[15px] shadow-lg">
          <Link to="/allPlayers">
            <div className="text-white font-bold mb-2">{playerCount}</div>
            <div className="text-white font-semibold mb-0 lg:mb-4 xl:mb-4 md:mb-0">
              Нийт хүмүүсийн тоо
            </div>
          </Link>
        </div>
      </CCol>
      <CCol sm={6} lg={3}>
        <div className="bg-[#009900] mb-2 py-4 px-4 border rounded-[15px] shadow-lg">
          <div className="text-white font-bold mb-2">{completedPlayerCount}</div>
          <div className="text-white font-semibold">Амжилттай хариу гарсан хүмүүсийн тоо</div>
        </div>
        ~
      </CCol>
      <CCol sm={6} lg={3} className="sm:mt-2 mt-0">
        <div className="bg-[#fca510] mb-2 py-4 px-4 border rounded-[15px] lg-0 lg:h-[129.5px] sm:h-[129.5px] md:h-[106px] shadow-lg">
          <div className="text-white font-bold mb-2">{invitedPlayerCount}</div>
          <div className="text-white font-semibold mb-0 lg:mb-4">Тоглоогүй хүмүүсийн тоо</div>
        </div>
      </CCol>
      <CCol sm={6} lg={3} className="sm:mt-2 mt-0">
        <div className="bg-[#990f02] opacity-75 mb-2 py-4 px-4 border rounded-[15px] shadow-lg">
          <div className="text-white font-bold mb-2">{nullPlayerCount}</div>
          <div className="text-white font-semibold ">Хоосон хариу гарсан хүмүүсийн тоо</div>
        </div>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
