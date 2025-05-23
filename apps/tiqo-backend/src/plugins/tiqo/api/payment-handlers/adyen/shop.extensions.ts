import { gql } from "graphql-tag";

export const adyenShopExtensions = gql`
  type CreateSessionInput {
    orderCode: String!
    selectedOrderlines: {
      id: String!
      quantity: Int!
    }
    tipPercentage: Float!
    expectedChargeAmount: Float!
  }
`