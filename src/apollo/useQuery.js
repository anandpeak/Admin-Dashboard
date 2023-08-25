import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`

export const GET_ASSESSMENT_DATA = gql`
  query GetAssessmentData($startDate: String!, $endDate: String!) {
    getAssessmentData(startDate: $startDate, endDate: $endDate) {
      dailyCompletedAssessmentCounts {
        year
        month
        day
        invitedCount
        nullCount
        completedCount
        appliedCount
        startedCount
        totalPlayerCount
      }
    }
  }
`

export const GENDER_AND_MAJOR_LEVELS_QUERY = gql`
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

export const COMPANY_QUERY = gql`
  query {
    Company {
      id
      name
      assessments {
        id
        InvitedCount
        CompletedCount
        StartedCount
        AppliedCount
        AllPlayerCount
        players {
          id
          createdDate
        }
      }
    }
  }
`

export const COMPANY_DETAIL_QUERY = gql`
  query GetCompanyDetail($id: ID!) {
    CompanyDetail(id: $id) {
      id
      companyName
      createdDate
      players {
        id
        name
        lastModifiedDate
        email
        majorLevel
        completed
      }
    }
  }
`

export const GET_PLAYER_COUNT = gql`
  query {
    GetPlayerCount
  }
`

export const GET_PLAYER_STATS = gql`
  query {
    completedPlayerCount
    companyCount
    startedPlayerCount
    AppliedPlayerCount
    invitedPlayerCount
  }
`
export const GET_ALL_PLAYER_INFO = gql`
  query {
    GetPlayerInfo {
      player_name
      player_email
      company_name
      complete_type
      last_modified_date
      created_date
    }
  }
`

export const GET_COMPLETED_PLAYER_INFO = gql`
  query {
    GetCompletedPlayerInfo {
      player_name
      player_email
      company_name
      complete_type
      last_modified_date
      created_date
    }
  }
`
export const GET_INVITED_PLAYER_INFO = gql`
  query {
    GetInvitedPlayerInfo {
      player_name
      player_email
      company_name
      complete_type
      last_modified_date
      created_date
    }
  }
`

export const GET_APPLIED_PLAYER_INFO = gql`
  query {
    GetAppliedPlayerInfo {
      player_name
      player_email
      company_name
      complete_type
      last_modified_date
      created_date
    }
  }
`

export const GET_STARTED_PLAYER_INFO = gql`
  query {
    GetStartedPlayerInfo {
      player_name
      player_email
      company_name
      complete_type
      last_modified_date
      created_date
    }
  }
`
