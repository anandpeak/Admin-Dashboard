import React from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import Company from '../pages/company/Company'
import { gql, useQuery } from '@apollo/client'

const GENDER_AND_MAJOR_LEVELS_QUERY = gql`
  query {
    distinctGendersAndMajorLevels {
      genders {
        gender
        count
      }
      majorLevels {
        majorLevel
        count
      }
    }
  }
`

const Dashboard = () => {
  const progressGroupExample1 = [
    { title: 'Даваа', value1: 34, value2: 78 },
    { title: 'Мягмар', value1: 56, value2: 94 },
    { title: 'Лхагва', value1: 12, value2: 67 },
    { title: 'Пүрэв', value1: 43, value2: 91 },
    { title: 'Баасан', value1: 22, value2: 73 },
    { title: 'Бямба', value1: 53, value2: 82 },
    { title: 'Ням', value1: 9, value2: 69 },
  ]

  const progressGroupExample3 = [
    { title: 'Дээд удирдлага', percent: 56, value: '191,235' },
    { title: 'Дунд шатны удирдлага', percent: 15, value: '51,223' },
    { title: 'Ажилтан', percent: 11, value: '37,564' },
    { title: 'Оюутан', percent: 8, value: '27,319' },
  ]

  const { loading, error, data } = useQuery(GENDER_AND_MAJOR_LEVELS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const genders = data.distinctGendersAndMajorLevels.genders
  const majorLevels = data.distinctGendersAndMajorLevels.majorLevels
  console.log('majorlevel = ', majorLevels)
  const totalCount = genders.reduce((total, gender) => total + gender.count, 0)

  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Жил, Сар, Өдөр тутмын өсөлтийг харуулсан үзүүлэлт
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                {['Day', 'Week', 'Month'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChart
            type="line"
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'Урьсан',
                  backgroundColor: 'rgba(151, 187, 205, 0.2)',
                  borderColor: 'rgba(0, 255, 0, 1)',
                  pointBackgroundColor: 'rgba(0, 255, 0, 1)',
                  pointBorderColor: '#fff',
                  data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                },
                {
                  label: 'Амжилттай',
                  backgroundColor: 'rgba(151, 187, 205, 0.2)',
                  borderColor: 'rgba(0, 0, 255, 1)',
                  pointBackgroundColor: 'rgba(0, 0, 255, 1)',
                  pointBorderColor: '#fff',
                  data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
                },
                {
                  label: 'Хариу нь гараагүй',
                  backgroundColor: 'rgba(151, 187, 205, 0.2)',
                  borderColor: 'rgba(255, 0, 0, 1)',
                  pointBackgroundColor: 'rgba(255, 0, 0, 1)',
                  pointBorderColor: '#fff',
                  data: [20, 32, 58, 49, 17, 25, 13, 16, 25],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: getStyle('--cui-body-color'),
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    color: getStyle('--cui-border-color-translucent'),
                  },
                  ticks: {
                    color: getStyle('--cui-body-color'),
                  },
                },
                y: {
                  grid: {
                    color: getStyle('--cui-border-color-translucent'),
                  },
                  ticks: {
                    color: getStyle('--cui-body-color'),
                  },
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
      <WidgetsBrand withCharts />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Өдөр тутмын үзүүлэлт</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">
                          Нийт тоглосон хүмүүсийн тоо
                        </div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">
                          Өнөөдрийн нийт тоглосон хүмүүсийн тоо
                        </div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value1} />
                        <CProgress thin color="success" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">
                          Хариу нь гарсан хүмүүсийн тоо
                        </div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">
                          Хариу нь гараагүй хүмүүсийн тоо
                        </div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {genders.map((item, index) => {
                    const percent = (item.count / totalCount) * 100
                    return (
                      <div className="progress-group" key={index}>
                        <div className="progress-group-header">
                          <span>{item.gender}</span>
                          <span className="ms-auto fw-semibold">
                            {item.count}{' '}
                            <span className="text-medium-emphasis small">
                              ({percent.toFixed(2)}%)
                            </span>
                          </span>
                        </div>
                        <div className="progress-group-bars">
                          <CProgress thin color="warning" value={percent} />
                        </div>
                      </div>
                    )
                  })}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />

              <Company />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
