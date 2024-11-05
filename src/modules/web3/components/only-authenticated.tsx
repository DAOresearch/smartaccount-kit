import { redirect } from "next/navigation";

import type { PropsWithChildren } from "react";
import { checkAuthentication } from "../actions";

interface IsAuthenticatedProps extends PropsWithChildren {
	redirectUrl?: string;
}

export async function OnlyAuthenticated({
	children,
	redirectUrl = "/login",
}: IsAuthenticatedProps) {
	try {
		const { isAuthenticated } = await checkAuthentication();

		if (!isAuthenticated) {
			console.log("User not authenticated, redirecting...");
			redirect(redirectUrl);
		}

		return <>{children}</>;
	} catch (error) {
		console.error("Error in IsAuthenticated component:", error);
		redirect(redirectUrl);
	}
}
