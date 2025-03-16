import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Profile } from "./server/db/schema";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatName(profile: Profile) {
	let fullName = profile.firstName;

	if (profile.middleName) fullName += ` ${profile.middleName}`;
	if (profile.lastName) fullName += ` ${profile.lastName}`;

	return fullName;
}
