import { Hono } from "hono";
import { handle } from "hono/vercel";

import sumary from "./sumary";
import transactions from "./transactions";
import accounts from "./accounts";
import categories from "./categories";


export const runtime = "edge";

const app = new Hono().basePath("/api");


const routes = app
  .route("/sumary", sumary)
  .route("/transactions", transactions)
  .route("/accounts", accounts)
  .route("/categories", categories)


export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
