import { useState, useEffect } from "react";
import Button from "./Button.jsx";
import {
    MagnifyingGlassIcon,
    MicrophoneIcon,
} from "@heroicons/react/24/outline";
import useSpeechToText from "../hooks/useSpeechToText";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ initialValue }) => {
    const [search, setSearch] = useState(initialValue);
    const navigate = useNavigate();
    const { isListening, transcript, startListening, stopListening } =
        useSpeechToText({ continuous: true });

    const startStopListening = () => {
        if (isListening) {
            stopVoiceInput();
        } else {
            setSearch("");
            startListening();
        }
    };

    const stopVoiceInput = () => {
        stopListening();
    };

    useEffect(() => {
        if (isListening) {
            setSearch(transcript);
        }
    }, [transcript, isListening]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) {
            navigate("/");
            return;
        }
        navigate(`/?search=${search}`);
    };
    return (
        <div
            onSubmit={handleSubmit}
            className="flex items-center justify-center mt-28 relative w-full md:w-128"
        >
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 absolute  left-3 z-10" />
            <input
                type="text"
                aria-label="search recipes"
                className="w-full h-10 p-7 border border-gray-600 rounded focus:border-rose-600 focus:outline-none relative pl-10 pr-20 hover:border-rose-600 hover:bg-gray-50 text-sm text-gray-600 font-normal placeholder-gray-500 transition-all duration-200"
                placeholder="Rechercher une recette"
                name="search"
                onChange={handleChange}
                disabled={isListening}
                value={search}
            />
            <Button
                className={`text-white font-normal h-10 rounded p-3 ml-2 absolute right-2 z-10 flex items-center text-sm ${
                    search && !isListening
                        ? "bg-rose-600 hover:bg-rose-700"
                        : "bg-gray-500 cursor-not-allowed"
                }`}
                onClick={handleSubmit}
                disabled={!search || isListening}
            >
                Rechercher
            </Button>
            <MicrophoneIcon
                onClick={startStopListening}
                className="w-5 h-5 cursor-pointer text-gray-600 absolute right-28 z-10"
            />{" "}
        </div>
    );
};

export default SearchBar;
