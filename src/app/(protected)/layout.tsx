import { OnlyAuthenticated } from "@/modules/web3";
import type { PropsWithChildren } from "react";

export default function ProtectedLayout({ children }: PropsWithChildren) {
	return <OnlyAuthenticated redirectUrl="/login">{children}</OnlyAuthenticated>;
}
