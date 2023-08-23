import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Link, Navigate } from 'react-router-dom'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { COMPANY_QUERY } from 'src/apollo/useQuery'

const Company = () => {
  const token = localStorage.getItem('token')

  const { error: queryError, data: queryData } = useQuery(COMPANY_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  if (queryError) {
    console.log(queryError)
    Navigate('/500')
  }

  const companies = queryData ? queryData.Company : []

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const nonNullCompanies = companies.filter((item) => item.assessments !== null)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const [searchQuery, setSearchQuery] = useState('')
  const filteredCompanies = nonNullCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  const [sortKey, setSortKey] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  const handleSort = (key) => {
    setSortKey(key)
    toggleSortDirection()
  }

  const renderSortIcon = (columnKey) => {
    if (sortKey === columnKey) {
      return sortDirection === 'asc' ? '▲' : '▼'
    }
    return null
  }

  const sortedCompanies = filteredCompanies.slice().sort((a, b) => {
    if (sortKey === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortKey === 'AllPlayerCount') {
      return sortDirection === 'asc'
        ? a.assessments[0].AllPlayerCount - b.assessments[0].AllPlayerCount
        : b.assessments[0].AllPlayerCount - a.assessments[0].AllPlayerCount
    } else if (sortKey === 'CompletedCount') {
      return sortDirection === 'asc'
        ? a.assessments[0].CompletedCount - b.assessments[0].CompletedCount
        : b.assessments[0].CompletedCount - a.assessments[0].CompletedCount
    } else if (sortKey === 'InvitedCount') {
      return sortDirection === 'asc'
        ? a.assessments[0].InvitedCount - b.assessments[0].InvitedCount
        : b.assessments[0].InvitedCount - a.assessments[0].InvitedCount
    } else if (sortKey === 'AppliedCount') {
      return sortDirection === 'asc'
        ? a.assessments[0].AppliedCount - b.assessments[0].AppliedCount
        : b.assessments[0].AppliedCount - a.assessments[0].AppliedCount
    } else if (sortKey === 'StartedCount') {
      return sortDirection === 'asc'
        ? a.assessments[0].StartedCount - b.assessments[0].StartedCount
        : b.assessments[0].StartedCount - a.assessments[0].StartedCount
    } else if (sortKey === 'createdDate') {
      const dateA = new Date(a.assessments[0].players[0].createdDate)
      const dateB = new Date(b.assessments[0].players[0].createdDate)
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA
    }
  })

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const companiesToShow = sortedCompanies.slice(startIndex, endIndex)

  const totalPages = Math.ceil(sortedCompanies.length / itemsPerPage)

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control w-1/3"
          placeholder="Хайх..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell onClick={() => handleSort('name')}>
              Ашиглаж буй Компани {renderSortIcon('name')}
            </CTableHeaderCell>
            <CTableHeaderCell onClick={() => handleSort('AllPlayerCount')}>
              Нийт хэрэглэгч {renderSortIcon('AllPlayerCount')}
            </CTableHeaderCell>
            <CTableHeaderCell onClick={() => handleSort('CompletedCount')}>
              Хариу гарсан {renderSortIcon('CompletedCount')}
            </CTableHeaderCell>
            <CTableHeaderCell onClick={() => handleSort('InvitedCount')}>
              Урьсан {renderSortIcon('InvitedCount')}
            </CTableHeaderCell>
            <CTableHeaderCell onClick={() => handleSort('AppliedCount')}>
              Хүсэлт илгээсэн {renderSortIcon('AppliedCount')}
            </CTableHeaderCell>
            <CTableHeaderCell onClick={() => handleSort('StartedCount')}>
              Эхэлсэн {renderSortIcon('StartedCount')}
            </CTableHeaderCell>
            <CTableHeaderCell onClick={() => handleSort('createdDate')}>
              Сүүлд тоглосон {renderSortIcon('createdDate')}
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {companiesToShow.map((item) => {
            const { assessments } = item
            if (!assessments) {
              return null
            }
            return (
              <CTableRow key={item.id}>
                <CTableDataCell>
                  <Link to={`/company/${item.id}`}>{item.name}</Link>
                </CTableDataCell>
                <CTableDataCell>
                  <strong>{assessments[0].AllPlayerCount}</strong>
                </CTableDataCell>
                <CTableDataCell>
                  <strong>{assessments[0].CompletedCount}</strong>
                </CTableDataCell>
                <CTableDataCell>
                  <strong>{assessments[0].InvitedCount}</strong>
                </CTableDataCell>
                <CTableDataCell>
                  <strong>{assessments[0].AppliedCount}</strong>
                </CTableDataCell>
                <CTableDataCell>
                  <strong>{assessments[0].StartedCount}</strong>
                </CTableDataCell>
                <CTableDataCell>
                  <strong>{assessments[0].players[0].createdDate}</strong>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <nav
        aria-label="Page navigation"
        className="d-flex justify-content-center align-items-center mt-3"
      >
        <ul className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
export default Company
