import SearchBar from "./components/SearchBar.jsx";
import Card from "./components/Card.jsx";

function App() {
	return (
		<>
			<section className="text-center flex flex-col items-center mx-auto">
				<div className="w-full h-screen bg-gray-50 relative">
					<img
						src="/wallpaper.avif"
						alt="Wallpaper"
						className="w-full h-full object-cover"
					/>
					<div className="absolute z-10 w-1/2 max-w-2xl p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<SearchBar />
					</div>
					<div class="absolute inset-0 bg-black bg-opacity-50"></div>
				</div>

				<div className="container mx-auto px-5 md:px-10 bg-white p-5 mt-10">
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
