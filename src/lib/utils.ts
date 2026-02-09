import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { fr, enUS } from "date-fns/locale"
import i18n from "../i18n"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const locales: Record<string, Locale> = {
  fr: fr,
  en: enUS,
}

/**
 * Format a date based on current i18n locale
 * French: "Le 2 janvier à 14h20"
 * English: "January 2 at 2:20 PM"
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date
  const currentLocale = i18n.language || "en"
  const locale = locales[currentLocale] || enUS
  
  if (currentLocale === "fr") {
    return format(d, "'Le' d MMMM 'à' HH'h'mm", { locale })
  }
  return format(d, "MMMM d 'at' h:mm a", { locale })
}
