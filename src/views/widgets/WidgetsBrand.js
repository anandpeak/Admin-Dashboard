import React from 'react'
import PropTypes from 'prop-types'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import { LAST_CREATED_COMPANYS } from 'src/apollo/useQuery'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
const WidgetsBrand = () => {
  const { loading, error, data } = useQuery(LAST_CREATED_COMPANYS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error?.message}</p>
  const companys = data.LastCreatedCompanys
  return (
    <CCard className="mb-4">
      <CCardHeader>Сүүлд бүртгүүлсэн компаниуд</CCardHeader>
      <CCardBody>
        <CRow className="container-lg mt-2 mb-2">
          {companys.map((item) => (
            <CCol className="d-flex mb-2 justify-content-center" key={item.id} sm={6} lg={3}>
              <CCard className="mb-2" style={{ width: '17rem' }}>
                <div className="d-flex justify-content-center text-xl align-items-center">
                  <Link to={`/company/${item.ID}`}>
                    <CCardText>{item.name}</CCardText>
                  </Link>
                </div>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </CCardBody>
    </CCard>
  )
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
}

export default WidgetsBrand
