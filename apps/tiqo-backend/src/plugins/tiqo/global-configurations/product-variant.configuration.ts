import { RuntimeVendureConfig } from "@vendure/core";

declare module "@vendure/core" {
  interface CustomProductVariantFields {
    isExternalSystemDummyProductVariant: boolean;
  }
}

export const configureProductVariantCustomFields = (
  config: RuntimeVendureConfig,
) => {
  config.customFields.ProductVariant.push({
    name: "isExternalSystemDummyProductVariant",
    type: "boolean",
    defaultValue: false,
    public: true,
  });
};
