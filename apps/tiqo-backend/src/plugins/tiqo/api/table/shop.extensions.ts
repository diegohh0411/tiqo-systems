import gql from "graphql-tag";
import { tableCommonExtensions } from "./common.extensions";

const extensions = gql`
  extend type Query {
    readTable(id: ID!): Table
  }
`;

export const tableShopExtensions = gql`
  ${tableCommonExtensions}
  ${extensions}
`;
