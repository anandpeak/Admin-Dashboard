import React from 'react'
import { CRow, CCol } from '@coreui/react'
import { useQuery } from '@apollo/client'
import { GET_PLAYER_COUNT } from 'src/apollo/useQuery'
import { GET_PLAYER_STATS } from 'src/apollo/useQuery'
import { Link } from 'react-router-dom'

const WidgetsDropdown = () => {
  const { loading, error, data } = useQuery(GET_PLAYER_COUNT)
  const { loading: statsLoading, error: statsError, data: statsData } = useQuery(GET_PLAYER_STATS)
  if (loading || statsLoading) return <p>Loading...</p>
  if (error || statsError) return <p>Error: {error?.message || statsError?.message}</p>
  const playerCount = data.GetPlayerCount
  const appliedPlayerCount = statsData.AppliedPlayerCount
  const completedPlayerCount = statsData.completedPlayerCount
  const startedPlayerCount = statsData.startedPlayerCount
  const invitedPlayerCount = statsData.invitedPlayerCount
  const companyCount = statsData.companyCount
  return (
    <CRow className="mb-3 ">
      <CCol sm={6} lg={4} className="sm:mt-2 mt-0">
        <div className="bg-[#027d7a] mb-2 py-4 px-4 border rounded-[15px] lg-0 lg:h-[129.5px] sm:h-[129.5px] md:h-[106px] shadow-lg">
          <Link to="/dashboard">
            <div className="text-white font-bold mb-2">{companyCount}</div>
            <div className="text-white font-semibold mb-0 lg:mb-4">Бүртгүүлсэн компаниуд</div>
          </Link>
        </div>
      </CCol>
      <CCol sm={6} lg={4}>
        <div className="bg-[#0000ff] opacity-75 mb-2 py-4 px-4 lg-0 lg:h-[129.5px] sm:h-[129.5px] md:h-[106px] border rounded-[15px] shadow-lg">
          <Link to="/allPlayers">
            <div className="text-white font-bold mb-2">{playerCount}</div>
            <div className="text-white font-semibold mb-0 lg:mb-4 xl:mb-4 md:mb-0">
              Нийт хүмүүсийн тоо
            </div>
          </Link>
        </div>
      </CCol>
      <CCol sm={6} lg={4}>
        <div className="bg-[#009900] mb-2 py-4 px-4 border rounded-[15px] shadow-lg">
          <Link to="/completedPlayers">
            <div className="text-white font-bold mb-2">{completedPlayerCount}</div>
            <div className="text-white font-semibold">Амжилттай хариу гарсан хүмүүсийн тоо</div>
          </Link>
        </div>
      </CCol>
      <CCol sm={6} lg={4} className="sm:mt-2 mt-0">
        <div className="bg-[#fca510] mb-2 py-4 px-4 border rounded-[15px] lg-0 lg:h-[129.5px] sm:h-[129.5px] md:h-[106px] shadow-lg">
          <Link to="/invitedPlayers">
            <div className="text-white font-bold mb-2">{invitedPlayerCount}</div>
            <div className="text-white font-semibold mb-0 lg:mb-4">Тоглоогүй хүмүүсийн тоо</div>
          </Link>
        </div>
      </CCol>
      <CCol sm={6} lg={4} className="sm:mt-2 mt-0">
        <div className="bg-[#990f02] mb-2 py-4 px-4 border rounded-[15px] lg-0 lg:h-[129.5px] sm:h-[129.5px] md:h-[106px] shadow-lg">
          <Link to="/startedPlayers">
            <div className="text-white font-bold mb-2">{startedPlayerCount}</div>
            <div className="text-white font-semibold mb-0 lg:mb-4">
              Дуусгалгүй гарсан хүмүүсийн тоо
            </div>
          </Link>
        </div>
      </CCol>
      <CCol sm={6} lg={4} className="sm:mt-2 mt-0">
        <div className="bg-[#2C2A4A] mb-2 py-4 px-4 border rounded-[15px] lg-0 lg:h-[129.5px] sm:h-[129.5px] md:h-[106px] shadow-lg">
          <Link to="/appliedPlayers">
            <div className="text-white font-bold mb-2">{appliedPlayerCount}</div>
            <div className="text-white font-semibold mb-0 lg:mb-4">
              Хүсэлт илгээсэн хүмүүсийн тоо
            </div>
          </Link>
        </div>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
