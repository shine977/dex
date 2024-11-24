import createMiddleware from "next-intl/middleware";
import { locales } from "src/config/languages";

export default createMiddleware({
  locales: locales,
  defaultLocale: "zh-CN",
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
