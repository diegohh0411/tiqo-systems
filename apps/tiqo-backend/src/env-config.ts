/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

const envSchema = z.object({
  APP_ENV: z.enum(['development', 'production', 'staging']),
  APP_PORT: z.number({ coerce: true }).min(1).max(65535).default(3000),

  SUPERADMIN_USERNAME: z.string().min(2).max(100),
  SUPERADMIN_PASSWORD: z.string().min(6).max(100),

  DATABASE_TYPE: z.enum(['better-sqlite3', 'postgres']),
  DATABASE_URL: z.string(),

  COOKIE_SECRET: z.string().min(32).max(100),

  NODE_VERSION: z.string().regex(/^\d+\.\d+\.\d+$/).default('20.19.0'),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables', env.error.format());
  throw new Error('Invalid environment variables');
}

export const { data: envConfig } = env;
