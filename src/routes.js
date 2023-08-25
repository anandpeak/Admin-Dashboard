import React from 'react'

const AllPlayers = React.lazy(() => import('./views/pages/playerStatuses/AllPlayers'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CompanyDetail = React.lazy(() => import('./views/pages/company/CompanyDetail'))
const CompletedPlayers = React.lazy(() => import('./views/pages/playerStatuses/CompletedPlayers'))
const InvitedPlayers = React.lazy(() => import('./views/pages/playerStatuses/InvitedPlayers'))
const AppliedPlayers = React.lazy(() => import('./views/pages/playerStatuses/AppliedPlayers'))
const StartedPlayers = React.lazy(() => import('./views/pages/playerStatuses/StartedPlayers'))
// Base
// const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))

const routes = [
  { path: '/dashboard', exact: true, name: 'Dashboard' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/company/:id', name: 'CompanyDetail', element: CompanyDetail },
  { path: '/allPlayers', name: 'All-Players', element: AllPlayers },
  { path: '/completedPlayers', name: 'Completed-Player', element: CompletedPlayers },
  { path: '/invitedPlayers', name: 'Invited-Players', element: InvitedPlayers },
  { path: '/appliedPlayers', name: 'Applied-Players', element: AppliedPlayers },
  { path: '/startedPlayers', name: 'Started-Players', element: StartedPlayers },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
]

export default routes
