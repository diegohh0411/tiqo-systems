import gql from "graphql-tag";
import { tableShopExtensions } from "./table/shop.extensions";
import { commonGlobalExtensions } from "./common.extensions";
import { orderLineExternalsShopExtensions } from "./order-line-externals/shop.extensions";
import { orderShopExtensions } from "./order/shop.extensions";
import { adyenShopExtensions } from "./payment-handlers/adyen/shop.extensions";

export const shopExtensions = gql`
  ${commonGlobalExtensions}

  ${tableShopExtensions}
  ${orderLineExternalsShopExtensions}
  ${orderShopExtensions}
  ${adyenShopExtensions}
`;
