import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export const sql = neon(process.env.DATABASE_URLL!);
export const db = drizzle(sql);

