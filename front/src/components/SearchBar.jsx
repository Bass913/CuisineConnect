import { Form } from "react-router-dom";
import Button from "./Button.jsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
	return (
		<Form
			method="get"
			action="/recipes/search"
			className="flex items-center justify-center mt-28 relative w-full md:w-128"
		>
			<MagnifyingGlassIcon className="w-5 h-5 text-gray-600 absolute left-3 z-10" />
			<input
				type="text"
				aria-label="search recipes"
				className="w-full h-10 p-7 border border-gray-600 rounded focus:border-rose-600 focus:outline-none relative pl-10 pr-20 hover:border-rose-600 hover:bg-gray-50 text-sm text-gray-600 font-normal placeholder-gray-500 transition-all duration-200"
				placeholder="Rechercher une recette"
				name="term"
			/>
			<Button
				type="submit"
				className="text-white font-normal bg-rose-600 hover:bg-rose-700 h-10 rounded p-3 ml-2 absolute right-2 z-10 flex items-center text-sm"
			>
				Rechercher
			</Button>
		</Form>
	);
}
