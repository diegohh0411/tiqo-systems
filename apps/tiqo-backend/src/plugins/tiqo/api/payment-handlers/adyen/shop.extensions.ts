import { gql } from "graphql-tag";

export const adyenShopExtensions = gql`
  input CreateSessionInput {
    orderCode: String!
    selectedOrderlines: JSON!
    tipPercentage: Float!
    expectedChargeAmount: Float!
  }

  extend type Mutation {
    createAdyenSession(input: CreateSessionInput!): JSON
  }
`