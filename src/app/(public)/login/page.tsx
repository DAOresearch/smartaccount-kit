import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { LoginWithGoogle } from "@/modules/web3";
import Link from "next/link";

export default function UnauthorizedPage() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card>
				<CardHeader className="flex items-center justify-between">
					<CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
					<CardDescription>Please login to view your dashboard</CardDescription>
				</CardHeader>
				<CardFooter>
					<div className="flex space-x-2">
						<Button asChild>
							<Link href="/">Return to Home</Link>
						</Button>
						<LoginWithGoogle />
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
