import { RuntimeVendureConfig } from "@vendure/core";

declare module "@vendure/core" {
  interface CustomProductFields {
    isExternalSystemDummyProduct: boolean;
  }
}

export const configureProductCustomFields = (config: RuntimeVendureConfig) => {
  config.customFields.Product.push({
    name: "isExternalSystemDummyProduct",
    type: "boolean",
    defaultValue: false,
    public: true,
  });
};
