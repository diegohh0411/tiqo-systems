import gql from "graphql-tag";

export const tableCommonExtensions = gql`
  extend type Order {
    placedAt: Table
  }

  type Table {
    id: ID!
    code: String!
    name: String!

    orders: [Order]!
  }

  extend type Query {
    readTables: [Table]!
  }
`;
