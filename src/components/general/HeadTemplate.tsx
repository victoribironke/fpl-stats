import { IMAGES } from "@/constants/images";
import { HeadTemplateProps } from "@/types/general";
import Head from "next/head";

const HeadTemplate = ({ title }: HeadTemplateProps) => {
  return (
    <Head>
      <title>{title ? `${title} — FPL Stats` : "FPL Stats"}</title>
      <link rel="shortcut-icon" href={IMAGES.logo.src} type="image/x-icon" />
      <link rel="icon" href={IMAGES.logo.src} type="image/x-icon" />
      <meta
        name="description"
        content="A statistics tool for the fantasy premier league game."
      />
      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content="https://fpl-statistics.vercel.app" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="FPL Statistics" />
      <meta
        property="og:description"
        content="A statistics tool for the fantasy premier league game."
      />
      <meta property="og:image" content="/og-image.png" />
      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="fpl-statistics.vercel.app" />
      <meta
        property="twitter:url"
        content="https://fpl-statistics.vercel.app"
      />
      <meta name="twitter:title" content="FPL Statistics" />
      <meta
        name="twitter:description"
        content="A statistics tool for the fantasy premier league game."
      />
      <meta name="twitter:image" content="/og-image.png" />
    </Head>
  );
};

export default HeadTemplate;
