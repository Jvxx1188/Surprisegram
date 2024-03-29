import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function serverUrl() {
  // console.log(process.env.SERVER)

  return process.env.SERVER || 'undefined';

  // return "http://localhost:5000";
}
