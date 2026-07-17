import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { StoreProvider } from "@/lib/store";
import { Loader } from "@/components/site/Loader";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VerdantVessel — Luxury Packaging Manufacturing" },
      { name: "description", content: "Premium manufacturer of glass, PET, aluminum and cosmetic packaging. Vessels engineered for the world's most demanding brands." },
      { name: "author", content: "VerdantVessel" },
      { property: "og:title", content: "VerdantVessel — Luxury Packaging Manufacturing" },
      { property: "og:description", content: "Premium manufacturer of glass, PET, aluminum and cosmetic packaging. Vessels engineered for the world's most demanding brands." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "VerdantVessel — Luxury Packaging Manufacturing" },
      { name: "twitter:description", content: "Premium manufacturer of glass, PET, aluminum and cosmetic packaging. Vessels engineered for the world's most demanding brands." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7019beb2-27f3-4ded-95c5-b686e9ac03d1/id-preview-d8f9a2d5--99e2122b-c60a-4cc2-b4d9-63deabe479dd.lovable.app-1784205797912.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7019beb2-27f3-4ded-95c5-b686e9ac03d1/id-preview-d8f9a2d5--99e2122b-c60a-4cc2-b4d9-63deabe479dd.lovable.app-1784205797912.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Inter+Tight:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const href = useRouterState({ select: (s) => s.location.href });
  const [loading, setLoading] = useState(true);
  const prevHref = useRef(href);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    // Dismiss initial load
    timer.current = setTimeout(() => setLoading(false), 1200);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  useEffect(() => {
    if (href !== prevHref.current) {
      prevHref.current = href;
      setLoading(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setLoading(false), 600);
    }
  }, [href]);

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Loader visible={loading} />
        <Outlet />
      </StoreProvider>
    </QueryClientProvider>
  );
}
