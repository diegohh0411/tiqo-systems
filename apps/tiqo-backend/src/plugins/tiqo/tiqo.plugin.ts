import { PluginCommonModule, Type, VendurePlugin } from "@vendure/core";

import { HttpModule } from "@nestjs/axios";
import { adminExtensions } from "./api/admin.schema";
import { ExternalPosConfigAdminResolver } from "./api/external-pos-config/admin.resolver";
import { shopExtensions } from "./api/shop.schema";
import { TableAdminResolver } from "./api/table/admin.resolver";
import { TableShopResolver } from "./api/table/shop.resolver";
import { TIQO_PLUGIN_OPTIONS } from "./constants";
import { ExternalPosConfig } from "./entities/external-pos-config.entity";
import { Table } from "./entities/table.entity";
import { configureChannelCustomFields } from "./global-configurations/channel.configurations";
import { configureOrderCustomFields } from "./global-configurations/order.configuration";
import { configureProductCustomFields } from "./global-configurations/product.configurations";
import { configureOrderLineCustomFields } from "./global-configurations/order-line.configurations";
import { configureProductVariantCustomFields } from "./global-configurations/product-variant.configuration";
import { TiqoChannelService } from "./services/channel/tiqo-channel.service";
import { ExternalPosConfigService } from "./services/external-pos-config/external-pos-config.service";
import { TiqoOrderService } from "./services/order/tiqo-order.service";
import { TiqoProductVariantService } from "./services/product-variant/tiqo-product-variant.service";
import { TiqoProductService } from "./services/product/tiqo-product.service";
import { TableService } from "./services/table/table.service";
import { ParrotPosAdapter } from "./services/transposer/parrot.pos-adapter.service";
import { TransposerService } from "./services/transposer/transposer.service";
import { PluginInitOptions } from "./types";
import { TiqoOrderItemPriceCalculationStrategy } from "./injectable-strategies/tiqo-order-item-price-calculation.strategy";
import { OrderShopResolver } from "./api/order/shop.resolver";

@VendurePlugin({
  imports: [PluginCommonModule, HttpModule],
  providers: [
    { provide: TIQO_PLUGIN_OPTIONS, useFactory: () => TiqoPlugin.options },
    TableService,
    TransposerService,
    TiqoOrderService,
    ParrotPosAdapter,
    TiqoProductService,
    TiqoProductVariantService,
    ExternalPosConfigService,
    TiqoChannelService,
  ],
  configuration: (config) => {
    configureOrderCustomFields(config);
    configureChannelCustomFields(config);
    configureProductCustomFields(config);
    configureProductVariantCustomFields(config);
    configureOrderLineCustomFields(config);

    /** Sets up the custom OrderItemPriceCalculationStrategy to enable synchronizing external orders and order items. */
    config.orderOptions.orderItemPriceCalculationStrategy =
      new TiqoOrderItemPriceCalculationStrategy();

    return config;
  },
  compatibility: "^3.0.0",
  entities: [Table, ExternalPosConfig],
  shopApiExtensions: {
    schema: shopExtensions,
    resolvers: [TableShopResolver, OrderShopResolver],
  },
  adminApiExtensions: {
    schema: adminExtensions,
    resolvers: [TableAdminResolver, ExternalPosConfigAdminResolver],
  },
})
export class TiqoPlugin {
  constructor() {}

  static options: PluginInitOptions;

  static init(options: PluginInitOptions): Type<TiqoPlugin> {
    TiqoPlugin.options = options;
    return TiqoPlugin;
  }
}
