import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getProvider(model) {
  if (model.startsWith("de-")) {
    return "openai";
  }

  if (model.startsWith("sd-")) {
    return "stability";
  }

  return null;
}