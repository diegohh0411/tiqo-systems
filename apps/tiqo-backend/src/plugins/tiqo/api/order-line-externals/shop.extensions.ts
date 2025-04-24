import { gql } from "graphql-tag";
import { orderLineExternalsCommonExtensions } from "./common.extensions";

export const orderLineExternalsShopExtensions = gql`
  ${orderLineExternalsCommonExtensions}
`;
