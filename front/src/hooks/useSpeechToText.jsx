import { useRef, useState, useEffect } from "react";

const useSpeechToText = (options) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            console.log("Speech recognition is not supported");
            return;
        }
        recognitionRef.current = new window.webkitSpeechRecognition();
        const recognition = recognitionRef.current;
        recognition.interimResults = options.interimResults || true;
        recognition.lang = "fr-FR";
        recognition.continuous = options.continuous || false;

        if ("webkitSpeechGrammarList" in window) {
            const grammar =
                "#JSGF V1.0; grammar ponctuation; public <punc> = . | , | ? | ! | ; | : ;";
            const speechRecognitionList = new window.webkitSpeechGrammarList();
            speechRecognitionList.addFromString(grammar, 1);
            recognition.grammar = speechRecognitionList;
        }

        recognition.onresult = (event) => {
            let text = "";
            for (let i = 0; i < event.results.length; i++) {
                text += event.results[i][0].transcript;
            }
            setTranscript(text);
        };

        recognition.onerror = (event) => {
            if (event.error === "no-speech") {
                console.log("Aucun discours détecté, veuillez réessayer.");
            } else {
                console.log("Erreur de reconnaissance vocale", event.error);
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };
        return () => {
            recognition.stop();
        };
    }, []);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };
    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };
    return {
        isListening,
        transcript,
        startListening,
        stopListening,
    };
};

export default useSpeechToText;
