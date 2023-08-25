import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { useQuery } from '@apollo/client'
import { COMPANY_DETAIL_QUERY } from 'src/apollo/useQuery'
import { HashLoader } from 'react-spinners'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const CompanyDetail = () => {
  const { id } = useParams()
  const [filter, setFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortedColumn, setSortedColumn] = useState('date')
  const ITEMS_PER_PAGE = 10

  const { loading, error, data } = useQuery(COMPANY_DETAIL_QUERY, {
    variables: { id: id },
  })

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HashLoader color="#f59a8c" size={100} />
      </div>
    )
  if (error) return <p>Error: {error.message}</p>

  // Items
  const company = data.CompanyDetail

  // Pagination
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

  // Filter
  const filteredPlayers = company.players.filter(
    (player) =>
      player.name.toLowerCase().includes(filter.toLowerCase()) ||
      player.lastName.toLowerCase().includes(filter.toLowerCase()) ||
      player.majorLevel.toLowerCase().includes(filter.toLowerCase()),
  )
  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE)

  const visiblePageNumbers = []
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    visiblePageNumbers.push(i)
  }

  // Sort
  const sortItems = (items, column, order) => {
    return [...items].sort((a, b) => {
      const dateA = a.lastModifiedDate ? new Date(a.lastModifiedDate) : new Date(0)
      const dateB = b.lastModifiedDate ? new Date(b.lastModifiedDate) : new Date(0)

      if (column === 'date') {
        if (order === 'asc') {
          return dateA - dateB
        } else {
          return dateB - dateA
        }
      }

      return 0
    })
  }
  const renderSortIcon = () => {
    return sortOrder === 'asc' ? '▲' : '▼'
  }
  const sortedPlayers = sortItems(filteredPlayers, sortedColumn, sortOrder)
  const currentItems = sortedPlayers.slice(indexOfFirstItem, indexOfLastItem)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="container mt-5">
      <CCard>
        <CCardHeader>
          <div className="fs-2 fw-bolder">{company.companyName}</div>
        </CCardHeader>
        <CCardBody>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Filter"
              value={filter}
              className="border rounded py-1 px-2"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">email</th>
                  <th scope="col">Profession</th>
                  <th scope="col">Result</th>
                  <th
                    scope="col"
                    onClick={() => {
                      setSortedColumn('date')
                      toggleSortOrder()
                    }}
                  >
                    Date
                    {renderSortIcon('date')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((player, index) => {
                  const lastModifiedDate = player.lastModifiedDate
                    ? new Date(player.lastModifiedDate)
                    : null

                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{player.name || ' '}</td>
                      <td>{player.email || ' '}</td>
                      <td>{player.majorLevel || ' '}</td>
                      <td>{player.completed}</td>
                      <td>
                        {lastModifiedDate ? format(lastModifiedDate, 'yyyy.MM.dd') : ' '}
                      </td>{' '}
                    </tr>
                  )
                })}
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

export default CompanyDetail
