import { ID, RuntimeVendureConfig } from "@vendure/core";
import { SystemOfOrigin } from "./order.configuration";

declare module "@vendure/core" {
  interface CustomOrderLineFields {
    hasBeenPaidFor: boolean;
    extId: string | null;
    extSku: string | null;
    extName: string | null;
    extUnitCost: number | null;
    extUnitPrice: number | null;
    extTotalModifierPrice: number | null;
    extTotalPrice: number | null;
    extTotal: number | null;
    extAmountsIncludeTax: boolean | null;
    extCurrencyCode: string | null;
    extSystemOfOrigin: SystemOfOrigin | null;

    parentOrderlineId?: ID | null;
  }
}

export const configureOrderLineCustomFields = (
  config: RuntimeVendureConfig,
) => {
  config.customFields.OrderLine.push(
    {
      name: "hasBeenPaidFor",
      type: "boolean",
      defaultValue: false,
      nullable: false,
    },
    {
      name: "extId",
      type: "string",
      nullable: true,
    },
    {
      name: "extSku",
      type: "string",
      nullable: true,
    },
    {
      name: "extName",
      type: "string",
      nullable: true,
    },
    {
      name: "extUnitCost",
      type: "int",
      nullable: true,
    },
    {
      name: "extUnitPrice",
      type: "int",
      nullable: true,
    },
    {
      name: "extTotalModifierPrice",
      type: "int",
      nullable: true,
    },
    {
      name: "extTotalPrice",
      type: "int",
      nullable: true,
    },
    {
      name: "extTotal",
      type: "int",
      nullable: true,
    },
    {
      name: "extAmountsIncludeTax",
      type: "boolean",
      nullable: true,
    },
    {
      name: "extCurrencyCode",
      type: "string",
      nullable: true,
    },
    {
      name: "extSystemOfOrigin",
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
    {
      name: "parentOrderlineId",
      type: "string",
      nullable: true,
    },
  );
};
