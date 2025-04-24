import gql from "graphql-tag";
import { externalPosConfigCommonExtensions } from "./common.extensions";

export const externalPosConfigAdminExtensions = gql`
  ${externalPosConfigCommonExtensions}

  extend type Query {
    readExternalPosConfig: ExternalPosConfig
  }

  extend type Mutation {
    createExternalPosConfig(
      posProvider: ChannelPosProvider!
      bearerToken: String!
    ): ExternalPosConfig!
    updateExternalPosConfig(
      id: ID!
      posProvider: ChannelPosProvider!
      bearerToken: String!
    ): ExternalPosConfig!
    deleteExternalPosConfig: Boolean!
  }
`;
