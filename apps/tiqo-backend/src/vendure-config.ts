import {
  dummyPaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig,
  UuidIdStrategy,
  DefaultLogger,
  LogLevel,
} from "@vendure/core";
import {
  defaultEmailHandlers,
  EmailPlugin,
  FileBasedTemplateLoader,
} from "@vendure/email-plugin";
import { AssetServerPlugin } from "@vendure/asset-server-plugin";
import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import { HardenPlugin } from "@vendure/harden-plugin";
import "dotenv/config";
import path from "path";
import { TiqoPlugin } from "./plugins/tiqo/tiqo.plugin";
import { envConfig } from "./env-config";

export const config: VendureConfig = {
  apiOptions: {
    port: envConfig.APP_PORT,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",


    // The following options are useful in development mode,
    // but are best turned off for production for security
    // reasons.
    ...(envConfig.APP_ENV === "development"
      ? {
        adminApiPlayground: {
          settings: { "request.credentials": "include" },
        },
        adminApiDebug: true,
        shopApiPlayground: {
          settings: { "request.credentials": "include" },
        },
        shopApiDebug: true,
      } : {}),
  },
  authOptions: {
    tokenMethod: ["cookie"],
    superadminCredentials: {
      identifier: envConfig.SUPERADMIN_USERNAME,
      password: envConfig.SUPERADMIN_PASSWORD,
    },
    cookieOptions: {
      secret: envConfig.COOKIE_SECRET,
    },
  },
  /**
  dbConnectionOptions: {
    type: "postgres",
    // See the README.md "Migrations" section for an explanation of
    // the `synchronize` and `migrations` options.
    url: envConfig.DB_URL,
    ssl: true,

    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*.+(js|ts)")],
    logging: false,
    database: "vendure",
  },*/

  dbConnectionOptions: {
    type: envConfig.DATABASE_TYPE,
    // See the README.md "Migrations" section for an explanation of
    // the `synchronize` and `migrations` options.
    synchronize: envConfig.APP_ENV === "development",
    migrations: [path.join(__dirname, "./migrations/*.+(js|ts)")],
    logging: false,
    database: envConfig.DATABASE_URL,
  },

  entityOptions: {
    entityIdStrategy: new UuidIdStrategy(),
  },

  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },

  logger: new DefaultLogger({
    level: envConfig.APP_ENV === "development" ? LogLevel.Debug : LogLevel.Error,
  }),
  // When adding or altering custom field definitions, the database will
  // need to be updated. See the "Migrations" section in README.md.
  customFields: {},
  plugins: [
    HardenPlugin.init({
      maxQueryComplexity: 500,
      apiMode: envConfig.APP_ENV === "development" ? 'dev' : 'prod',
    }),
    AssetServerPlugin.init({
      route: "assets",
      assetUploadDir: path.join(__dirname, "../static/assets"),
      // For local dev, the correct value for assetUrlPrefix should
      // be guessed correctly, but for production it will usually need
      // to be set manually to match your production url.
      // assetUrlPrefix: envConfig.APP_ENV === "development" ? undefined : "https://www.my-shop.com/assets/",
    }),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    EmailPlugin.init({
      devMode: true,
      outputPath: path.join(__dirname, "../static/email/test-emails"),
      route: "mailbox",

      handlers: defaultEmailHandlers,
      templateLoader: new FileBasedTemplateLoader(
        path.join(__dirname, "../static/email/templates"),
      ),
      globalTemplateVars: {
        // The following variables will change depending on your storefront implementation.
        // Here we are assuming a storefront running at http://localhost:8080.
        fromAddress: '"example" <noreply@example.com>',
        verifyEmailAddressUrl: "http://localhost:8080/verify",
        passwordResetUrl: "http://localhost:8080/password-reset",
        changeEmailAddressUrl:
          "http://localhost:8080/verify-email-address-change",
      },
    }),
    AdminUiPlugin.init({
      route: "admin",
      port: envConfig.APP_PORT + 2,
      adminUiConfig: {
        apiPort: envConfig.APP_PORT,
      },
    }),
    TiqoPlugin.init({}),
  ],
};
