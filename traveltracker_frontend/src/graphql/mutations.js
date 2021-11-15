/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTrip = /* GraphQL */ `
  mutation CreateTrip(
    $input: CreateTripInput!
    $condition: ModelTripConditionInput
  ) {
    createTrip(input: $input, condition: $condition) {
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
export const updateTrip = /* GraphQL */ `
  mutation UpdateTrip(
    $input: UpdateTripInput!
    $condition: ModelTripConditionInput
  ) {
    updateTrip(input: $input, condition: $condition) {
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
export const deleteTrip = /* GraphQL */ `
  mutation DeleteTrip(
    $input: DeleteTripInput!
    $condition: ModelTripConditionInput
  ) {
    deleteTrip(input: $input, condition: $condition) {
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
