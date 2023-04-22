import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isEmpty(object: { [s: string]: unknown }) {
	return Object.values(object).every((x) => x === null || x === "");
}
