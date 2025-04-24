import gql from "graphql-tag";

export const channelAdminExtensions = gql`
  extend type Channel {
    externalPosConfig: ExternalPosConfig
    externalSystemDummyProduct: Product
  }
`;
