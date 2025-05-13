import { RuntimeVendureConfig } from "@vendure/core";

declare module "@vendure/core" {
  interface CustomUserFields {
    givenName: string;
    familyName: string;
  }
}

export const configureUserCustomFields = (config: RuntimeVendureConfig) => {
  config.customFields.User.push({
    name: "givenName",
    type: "string",
  }, {
    name: "familyName",
    type: "string",
  });
};
