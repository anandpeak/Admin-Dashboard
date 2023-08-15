import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CompanyDetail = React.lazy(() => import('./views/pages/company/CompanyDetail'))

// Base
// const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))

const routes = [
  { path: '/dashboard', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/company/:id', name: 'CompanyDetail', element: CompanyDetail },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
]

export default routes
