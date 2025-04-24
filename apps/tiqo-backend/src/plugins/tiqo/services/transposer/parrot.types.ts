export interface ParrotPagination {
  next: number | null;
  previous: number | null;
  count: number;
}

export interface ParrotOrder {
  orderDiscount: number | null;
  createdAt: number;
  uuid: string;
  status: "FINISHED" | "PENDING" | "CANCELLED";
  provider: "PARROT" | "UBER_EATS" | "RAPPI" | "DIDI_FOOD";
  storeUuid: string;
  storeName: string;
  providerOrderId: string | null;
  orderType: "DINE_IN" | "DELIVERY" | "TAKEOUT";
  orderTypeNameUuid: string | null;
  orderTypeName: string | null;
  totalPrice: number;
  total: number;
  brandName: string;
  invoicingCode: string;
  invoicingExpiresAt: number;
  totalDiscounts: number;
  totalServiceCharges: number;
  tableUuid: string | null;
  tableName: string | null;
  customersCount: number;
  orderReference: string;
  totalTaxes: number;
  finishedAt: number;
}

export interface ParrotOrderItem {
  createdAt: string;
  storeUuid: string;
  storeName: string;
  provider: string;
  brandName: string;
  orderUuid: string;
  orderTypeUuid: string;
  orderTypeName: string;
  orderReference: string;
  sku: string;
  productType: string | null;
  uuid: string;
  itemName: string;
  itemType: "PRODUCT" | "ADD_ON";
  parentUuid: string | null;
  quantity: number;
  unitCost: number;
  unitPrice: number;
  totalPrice: number;
  totalModifierPrice: number;
  currencyCode: string;
  discount: number | null;
  total: number;
  itemStatus: "ACTIVE" | "CANCELLED";
  categoryUuid: string | null;
  categoryName: string | null;
}

export interface ListOrdersResponse {
  pagination: ParrotPagination;
  data: ParrotOrder[];
  datetime: string;
}

export interface ListOrderItemsResponse {
  pagination: ParrotPagination;
  data: ParrotOrderItem[];
  datetime: string;
}

export interface ListOrdersQueryParams {
  startTimestamp?: string;
  endTimestamp?: string;
  page?: number;
  limit?: number;
}

export interface ListOrderItemsQueryParams {
  startTimestamp?: string;
  endTimestamp?: string;
  page?: number;
  limit?: number;
}
