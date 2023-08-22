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
  query CompanyDetail($companyId: ID!) {
    CompanyDetail(id: $companyId) {
      id
      CompanyName
      Players {
        id
        createdDate
        lastName
        Name
        majorLevel
        completed
      }
    }
  }
`
