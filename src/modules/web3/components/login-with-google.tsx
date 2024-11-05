"use client";

import { Button } from "@/components/ui/button";
import { useLoginWithOAuth, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

export function LoginWithGoogle() {
	const router = useRouter();
	const { initOAuth, loading } = useLoginWithOAuth();
	const { authenticated, logout, ready } = usePrivy();

	if (ready && authenticated) {
		router.push("/dashboard");
	}

	const handleAuth = async () => {
		try {
			// If the user is already authenticated, log them out
			if (authenticated) await logout();
			// If not already authenticated, initiate the login process
			await initOAuth({ provider: "google" });
		} catch (err) {
			alert((err as Error).message || err);
		}
	};

	return (
		<Button type="button" onClick={handleAuth} disabled={loading}>
			{authenticated ? "Disconnect Google" : "Continue with Google"}
		</Button>
	);
}
