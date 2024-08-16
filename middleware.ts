import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/",
]);


export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth().protect();

    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Ignore os internos do Next.js e todos os arquivos estáticos, a menos que sejam encontrados nos parâmetros de pesquisa
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Sempre execute para rotas de API
    "/(api|trpc)(.*)",
  ],
};
