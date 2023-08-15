import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import React, { useState } from 'react'

const data = [
  {
    first: 'Tseren',
    last: 'Usuhuu',
    result: 'failed',
    date: '2121.12.18',
    profession: 'Top management',
    index: 1,
  },
  {
    first: 'Bataa',
    last: 'Amaraa',
    result: 'success',
    date: '2019.03.12',
    profession: 'Middle management',
    index: 2,
  },
  {
    first: 'dorjoo',
    last: 'Hasar',
    result: 'failed',
    date: '2020.08.02',
    profession: 'Employee',
    index: 3,
  },
  {
    first: 'bilguun',
    last: 'Murun',
    result: 'success',
    date: '2021.05.28',
    profession: 'student',
    index: 4,
  },
  {
    first: 'Nergui',
    last: 'Dorj',
    result: 'failed',
    date: '2020.08.03',
    profession: 'student',
    index: 5,
  },
  {
    first: 'Batsuh',
    last: 'Dagva',
    result: 'failed',
    date: '2020.08.04',
    profession: 'Middle management',
    index: 6,
  },
]

const CompanyDetail = () => {
  const [filter, setFilter] = useState('')

  const filteredData = data.filter((item) => {
    if (!filter) return true

    const lowercaseFilter = filter.toLowerCase()
    const { first, last, date, profession } = item

    return (
      first.toLowerCase().includes(lowercaseFilter) ||
      last.toLowerCase().includes(lowercaseFilter) ||
      profession.toLowerCase().includes(lowercaseFilter) ||
      date.startsWith(filter)
    )
  })

  return (
    <div>
      <CCard>
        <CCardHeader>Company Name</CCardHeader>
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
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Profession</th>
                  <th scope="col">Result</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => {
                  const textClassName = item.result === 'failed' ? 'text-danger' : 'text-success'

                  return (
                    <tr key={index}>
                      <th scope="row">{item.index}</th>
                      <td>{item.first}</td>
                      <td>{item.last}</td>
                      <td>{item.profession}</td>
                      <td className={textClassName}>{item.result}</td>
                      <td>{item.date}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default CompanyDetail
