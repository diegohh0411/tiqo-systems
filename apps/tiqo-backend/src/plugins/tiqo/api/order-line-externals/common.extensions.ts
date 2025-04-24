import { gql } from "graphql-tag";

export const orderLineExternalsCommonExtensions = gql`
  type OrderLineExternals {
    id: ID!

    externalId: String
    parentOrderLineId: String
    sku: String!
    name: String!
    description: String
    unitCost: Int!
    unitPrice: Int!
    totalModifierPrice: Int!
    totalPrice: Int!
    total: Int!

    amountsIncludeTax: Boolean!
    currencyCode: String!

    systemOfOrigin: SystemOfOrigin!
    hasBeenPaidFor: Boolean!
  }
`;
