import { RuntimeVendureConfig } from "@vendure/core";
import { Table } from "../entities/table.entity";

export enum SystemOfOrigin {
  PARROT = "PARROT_POS",
  TIQO = "TIQO_COMMERCE",
}

declare module "@vendure/core" {
  interface CustomOrderFields {
    externalId?: string;
    placedAt?: Table;
    arrangingPaymentAt?: Table;
    systemOfOrigin: SystemOfOrigin;
  }
}

export const configureOrderCustomFields = (config: RuntimeVendureConfig) => {
  config.customFields.Order.push(
    {
      name: "externalId",
      type: "string",
      nullable: true,
    },
    {
      name: "placedAt",
      type: "relation",
      entity: Table,
      list: false,
      nullable: true,
    },
    {
      name: "systemOfOrigin",
      type: "string",
      options: [
        {
          value: SystemOfOrigin.PARROT,
        },
        {
          value: SystemOfOrigin.TIQO,
        },
      ],
    },
  );
};
