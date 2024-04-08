import SearchBar from "./SearchBar";

export default function SearchBarSection({ isTall = true, initialValue = ""}) {
	return (
		<div
			className={`${
				isTall ? "h-screen" : "h-96 transition-height"
			} w-full relative bg-gray-50 transition-all ease-in-out duration-300`}
		>
			<img
				src="/wallpaper.avif"
				alt="Wallpaper"
				className="w-full h-full object-cover"
			/>
			<div className="absolute z-10 w-1/2 max-w-2xl p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<SearchBar initialValue={initialValue} />
			</div>
			<div className="absolute inset-0 bg-black bg-opacity-50"></div>
		</div>
	);
}
