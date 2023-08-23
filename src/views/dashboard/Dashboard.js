import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CProgress, CRow } from '@coreui/react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import Company from '../pages/company/Company'
import { useQuery } from '@apollo/client'
import { AsssesmentChart } from '../charts/AssessmentChart'
import { GENDER_AND_MAJOR_LEVELS_QUERY } from '../../apollo/useQuery'
import { HashLoader } from 'react-spinners'

const Dashboard = () => {
  const { loading, error, data } = useQuery(GENDER_AND_MAJOR_LEVELS_QUERY)

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HashLoader color="#f59a8c" size={100} />
      </div>
    )
  if (error) return <p>Error: {error.message}</p>

  const genders = data.distinctGendersAndMajorLevels.genders
  const majorLevels = data.distinctGendersAndMajorLevels.majorLevels
  const totalCount = genders.reduce((total, gender) => total + gender.count, 0)

  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                График
              </h4>
              <div className="small text-medium-emphasis mt-3">Өдрөө сонгоно уу</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <AsssesmentChart />
        </CCardBody>
      </CCard>
      {/* <WidgetsBrand withCharts /> */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Statistic</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  {majorLevels.map((item, index) => {
                    const percent = (item.count / totalCount) * 100
                    return (
                      item.majorLevel !== '' && (
                        <div className="progress-group" key={index}>
                          <div className="progress-group-header">
                            <span>{item.majorLevel}</span>
                            <span className="ms-auto fw-semibold">
                              {item.count}
                              <span className="text-medium-emphasis small">
                                ({percent.toFixed(2)}%)
                              </span>
                            </span>
                          </div>
                          <div className="progress-group-bars">
                            <CProgress thin color="success" value={percent} />
                          </div>
                        </div>
                      )
                    )
                  })}
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  {genders.map((item, index) => {
                    const percent = (item.count / totalCount) * 100
                    return (
                      item.gender !== '' && (
                        <div className="progress-group" key={index}>
                          <div className="progress-group-header">
                            <span>{item.gender}</span>
                            <span className="ms-auto fw-semibold">
                              {item.count}
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
                    )
                  })}
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
