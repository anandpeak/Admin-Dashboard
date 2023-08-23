import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { useQuery } from '@apollo/client'
import { COMPANY_DETAIL_QUERY } from 'src/apollo/useQuery'
import { HashLoader } from 'react-spinners'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { faSort } from '@fortawesome/free-solid-svg-icons' // Import the sorting icon

const CompanyDetail = () => {
  const { id } = useParams()
  const [filter, setFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortedColumn, setSortedColumn] = useState('date')
  const itemsPerPage = 10

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
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const totalPages = Math.ceil(company.players.length / itemsPerPage)
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  // Filter
  const filteredPlayers = company.players.filter(
    (player) =>
      player.name.toLowerCase().includes(filter.toLowerCase()) ||
      player.lastName.toLowerCase().includes(filter.toLowerCase()) ||
      player.majorLevel.toLowerCase().includes(filter.toLowerCase()),
  )

  //Sort
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
                  <th scope="col">Lastname</th>
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
                      <td>{player.name || 'N/A'}</td>
                      <td>{player.lastName || 'N/A'}</td>
                      <td>{player.majorLevel || 'N/A'}</td>
                      <td>{player.completed}</td>
                      <td>
                        {lastModifiedDate ? format(lastModifiedDate, 'yyyy.MM.dd') : 'N/A'}
                      </td>{' '}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <nav className="mt-3 d-flex justify-content-center">
            <ul className="pagination">
              {pageNumbers.map((pageNumber) => (
                <li
                  key={pageNumber}
                  className={`page-item${currentPage === pageNumber ? ' active' : ''}`}
                >
                  <button className="page-link" onClick={() => paginate(pageNumber)}>
                    {pageNumber}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default CompanyDetail
