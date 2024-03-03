"use client";

import Car from "@/app/component/car";
import Sidebar from "@/app/component/sideBar";
import TpBar from "@/app/component/tpBar";
import Image from "next/image";
import BatteryPage from "./component/batteryPage";
import { useEffect, useState, useRef } from "react";
import "regenerator-runtime/runtime";
import { userAgent } from "next/server";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [testSpeak, setTestSpeak] = new useState("");
  const options = {
    pitch: 1, // Default pitch
    rate: 1, // Default rate
    volume: 1, // Default volume
  };
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);

    // Set the properties for the speech
    speech.lang = "en-US";
    speech.pitch = 1;
    speech.rate = 1;
    speech.volume = 1;
    speech.voice = speechSynthesis
      .getVoices()
      .filter(
        (voice) =>
          voice.name ==
          "Microsoft Natasha Online (Natural) - English (Australia)"
      )[0];
    window.speechSynthesis.speak(speech);

    console.log(speech.voice);
  };
  // speak("hello");
  useEffect(() => {
    speak(testSpeak);
  }, [testSpeak]);
  // setVoice("Microsoft Natasha Online (Natural) - English (Australia)");
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const [finalTranscript, setFinalTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const certainWord = "hello eve"; // The word to trigger recording
  const silenceDetectionTimeoutRef = useRef(null);
  const silenceInterval = 4000; // 2 seconds of silence

  useEffect(() => {
    // Automatically start listening with continuous and interim results
    SpeechRecognition.startListening({
      continuous: true,
      interimResults: true,
    });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  useEffect(() => {
    // Check for the certain starting word in the transcript to begin recording
    if (transcript.toLowerCase().includes(certainWord) && !isRecording) {
      resetTranscript();
      setIsRecording(true);
      setFinalTranscript(transcript); // Start with the current transcript, including the trigger word
    }
  }, [transcript, isRecording]);

  useEffect(() => {
    if (isRecording) {
      // Update the final transcript whenever new speech is detected
      setFinalTranscript(transcript);

      // Reset the silence detection timeout whenever the transcript updates
      clearTimeout(silenceDetectionTimeoutRef.current);
      silenceDetectionTimeoutRef.current = setTimeout(() => {
        console.log(
          "Silence detected for 2 seconds. Transcript updates paused."
        );
        setIsRecording(false);
        postTranscript();

        ///send back and process information about the text

        //reset Trasncript
        handleReset();
        // Keep isRecording true but stop updating the transcript after silence
      }, silenceInterval);
    }
  }, [transcript, isRecording]);

  const postTranscript = async (transcript) => {
    console.log(currentLocation);
    try {
      const response = await axios.post("http://localhost:3500/voice/", {
        transcript: finalTranscript,
        location: currentLocation,
      });
      console.log("Transcript posted successfully", response.data);
      console.log(response.data);
      // setTestSpeak(response.data + "test");
      console.log("should speak");
      setTestSpeak(response.data);
      // Handle successful posting here, e.g., resetting transcript
      resetTranscript();
    } catch (error) {
      console.error("Error posting transcript:", error);
    }
  };

  const handleReset = () => {
    resetTranscript();
    setFinalTranscript("");
    setIsRecording(false);
    clearTimeout(silenceDetectionTimeoutRef.current);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // setSelectedPlace(null);
          // setSearchLngLat(null);
          setCurrentLocation({ lat: latitude, lng: longitude });
          console.log(latitude, longitude);
          center = { lat: latitude, lng: longitude };
          console.log("test");
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <main className="h-screen w-full ">
      <div className="absolute w-full z-0 overflow-hidden">
        <Car></Car>
      </div>
      {/* <div className="absolute z-1 w-full h-screen bg-pink-100">h</div> */}
      <div className=" w-full z-10">
        <TpBar></TpBar>
      </div>
      <div className="absolute z-10 ">
        <Sidebar></Sidebar>
      </div>

      <div className="absolute z-10 top-[550px] left-[400px]">
        <BatteryPage></BatteryPage>
      </div>
    </main>
  );
}
