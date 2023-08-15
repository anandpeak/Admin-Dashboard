import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const COMPANY_QUERY = gql`
  query Company {
    company {
      id
      name
    }
  }
`

const Company = () => {
  const itemsPerPage = 10
  const token = localStorage.getItem('token')

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(COMPANY_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const companies = queryData ? queryData.company : []
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const currentCompanies = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset page to 1 when performing a new search
  }
  return (
    <div>
      <div className="my-3">
        <input
          type="text"
          className="form-control w-1/3"
          placeholder="Search by company name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Ашиглаж буй Компани</CTableHeaderCell>
            <CTableHeaderCell>Тоглосон тоо</CTableHeaderCell>
            <CTableHeaderCell>Хариу нь гарсан</CTableHeaderCell>
            <CTableHeaderCell>Хариу нь гараагүй</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentCompanies.map((item) => (
            <CTableRow key={item.id}>
              <CTableDataCell>
                <Link to={`/company/${item.id}`}>{item.name}</Link>
              </CTableDataCell>
              <CTableDataCell>
                <strong>{item.played}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <div className="clearfix">
                  <div className="float-start">
                    <strong>{item.normal}</strong>
                  </div>
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <strong>{item.null}</strong>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <div className="pagination d-flex justify-content-center mt-4">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredCompanies.length / itemsPerPage) }).map(
            (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => {
                    paginate(index + 1)
                  }}
                >
                  {index + 1}
                </button>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  )
}
export default Company
