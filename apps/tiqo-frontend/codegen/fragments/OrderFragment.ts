import { graphql } from "~/codegen/gql";

export const OrderFragment = graphql(`
  fragment OrderFragment on Order {
    code
    updatedAt
    totalWithTax
    currencyCode
    lines {
      id
      customFields {
        extId
        extName
        extSku
        extUnitCost
        parentOrderlineId
        hasBeenPaidFor
      }
      linePrice
      quantity
    }
  }
`)