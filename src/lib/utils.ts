import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function serverUrl() {
  //return "https://surprisegram2-api.vercel.app";

  return "http://localhost:5000";
}
