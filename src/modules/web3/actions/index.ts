// actions.ts
"use server";

import { cookies } from "next/headers";
import { PrivyClient } from "@privy-io/server-auth";

const privy = new PrivyClient(
	process.env.NEXT_PUBLIC_PRIVY_APP_ID || "",
	process.env.PRIVY_APP_SECRET || "",
);

export interface PrivyIdentityToken {
	sub: string; // User's Privy DID
	linked_accounts: string; // Stringified array of linked accounts
	custom_metadata: string; // Stringified custom metadata
	iss: string; // Should be 'privy.io'
	aud: string; // Your Privy app ID
	iat: number; // Issued at timestamp
	exp: number; // Expiration timestamp
}

export async function checkAuthentication() {
	// you need to await cookies in next 15
	const cookieStore = await cookies();
	const identityToken = cookieStore.get("privy-id-token");

	if (!identityToken?.value) {
		return { isAuthenticated: false };
	}

	try {
		const userClaim = await privy.verifyAuthToken(identityToken.value);
		console.log("payload", userClaim);

		return {
			isAuthenticated: true,
			userId: userClaim.userId,
		};
	} catch (error) {
		console.error("Identity token verification error:", error);
		return { isAuthenticated: false };
	}
}
