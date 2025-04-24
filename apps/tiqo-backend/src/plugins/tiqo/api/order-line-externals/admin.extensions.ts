import { gql } from "graphql-tag";
import { orderLineExternalsCommonExtensions } from "./common.extensions";

export const orderLineExternalsAdminExtensions = gql`
  ${orderLineExternalsCommonExtensions}
`;
