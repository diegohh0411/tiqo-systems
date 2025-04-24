import { Product, RuntimeVendureConfig } from "@vendure/core";
import { ExternalPosConfig } from "../entities/external-pos-config.entity";

declare module "@vendure/core" {
  interface CustomChannelFields {
    externalPosConfig: ExternalPosConfig | null;
    externalSystemDummyProduct: Product | null;
    displayName: string | null;
    profilePictureUrl: string | null;
    pdfMenuUrl: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
  }
}

export const configureChannelCustomFields = (config: RuntimeVendureConfig) => {
  config.customFields.Channel.push(
    {
      name: "externalPosConfig",
      type: "relation",
      entity: ExternalPosConfig,
      list: false,
      nullable: true,
      defaultValue: null,
      public: false,
    },
    {
      name: "externalSystemDummyProduct",
      type: "relation",
      entity: Product,
      list: false,
      nullable: true,
      defaultValue: null,
      public: false,
    },
    {
      name: "displayName",
      type: "string",
      nullable: true,
    },
    {
      name: "profilePictureUrl",
      type: "string",
      nullable: true,
    },
    {
      name: "pdfMenuUrl",
      type: "string",
      nullable: true,
    },
    {
      name: "primaryColor",
      type: "string",
      nullable: true,
    },
    {
      name: "secondaryColor",
      type: "string",
      nullable: true,
    },
  );
};
