import React, { Suspense, useContext } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import Company from './views/pages/company/Company'
import CompanyDetail from './views/pages/company/CompanyDetail'
import { ProtectedRoute } from './utility/ProtectedRoute'
import { AuthContext } from './context/AuthContext'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const context = useContext(AuthContext)
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route element={<ProtectedRoute user={context.user} />}>
            <Route path="/*" element={<DefaultLayout />} />
            <Route path="/company" element={<Company />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
