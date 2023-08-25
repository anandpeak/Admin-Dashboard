import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { GET_COMPLETED_PLAYER_INFO } from 'src/apollo/useQuery'
import { useQuery } from '@apollo/client'
import { HashLoader } from 'react-spinners'

const CompletedPlayers = () => {
  const { data, loading, error } = useQuery(GET_COMPLETED_PLAYER_INFO)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState('desc')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortedColumn, setSortedColumn] = useState('date')
  const [filteredPlayers, setFilteredPlayers] = useState([])
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    if (data) {
      const allPlayerInfo = data.GetCompletedPlayerInfo
      let filtered = allPlayerInfo.filter(
        (player) =>
          player.player_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.player_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.company_name.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      if (sortedColumn === 'date') {
        filtered = filtered.sort((a, b) => {
          const dateA = new Date(a.last_modified_date)
          const dateB = new Date(b.last_modified_date)
          if (sortOrder === 'asc') {
            return dateA - dateB
          } else {
            return dateB - dateA
          }
        })
      }

      setFilteredPlayers(filtered)
      setCurrentPage(1)
    }
  }, [searchQuery, data, sortedColumn, sortOrder])

  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const visiblePlayers = filteredPlayers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const visiblePageNumbers = []
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    visiblePageNumbers.push(i)
  }
  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortedColumn(column)
      setSortOrder('asc')
    }
  }
  const renderSortIcon = () => {
    return sortOrder === 'asc' ? '▲' : '▼'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HashLoader color="#f59a8c" size={100} />
      </div>
    )
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      <CCard>
        <CCardHeader>Нийт амжилттай хариу гарсан хүмүүсийн хүснэгт</CCardHeader>
        <CCardBody>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Хайх..."
              className="border border-gray-300 px-3 py-2 rounded-md w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Нэр</th>
                  <th scope="col">И-мейл</th>
                  <th scope="col">Компани</th>
                  <th scope="col">
                    <button className="text-left" onClick={() => handleSort('date')}>
                      Урьсан Өдөр {renderSortIcon('date')}
                    </button>
                  </th>
                  <th scope="col">
                    <button className="text-left" onClick={() => handleSort('date')}>
                      Тоголсон Өдөр {renderSortIcon('date')}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visiblePlayers.map((player, index) => (
                  <tr key={startIndex + index}>
                    <td>{player.player_name || ' '}</td>
                    <td>{player.player_email || ' '}</td>
                    <td>{player.company_name || ' '}</td>
                    <td>{player.created_date || ' '}</td>
                    <td>{player.last_modified_date || ' '}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            {currentPage > 3 && (
              <button
                className="px-3 py-1 rounded border bg-white text-gray-700 mx-1 hover:bg-red-500 hover:text-[#ff0000]"
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
            )}
            {currentPage > 4 && <span className="mx-1">...</span>}
            {visiblePageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`px-3 py-1 rounded border ${
                  currentPage === pageNumber ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
                } mx-1 hover:bg-red-500 hover:text-[#ff0000]`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            {currentPage < totalPages - 3 && <span className="mx-1">...</span>}
            {currentPage < totalPages - 2 && (
              <button
                className="px-3 py-1 rounded border bg-white text-gray-700 mx-1 hover:bg-red-500 hover:text-[#ff0000]"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default CompletedPlayers
