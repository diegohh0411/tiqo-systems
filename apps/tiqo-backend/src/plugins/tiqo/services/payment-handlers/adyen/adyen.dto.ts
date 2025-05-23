import { ID } from "@vendure/core";

export interface CreateSessionInput {
  orderCode: string;
  selectedQuantities: {
    [orderlineId: ID]: number;
  };
  tipPercentage: number;
  expectedChargeAmount: number;
}