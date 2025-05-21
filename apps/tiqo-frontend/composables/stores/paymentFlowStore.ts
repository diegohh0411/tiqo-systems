import { defineStore } from "pinia";
import type { OrderFragmentFragment } from "~/codegen/gql/graphql";

export enum PaymentStages {
  SELECTING_ORDERLINES = 'SELECTING_ORDERLINES',
  SELECTING_TIP = 'SELECTING_TIP',
}

interface PaymentFlowState {
  order: OrderFragmentFragment | null;
  /** The quantity selected per orderline */
  selectedQuantities: {
    [orderlineId in OrderFragmentFragment["lines"][number]["id"]]: number;
  }
  selectedTipPercentage: number | undefined;
  loading: boolean;
  stage: PaymentStages;
}

export const usePaymentFlowStore = defineStore("paymentFlow", {
  state: (): PaymentFlowState => ({
    order: null,
    selectedQuantities: {},
    selectedTipPercentage: undefined,
    loading: false,
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
    selectedPrice(state) {
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
  },
  actions: {
    nextStage() {
      if (this.stage === PaymentStages.SELECTING_ORDERLINES) {
        this.stage = PaymentStages.SELECTING_TIP;
      }
    },
    prevStage() {
      if (this.stage === PaymentStages.SELECTING_TIP) {
        this.stage = PaymentStages.SELECTING_ORDERLINES;
      }
    },

    doSelectOrderline(id: string, quantity: number) {
      this.selectedQuantities[id] = quantity;
    },
    getSelectedOrderline(id: string): { id: string, quantity: number } | null {
      if (this.selectedQuantities[id] > 0) {
        return {
          id,
          quantity: this.selectedQuantities[id]
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

      this.selectedTipPercentage = percentage;
    }
  }
});