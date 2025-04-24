import gql from "graphql-tag";
import { channelAdminExtensions } from "./channel/admin.extensions";
import { externalPosConfigAdminExtensions } from "./external-pos-config/admin.extensions";
import { tableAdminExtensions } from "./table/admin.extensions";
import { commonGlobalExtensions } from "./common.extensions";
import { orderLineExternalsAdminExtensions } from "./order-line-externals/admin.extensions";

export const adminExtensions = gql`
  ${commonGlobalExtensions}

  ${tableAdminExtensions}
  ${channelAdminExtensions}
  ${externalPosConfigAdminExtensions}
  ${orderLineExternalsAdminExtensions}
`;
