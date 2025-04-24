import gql from "graphql-tag";
import { ChannelPosProvider } from "../../entities/external-pos-config.entity";
import { generateGraphqlEnum } from "../common.extensions";

export const externalPosConfigCommonExtensions = gql`
  enum ChannelPosProvider {
    ${generateGraphqlEnum(ChannelPosProvider)}
  }

  type ExternalPosConfig {
    id: ID!
    posProvider: ChannelPosProvider!
    bearerToken: String
  }
`;
