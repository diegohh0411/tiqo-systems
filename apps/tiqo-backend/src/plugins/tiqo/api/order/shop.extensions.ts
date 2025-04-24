import gql from "graphql-tag";

export const orderShopExtensions = gql`
  extend type Query {
    readOrder(code: String!): Order
  }
`;
