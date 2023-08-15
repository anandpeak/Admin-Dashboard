import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { gql } from 'graphql-tag'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from 'src/context/AuthContext'
import { useForm } from 'src/utility/Hooks'
import { useMutation } from '@apollo/client'

const Login = (props) => {
  const navigate = useNavigate()
  const context = useContext(AuthContext)
  const notify = () => toast.error('Wrong password')
  const [password2, setPassword2] = useState('')
  const real = '12345678'

  // const handleLogin = () => {
  //   axios
  //     .post('http://localhost:8080/api/login', { username, password })
  //     .then((res) => {
  //       const token = res.data.token
  //     })
  //     .catch((err) => {
  //       notify()
  //       console.error('Login error:', err)
  //     })
  // }

  const LOGIN_USER = gql`
    mutation login($loginInput: LoginInput) {
      loginUser(LoginInput: $LoginInput) {
        username
        token
        password
      }
    }
  `

  function loginUserCallBack() {
    loginUser()
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
    username: ' ',
    password: ' ',
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData)
      navigate('/')
    },
    onError({ graphQLErrors }) {
      notify(graphQLErrors)
    },
    variables: { loginInput: values },
  })

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" onChange={onChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Password" onChange={onChange} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={onSubmit}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  )
}

export default Login
