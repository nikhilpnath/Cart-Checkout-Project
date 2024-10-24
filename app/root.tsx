import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Kanit&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}


export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="container bg-[#c3993cc2]">
        <h1 className="text-black">
          {error.statusText ?? "An error occured!"}
        </h1>
        <p className="my-2">{error.data ?? "Sorry Something went wrong."}</p>
        <p>
          Back to
          <Link to="/checkout" className="ml-1 underline">
            Checkout
          </Link>
        </p>
      </div>
    );
  }
  // normal error
  else if (error instanceof Error) {
    return (
      <div className="container bg-[#c3993cc2]">
        <h1 className="text-black">An error occured!</h1>
        <p className="my-2">{error.message ?? "Sorry Something went wrong."}</p>
         <p>
          Back to
          <Link to="/checkout" className="ml-1 underline">
            Checkout
          </Link>
        </p>

      </div>
    );
  } else {
    return <h1 className="text-center text-2xl mt-5">Unknown Error</h1>;
  }
}