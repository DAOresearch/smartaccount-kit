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

import { cn } from "@/lib/utils";
import { Wallet, Mail, Phone, MessageCircle } from "lucide-react";
import {
	FaGithub,
	FaXTwitter,
	FaDiscord,
	FaApple,
	FaGoogle,
	FaSpotify,
	FaInstagram,
	FaTelegram,
} from "react-icons/fa6";

// Types
interface LinkedAccount {
	type: string;
	isLinked: boolean;
	value?: string | null;
	icon: React.ComponentType<{ className?: string }>;
}

// Account Item Component
interface LinkedAccountItemProps {
	account: LinkedAccount;
	onLink: (accountType: string) => void;
}

const LinkedAccountItem = ({ account, onLink }: LinkedAccountItemProps) => {
	const Icon = account.icon;

	return (
		<div className="flex items-center justify-between p-3 rounded-lg border">
			<div className="flex items-center space-x-3">
				<Icon
					className={cn(
						"h-5 w-5",
						account.isLinked ? "text-primary" : "text-muted-foreground",
					)}
				/>
				<div className="space-y-1">
					<p className="text-sm font-medium">{account.type}</p>
					{account.isLinked && account.value && (
						<p className="text-xs text-muted-foreground truncate max-w-[200px]">
							{account.value}
						</p>
					)}
				</div>
			</div>
			<Button
				variant={account.isLinked ? "secondary" : "default"}
				size="sm"
				onClick={() => onLink(account.type.toLowerCase())}
			>
				{account.isLinked ? "Linked" : "Link"}
			</Button>
		</div>
	);
};

export function LinkPrivyAccountsCard() {
	const {
		user,
		ready,
		linkEmail,
		linkPhone,
		linkWallet,
		linkGoogle,
		linkApple,
		linkDiscord,
		linkGithub,
		linkTwitter,
		linkSpotify,
		linkInstagram,
		linkTelegram,
		linkFarcaster,
	} = usePrivy();

	// Utility function to get account statuses
	const getAccountStatus = (): LinkedAccount[] => {
		return [
			{
				type: "Email",
				isLinked: !!user?.email,
				value: user?.email?.address,
				icon: Mail,
			},
			{
				type: "Phone",
				isLinked: !!user?.phone,
				value: user?.phone?.number,
				icon: Phone,
			},
			{
				type: "Wallet",
				isLinked: !!user?.wallet,
				value: user?.wallet?.address,
				icon: Wallet,
			},
			{
				type: "GitHub",
				isLinked: !!user?.github,
				value: user?.github?.username,
				icon: FaGithub,
			},
			{
				type: "Twitter",
				isLinked: !!user?.twitter,
				value: user?.twitter?.username,
				icon: FaXTwitter,
			},
			{
				type: "Discord",
				isLinked: !!user?.discord,
				value: user?.discord?.username,
				icon: FaDiscord,
			},
			{
				type: "Apple",
				isLinked: !!user?.apple,
				value: user?.apple?.email,
				icon: FaApple,
			},
			{
				type: "Google",
				isLinked: !!user?.google,
				value: user?.google?.email,
				icon: FaGoogle,
			},
			{
				type: "Spotify",
				isLinked: !!user?.spotify,
				value: user?.spotify?.email,
				icon: FaSpotify,
			},
			{
				type: "Instagram",
				isLinked: !!user?.instagram,
				value: user?.instagram?.username,
				icon: FaInstagram,
			},
			{
				type: "Telegram",
				isLinked: !!user?.telegram,
				value: user?.telegram?.username,
				icon: FaTelegram,
			},
			{
				type: "Farcaster",
				isLinked: !!user?.farcaster,
				value: user?.farcaster?.username,
				icon: MessageCircle,
			},
		];
	};

	// Handler for linking accounts
	const handleLink = (accountType: string) => {
		const linkingMethods = {
			email: linkEmail,
			phone: linkPhone,
			wallet: linkWallet,
			google: linkGoogle,
			apple: linkApple,
			discord: linkDiscord,
			github: linkGithub,
			twitter: linkTwitter,
			spotify: linkSpotify,
			instagram: linkInstagram,
			telegram: linkTelegram,
			farcaster: linkFarcaster,
		};

		const linkMethod =
			linkingMethods[accountType as keyof typeof linkingMethods];
		if (linkMethod) {
			linkMethod();
		}
	};

	if (!ready) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="text-xl font-semibold">
						Linked Accounts
					</CardTitle>
					<CardDescription>
						Connect your accounts to enhance your profile
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					{/* Generate 6 skeleton items to represent loading state */}
					{[...Array(6)].map(() => (
						<div
							key={Math.random() * 42069}
							className="flex items-center justify-between p-3 rounded-lg border"
						>
							<div className="flex items-center space-x-3">
								<Skeleton className="h-5 w-5 rounded-full" />
								<div className="space-y-1">
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-3 w-32" />
								</div>
							</div>
							<Skeleton className="h-8 w-16 rounded-md" />
						</div>
					))}
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl font-semibold">Linked Accounts</CardTitle>
				<CardDescription>
					Connect your accounts to enhance your profile
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				{getAccountStatus().map((account) => (
					<LinkedAccountItem
						key={account.type}
						account={account}
						onLink={handleLink}
					/>
				))}
			</CardContent>
		</Card>
	);
}
