"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiMic, FiSquare, FiPlay, FiPause, FiTrash2, FiCheckCircle } from "react-icons/fi";

interface VoiceRecorderProps {
  voiceNote: Blob | null;
  onVoiceNoteChange: (blob: Blob | null) => void;
}

export default function VoiceRecorder({ voiceNote, onVoiceNoteChange }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSupported, setIsSupported] = useState(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        onVoiceNoteChange(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setIsSupported(false);
      alert("Unable to access microphone. Please check your browser permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const playAudio = () => {
    if (voiceNote && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const deleteRecording = () => {
    onVoiceNoteChange(null);
    setRecordingTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
        <p className="text-yellow-800 font-medium mb-2">Voice Recording Not Available</p>
        <p className="text-sm text-yellow-700">
          Your browser doesn&apos;t support voice recording or microphone access was denied.
          You can skip this step and provide details in writing.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-brand-text-primary mb-2">
          Describe the Incident (Optional)
        </h3>
        <p className="text-brand-text-secondary">
          Record a voice note to provide additional details about what happened
        </p>
      </div>

      <div className="bg-white border-2 border-brand-border rounded-2xl p-8">
        {!voiceNote ? (
          // Recording Interface
          <div className="text-center">
            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary text-white rounded-full hover:bg-brand-primary-light transition-all hover:scale-110 shadow-lg"
              >
                <FiMic className="w-10 h-10" />
              </button>
            ) : (
              <div className="space-y-6">
                {/* Recording Animation */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-red-500 text-white rounded-full shadow-lg"
                >
                  <FiMic className="w-10 h-10" />
                </motion.div>

                {/* Timer */}
                <div className="text-3xl font-bold text-brand-text-primary">
                  {formatTime(recordingTime)}
                </div>

                {/* Waveform Simulation */}
                <div className="flex items-center justify-center gap-1 h-12">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-brand-primary rounded-full"
                      animate={{
                        height: [
                          Math.random() * 40 + 10,
                          Math.random() * 40 + 10,
                          Math.random() * 40 + 10,
                        ],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>

                {/* Stop Button */}
                <button
                  type="button"
                  onClick={stopRecording}
                  className="inline-flex items-center gap-2 bg-red-500 text-white font-medium py-3 px-6 rounded-xl hover:bg-red-600 transition-colors"
                >
                  <FiSquare />
                  Stop Recording
                </button>
              </div>
            )}

            {!isRecording && (
              <p className="mt-4 text-sm text-brand-text-secondary">
                Click the microphone to start recording
              </p>
            )}
          </div>
        ) : (
          // Playback Interface
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
              <FiCheckCircle className="w-6 h-6" />
              <span className="font-medium">Recording Saved</span>
            </div>

            <audio
              ref={audioRef}
              src={URL.createObjectURL(voiceNote)}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />

            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={isPlaying ? pauseAudio : playAudio}
                className="inline-flex items-center justify-center w-14 h-14 bg-brand-primary text-white rounded-full hover:bg-brand-primary-light transition-all hover:scale-110"
              >
                {isPlaying ? <FiPause className="w-6 h-6" /> : <FiPlay className="w-6 h-6 ml-1" />}
              </button>

              <button
                type="button"
                onClick={deleteRecording}
                className="inline-flex items-center gap-2 bg-red-50 text-red-600 font-medium py-2 px-4 rounded-xl hover:bg-red-100 transition-colors"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>

            <p className="text-sm text-brand-text-secondary text-center">
              Duration: {formatTime(recordingTime)}
            </p>
          </div>
        )}
      </div>

      <div className="bg-brand-neutral-subtle border border-brand-border rounded-xl p-4">
        <p className="text-sm text-brand-text-secondary">
          <strong>Tip:</strong> Describe what happened, when it occurred, and any other
          relevant details. This helps us process your claim faster.
        </p>
      </div>
    </div>
  );
}
