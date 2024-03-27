import SearchBar from "./components/SearchBar.jsx";
import Card from "./components/Card.jsx";

function App() {
	return (
		<>
			<section className="text-center flex flex-col items-center max-w-7xl mx-auto">
				<div className="w-full h-96 md:h-128 flex items-center justify-center px-10 sm:px-5">
					<SearchBar />
				</div>

				<div className="container mx-auto px-5 md:px-10 bg-gray-50 p-5 rounded mt-10 shadow-lg">
					<h1 className="text-xl font-semibold text-gray-800">
						Découvrez nos recettes et nos recommandations
					</h1>
					<div className="flex gap-5 mt-10">
						<Card />
						<Card />
						<Card />
						<Card />
					</div>
				</div>
			</section>
		</>
	);
}

export default App;
