import { gql } from "graphql-tag";

export const adyenShopExtensions = gql`
  input CreateSessionInput {
    orderCode: String!
    selectedQuantities: JSON!
    tipPercentage: Float!
    expectedChargeAmount: Float!
  }

  extend type Mutation {
    createAdyenSession(input: CreateSessionInput!): JSON
  }
`