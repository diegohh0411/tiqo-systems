import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateSessionInput } from "../../../services/payment-handlers/adyen/adyen.dto";

@Resolver()
export class AdyenShopResolver {

  @Mutation()
  createSession(@Args("input") input: CreateSessionInput) {
    
  }
}