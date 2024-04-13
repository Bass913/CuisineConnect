import { useRouteError, NavLink } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<DefaultLayout>
			<section className="flex items-center h-lvh p-16 dark:bg-gray-50 dark:text-gray-800 items-center bg-[#58A79C] ">
				<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
					<div className="max-w-md text-center">
						<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
							<span className="sr-only">Error</span>
							<span className="text-rose-500">4</span>04
						</h2>
						<p className="text-2xl font-semibold md:text-3xl">
							Désolée, cette page est introuvable.
						</p>
						<p className="mt-4 mb-8 dark:text-gray-600">
							Pas d'inquiétude, Vous pouvez retourner à la page
							d'accueil.
						</p>
						<NavLink
							to="/"
							className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
						>
							Retour à la page d'accueil
						</NavLink>
					</div>
				</div>
			</section>
		</DefaultLayout>
	);
}
