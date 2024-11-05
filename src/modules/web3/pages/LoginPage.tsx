import { LoginWithGoogle } from "../components/login-with-google";

export const LoginPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-3xl">Privy Authentication Example</h1>

			<div className="flex gap-2 pt-2">
				<LoginWithGoogle />
			</div>
		</div>
	);
};
