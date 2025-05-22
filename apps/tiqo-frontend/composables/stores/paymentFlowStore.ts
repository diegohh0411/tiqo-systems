import { defineStore } from "pinia";
import type { OrderFragmentFragment } from "~/codegen/gql/graphql";

export enum PaymentStages {
  SELECTING_ORDERLINES = 'SELECTING_ORDERLINES',
  SELECTING_TIP = 'SELECTING_TIP',
  VIEWING_SUMMARY = 'VIEWING_SUMMARY',
}

interface PaymentFlowState {
  order: OrderFragmentFragment | null;
  /** Each key is they ID of an orderline, where the value is the quantity selected by the user. */
  selectedQuantities: {
    [orderlineId in OrderFragmentFragment["lines"][number]["id"]]: number;
  }
  percentageOfTip: number;

  fetching: boolean;
  stage: PaymentStages;
}

export const usePaymentFlowStore = defineStore("paymentFlow", {
  state: (): PaymentFlowState => ({
    order: null,
    selectedQuantities: {},
    percentageOfTip: 0.20,
    fetching: false,
    stage: PaymentStages.SELECTING_ORDERLINES
  }),
  getters: {
    selectedOrderlines(state): OrderFragmentFragment["lines"] {
      if (!state.order) {
        return [];
      }

      return state.order.lines
        .filter((o) => state.selectedQuantities[o.id] > 0)
    },

    /** The price selected by the user before the tip. */
    priceBeforeTip(state) {
      if (!state.order || state.order.lines.length === 0) {
        return 0;
      }

      const selectedOrderlines = state.order.lines
        .filter((o) => state.selectedQuantities[o.id] > 0)

      const prices = selectedOrderlines.reduce((acc, parentOrderline) => {
        const parentPrice = (parentOrderline.linePrice * state.selectedQuantities[parentOrderline.id] / parentOrderline.quantity);

        const childrenPrices = state.order!.lines
          .filter((o) => o.customFields?.parentOrderlineId === parentOrderline.id)
          .reduce((acc, childOrderline) => {
            return acc + (childOrderline.linePrice * state.selectedQuantities[parentOrderline.id] / parentOrderline.quantity);
          }, 0);

        return acc + parentPrice + childrenPrices;
      }, 0);

      return prices
    },

    /** The amount in money of the tip. */
    priceOfTip(): number {
      return this.priceBeforeTip * this.percentageOfTip;
    },

    /** The price selected by the user after the tip. */
    priceWithTip(): number {
      return this.priceBeforeTip + this.priceOfTip;
    },

    formattedPercentageOfTip(): string {
      return `${Math.round(this.percentageOfTip * 100)}%`;
    }
  },
  actions: {
    nextStage() {
      if (this.stage === PaymentStages.SELECTING_ORDERLINES) {
        this.stage = PaymentStages.SELECTING_TIP;
      } else if (this.stage === PaymentStages.SELECTING_TIP) {
        this.stage = PaymentStages.VIEWING_SUMMARY;
      }
    },
    prevStage() {
      if (this.stage === PaymentStages.SELECTING_TIP) {
        this.stage = PaymentStages.SELECTING_ORDERLINES;
      } else if (this.stage === PaymentStages.VIEWING_SUMMARY) {
        this.stage = PaymentStages.SELECTING_TIP;
      }
    },

    doSelectOrderline(id: string, quantity: number) {
      this.selectedQuantities[id] = quantity;
    },
    getSelectedOrderline(id: string): { id: string, quantity: number, priceToCharge: number } | null {
      const orderline = this.selectedOrderlines.find(line => line.id === id);

      if (this.order && orderline) {
        const factor = this.selectedQuantities[orderline.id] / orderline.quantity;

        const orderlinePrice = (orderline.linePrice * factor);
        const childrenPrices = this.order.lines
          .filter(line => line.customFields?.parentOrderlineId === orderline.id)
          .reduce((acc, childOrderline) => {
            return acc + (childOrderline.linePrice * factor);
          }, 0);

        console.log({ childrenPrices })

        return {
          id,
          quantity: this.selectedQuantities[id],
          priceToCharge: (orderlinePrice + childrenPrices)
        };
      }

      return null;
    },
    orderlineIsSelected(id: string): boolean {
      return this.selectedQuantities[id] > 0;
    },

    setTip(percentage: number) {
      if (percentage < 0 || percentage > 1) {
        throw new Error("Tip percentage must be between 0 and 1");
      }

      this.percentageOfTip = percentage;
    }
  }
});