/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrip = /* GraphQL */ `
  query GetTrip($id: ID!) {
    getTrip(id: $id) {
      id
      uid
      departureDate
      fromCity
      toCity
      createdAt
      updatedAt
    }
  }
`;
export const listTrips = /* GraphQL */ `
  query ListTrips(
    $filter: ModelTripFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrips(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        uid
        departureDate
        fromCity
        toCity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getByUid = /* GraphQL */ `
  query GetByUid(
    $uid: String
    $sortDirection: ModelSortDirection
    $filter: ModelTripFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getByUid(
      uid: $uid
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        uid
        departureDate
        fromCity
        toCity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
