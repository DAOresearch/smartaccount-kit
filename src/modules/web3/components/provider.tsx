"use client";

import { PrivyProvider as _PrivyProvider } from "@privy-io/react-auth";

import type { PropsWithChildren } from "react";

const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

export function Web3Provider({ children }: PropsWithChildren) {
	if (!appId) throw new Error("Missing NEXT_PUBLIC_PRIVY_APP_ID");

	return (
		<_PrivyProvider
			appId={appId}
			config={{
				// Customize Privy's appearance in your app
				appearance: {
					theme: "light",
					accentColor: "#676FFF",
					logo: "https://your-logo-url",
				},
				// Create embedded wallets for users who don't have a wallet
				embeddedWallets: {
					createOnLogin: "all-users",
				},
			}}
		>
			{children}
		</_PrivyProvider>
	);
}
