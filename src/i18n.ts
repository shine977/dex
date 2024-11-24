import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./config/languages";

export default getRequestConfig(async ({ locale }) => {
  // 验证请求的语言是否支持
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../public/locales/${locale}.json`)).default,
  };
});
