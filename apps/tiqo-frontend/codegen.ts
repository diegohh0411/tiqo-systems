import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:10000/shop-api",
  documents: ["./components/**/*.vue", "./pages/**/*.vue", "./composables/**/*.ts", "./codegen/fragments/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./codegen/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
