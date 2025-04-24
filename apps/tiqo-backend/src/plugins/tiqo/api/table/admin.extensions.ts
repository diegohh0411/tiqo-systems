import gql from "graphql-tag";
import { tableCommonExtensions } from "./common.extensions";

export const tableAdminExtensions = gql`
  ${tableCommonExtensions}

  extend type Query {
    readTable(id: ID!): Table
  }

  extend type Mutation {
    createTable(name: String!): Table!
    updateTable(id: ID!, name: String!): Table!
    deleteTable(id: ID!): Table!
    syncOrders: Boolean
  }
`;
