<template>
  <div>
    <h2>Charge</h2>
    <p>Amount:</p>
    <p>Status:</p>
  </div>
</template>

<script setup lang="ts">
  import { graphql } from "~/codegen/gql";

  tMutation(
    graphql(`
      mutation CreateSession($input: CreateSessionInput!) {
        createAdyenSession(input: $input) {
          ... on CreatePaymentResult {
            amount
            state
            transactionId
          }

          .. on CreatePaymentResultError {
            message
          }
        }
      }
    `)
  )

</script>