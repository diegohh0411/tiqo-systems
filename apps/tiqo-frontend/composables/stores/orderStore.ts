import { defineStore } from "pinia";
import type { OrderFragmentFragment } from "~/codegen/gql/graphql";

export const useOrderStore = defineStore("order", {
  state: (): { order: OrderFragmentFragment | null, loading: boolean } => ({
    order: null,
    loading: false
  }),
  actions: {
    setOrder(order: OrderFragmentFragment) {
      this.order = order;
    },
  }
})

export const useSelectedOrderLines = defineStore("selectedOrderLines", {
  state: (): {
    items: {
      selectedQuantity: number,
      id: string;
    }[]
  } => ({
    items: []
  }),
  getters: {
    selectedTotalPrice: (state) => {
      const order = useOrderStore().order;
      if (order === null) {
        return 0
      }

      return state.items.reduce((acc, selectedLine) => {
        const currentOrderline = order.lines.find(l => l.id === selectedLine.id);
        const childrenOrderlines = order.lines.filter(l => l.customFields?.parentOrderlineId === selectedLine.id);

        const childrenOrderlinesTotal = childrenOrderlines.reduce((acc, childLine) => {
          return acc + (childLine.linePrice * selectedLine.selectedQuantity);
        }, 0);

        if (currentOrderline) {
          return acc
            + (currentOrderline.linePrice * selectedLine.selectedQuantity)
            + (childrenOrderlinesTotal / currentOrderline.quantity) * selectedLine.selectedQuantity;
        }

        return acc;
      }, 0);
    }
  },
  actions: {
    addSelectedOrderline(id: string, selectedQuantity: number) {
      const existingLine = this.items.find(line => line.id === id);
      if (existingLine) {
        existingLine.selectedQuantity = selectedQuantity;
      } else {
        this.items.push({ id, selectedQuantity });
      }
    }
  }
});