import { LinkPrivyAccountsCard } from "@/modules/user/components/link-accounts-card";
import { PrivyAccountCard } from "@/modules/user/components/privy-account-card";

export const DashboardPage = () => {
	return (
		<div className="p-8 space-y-8">
			<PrivyAccountCard />
			<LinkPrivyAccountsCard />
		</div>
	);
};
