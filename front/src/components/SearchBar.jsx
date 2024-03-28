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
        console.log("isListening valeur dans VoiceInput", isListening);
        isListening ? stopVoiceInput() : startListening();
    };

    const stopVoiceInput = () => {
        setSearch(
            (preVal) =>
                preVal +
                (transcript.length
                    ? (preVal.length ? " " : "") + transcript
                    : "")
        );
        stopListening();
    };

    useEffect(() => {
        setSearch(initialValue);
    }, [initialValue]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = () => {
        if (!search) {
            navigate("/");
            return;
        }
        navigate(`/?search=${search}`);
    };
    return (
        <div className="flex items-center justify-center mt-28 relative w-full md:w-128">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 absolute  left-3 z-10" />
            <input
                type="text"
                aria-label="search recipes"
                className="w-full h-10 p-7 border border-gray-600 rounded focus:border-rose-600 focus:outline-none relative pl-10 pr-20 hover:border-rose-600 hover:bg-gray-50 text-sm text-gray-600 font-normal placeholder-gray-500 transition-all duration-200"
                placeholder="Rechercher une recette"
                name="search"
                onChange={handleChange}
                disabled={isListening}
            />
            <Button
                className="text-white font-normal bg-rose-600 hover:bg-rose-700 h-10 rounded p-3 ml-2 absolute right-2 z-10 flex items-center text-sm"
                onClick={handleSubmit}
            >
                Rechercher
            </Button>
            <MicrophoneIcon
                onClick={() => startStopListening()}
                className="w-5 h-5 cursor-pointer text-gray-600 absolute right-28 z-10"
            />{" "}
        </div>
    );
};

export default SearchBar;
