import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from 'src/context/AuthContext'
import { useForm } from 'src/utility/Hooks'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from 'src/apollo/useQuery'
import { HashLoader } from 'react-spinners'

const Login = (props) => {
  const navigate = useNavigate()
  const context = useContext(AuthContext)
  const notify = () => toast.error('Wrong password')

  function loginUserCallBack() {
    loginUser()
  }

  let { onChange, onSubmit, values } = useForm(loginUserCallBack, {
    username: ' ',
    password: ' ',
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: token } }) {
      context.login(token)
      toast.success('Successfully login')
      navigate('/dashboard')
    },
    onError({ graphQLErrors }) {
      notify(graphQLErrors)
    },
    variables: { username: values.username, password: values.password },
  })

  if (loading)
    return (
      <div>
        <div className="min-h-screen flex items-center justify-center">
          <HashLoader color="#f59a8c" size={100} />
        </div>
      </div>
    )

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
                      <CFormInput placeholder="Username" onChange={onChange} name="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={onChange}
                      />
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
