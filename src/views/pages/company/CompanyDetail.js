import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { useQuery } from '@apollo/client'
import { COMPANY_DETAIL_QUERY } from 'src/apollo/useQuery'
import { HashLoader } from 'react-spinners'

const CompanyDetail = () => {
  const { id } = useParams()
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Number of items per page

  const { loading, error, data } = useQuery(COMPANY_DETAIL_QUERY, {
    variables: { companyId: id },
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
  const totalPages = Math.ceil(company.Players.length / itemsPerPage)
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  // Filter players based on the filter input value
  const filteredPlayers = company.Players.filter(
    (player) =>
      player.Name.toLowerCase().includes(filter.toLowerCase()) ||
      player.lastName.toLowerCase().includes(filter.toLowerCase()) ||
      player.majorLevel.toLowerCase().includes(filter.toLowerCase()),
  )
  const currentItems = filteredPlayers.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container mt-5">
      <CCard>
        <CCardHeader>
          <div className="fs-2 fw-bolder">{company.CompanyName}</div>
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
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((player, index) => {
                  const textClassName = player.completed === 'true' ? 'text-success' : 'text-danger'
                  const createdDate = player.createdDate ? new Date(player.createdDate) : null

                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{player.Name || 'N/A'}</td>
                      <td>{player.lastName || 'N/A'}</td>
                      <td>{player.majorLevel || 'N/A'}</td>
                      <td className={textClassName}>
                        {player.completed === 'true' ? 'Completed' : 'Failed'}
                      </td>
                      <td>{createdDate ? format(createdDate, 'yyyy-MM-dd HH:mm:ss') : 'N/A'}</td>
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
