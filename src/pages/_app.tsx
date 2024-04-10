import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { classNames } from "@/utils/helpers";
import { Toaster } from "react-hot-toast";
import { Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import DashboardTemplate from "@/components/dashboard/DashboardTemplate";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "@/components/hoc/ErrorMessage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const bg = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Analytics />
        <Toaster toastOptions={{ className: bg.className }} />
        <main
          className={classNames(
            bg.className,
            "min-h-screen w-full flex items-center justify-start flex-col relative"
          )}
        >
          <ErrorBoundary FallbackComponent={ErrorMessage}>
            {router.pathname.includes("dashboard") ? (
              <DashboardTemplate>
                <Component {...pageProps} />
              </DashboardTemplate>
            ) : (
              <Component {...pageProps} />
            )}
          </ErrorBoundary>
        </main>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
