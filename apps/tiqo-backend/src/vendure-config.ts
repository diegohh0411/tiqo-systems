import {
  dummyPaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig,
  UuidIdStrategy,
  DefaultLogger,
  LogLevel,
  Logger,
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

import { Request, Response, NextFunction } from "express";

Logger.info(`Vendure server running in ${envConfig.ENV} mode`);

export const config: VendureConfig = {
  apiOptions: {
    port: envConfig.PORT,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",

    middleware: [
      {
        handler: (req: Request, res: Response, next: NextFunction) => {
          console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
          next();
        },
        route: "/",
      }
    ],


    // The following options are useful in development mode,
    // but are best turned off for production for security
    // reasons.
    ...(envConfig.ENV === "development"
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

  dbConnectionOptions:
    envConfig.ENV === "development" ? {
      type: "better-sqlite3",
      synchronize: true,
      database: path.join(__dirname, "../vendure.sqlite"),
      migrations: [path.join(__dirname, "./migrations/*.+(js|ts)")],
      logging: false,
    } : {
      type: "postgres",
      synchronize: envConfig.ENV !== "production",
      ssl: { rejectUnauthorized: false },
      migrations: [path.join(__dirname, "./migrations/*.+(js|ts)")],
      logging: false,
      url: envConfig.DATABASE_URL,
    },

  entityOptions: {
    entityIdStrategy: new UuidIdStrategy(),
  },

  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },

  logger: new DefaultLogger({
    level: envConfig.ENV === "production" ? LogLevel.Info : LogLevel.Debug,
  }),
  // When adding or altering custom field definitions, the database will
  // need to be updated. See the "Migrations" section in README.md.
  customFields: {},
  plugins: [
    HardenPlugin.init({
      maxQueryComplexity: 500,
      apiMode: envConfig.ENV === "development" ? 'dev' : 'prod',
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
      port: envConfig.PORT + 2,
      adminUiConfig: {
        apiPort: envConfig.PORT,
      },
    }),
    TiqoPlugin.init({}),
  ],
};
