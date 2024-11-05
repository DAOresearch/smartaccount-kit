"use client";

import { usePrivy } from "@privy-io/react-auth";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { Copy, User, Wallet, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export const PrivyAccountCard = () => {
	const router = useRouter();
	const { toast } = useToast();
	const { user, ready, logout } = usePrivy();

	const handleLogout = async () => {
		await logout();
		router.push("/");
	};

	// Utility function for copying to clipboard
	const copyToClipboard = (text: string | undefined, label: string) => {
		if (!text) return;
		navigator.clipboard.writeText(text);
		toast({
			title: "Copied!",
			description: `${label} copied to clipboard`,
		});
	};

	if (!ready) {
		return (
			<div className="p-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
						<CardDescription>Loading your information...</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-4 w-1/2" />
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
						<CardDescription>
							View and manage your account details
						</CardDescription>
					</div>
					<Button
						variant="destructive"
						size="sm"
						className="text-sm"
						onClick={handleLogout}
					>
						Log Out
					</Button>
				</div>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* User ID Section */}
				<div className="space-y-2">
					<div className="flex items-center space-x-2">
						<User className="h-4 w-4 text-muted-foreground" />
						<span className="text-sm font-medium">User ID</span>
					</div>
					<div className="flex items-center justify-between rounded-lg border p-3">
						<code className="text-sm">{user?.id}</code>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => copyToClipboard(user?.id ?? "", "User ID")}
						>
							<Copy className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* Email Section */}
				<div className="space-y-2">
					<div className="flex items-center space-x-2">
						<Mail className="h-4 w-4 text-muted-foreground" />
						<span className="text-sm font-medium">Email Address</span>
					</div>
					<div className="flex items-center justify-between rounded-lg border p-3">
						<span className="text-sm">
							{user?.email?.address || "No email provided"}
						</span>
						{user?.email?.address && (
							<Button
								variant="ghost"
								size="sm"
								onClick={() => copyToClipboard(user?.email?.address, "Email")}
							>
								<Copy className="h-4 w-4" />
							</Button>
						)}
					</div>
				</div>

				{/* Smart Account Section */}
				<div className="space-y-2">
					<div className="flex items-center space-x-2">
						<Wallet className="h-4 w-4 text-muted-foreground" />
						<span className="text-sm font-medium">Smart Account Address</span>
					</div>
					<div className="flex items-center justify-between rounded-lg border p-3">
						<code className="text-sm">
							{user?.wallet?.address || "No smart account linked"}
						</code>
						{user?.wallet?.address && (
							<Button
								variant="ghost"
								size="sm"
								onClick={() =>
									copyToClipboard(user.wallet?.address, "Wallet address")
								}
							>
								<Copy className="h-4 w-4" />
							</Button>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
