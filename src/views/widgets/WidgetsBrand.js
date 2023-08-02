import React from 'react'
import PropTypes from 'prop-types'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CCardText, CCardTitle } from '@coreui/react'

const WidgetsBrand = () => {
  const companys = [
    {
      name: 'MCS',
      invited: 60,
      played: 50,
      Success: 10,
      index: 1,
    },
    {
      name: 'MCS',
      invited: 60,
      played: 50,
      Success: 10,
      index: 2,
    },
    {
      name: 'MCS',
      invited: 60,
      played: 50,
      Success: 10,
      index: 2,
    },
    {
      name: 'MCS',
      invited: 60,
      played: 50,
      Success: 10,
      index: 2,
    },
  ]

  return (
    <CRow className="container-lg mb-2">
      {companys.map((item) => {
        return (
          // eslint-disable-next-line prettier/prettier
          <CCol className='d-flex justify-content-center' key={item.index} sm={6} lg={3}>
            <CCard className="mb-2" style={{ width: '17rem' }}>
              <div className="d-flex justify-content-center text-xl align-items-center">
                <CCardText>{item.name}</CCardText>
              </div>
              <CCardBody className="d-flex justify-content-between align-items-center">
                <div className="text-center">
                  <CCardText>Урьсан</CCardText>
                  <CCardText>{item.invited}</CCardText>
                </div>
                <div className="text-center">
                  <CCardText>Тоголсон</CCardText>
                  <CCardText>{item.played}</CCardText>
                </div>
                <div className="text-center">
                  <CCardText>Амжилттай</CCardText>
                  <CCardText>{item.Success}</CCardText>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        )
      })}
    </CRow>
  )
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
}

export default WidgetsBrand
