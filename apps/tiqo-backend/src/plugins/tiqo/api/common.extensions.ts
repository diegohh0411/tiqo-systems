import { gql } from "graphql-tag";
import { SystemOfOrigin } from "../global-configurations/order.configuration";

export const generateGraphqlEnum = (enumObj: Record<string, string>) => {
  return Object.values(enumObj).join("\n    ");
};

export const commonGlobalExtensions = gql`
  enum SystemOfOrigin {
    ${generateGraphqlEnum(SystemOfOrigin)}
  }
`;
