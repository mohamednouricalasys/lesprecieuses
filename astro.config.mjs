import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// =============================================================================
// CONFIGURATION VERCEL (active)
// Pour un site statique, Vercel detecte automatiquement Astro
// Pas besoin d'adaptateur pour le mode static
// =============================================================================
// export default defineConfig({
//   integrations: [tailwind()],
//   site: "https://lesprecieuses.vercel.app",
//   output: "static",
//   trailingSlash: "ignore",
//   i18n: {
//     defaultLocale: "fr",
//     locales: ["fr"],
//     routing: { prefixDefaultLocale: false },
//   },
// });

// =============================================================================
// CONFIGURATION NOUSAVONSDESELLES.FR (sous-dossier)
// Decommenter cette section et commenter la section Vercel ci-dessus
// pour deployer sur nousavonsdeselles.fr/les-precieuses
// =============================================================================
export default defineConfig({
  integrations: [tailwind()],
  site: "https://nousavonsdeselles.fr",
  base: "/les-precieuses",
  trailingSlash: "ignore",
  output: "static",
  i18n: {
    defaultLocale: "fr",
    locales: ["fr"],
    routing: { prefixDefaultLocale: false },
  },
});

