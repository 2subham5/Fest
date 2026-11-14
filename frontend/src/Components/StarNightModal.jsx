import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const StarNightModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Show automatically after 700ms on first arrival
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 700);
        return () => clearTimeout(timer);
    }, []);

    const handleAction = () => {
        setIsOpen(false);
        navigate("/elitepass");
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        {/* Backdrop click to close */}
                        <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

                        {/* Modal Card */}
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.7, opacity: 0, y: 30 }}
                            transition={{ type: "spring", damping: 22, stiffness: 260 }}
                            className="relative z-10 w-full max-w-sm md:max-w-md bg-gradient-to-b from-gray-900 to-black rounded-2xl border-2 border-orange-500/70 shadow-[0_0_50px_rgba(249,115,22,0.4)] overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/70 text-gray-300 hover:text-white hover:bg-black transition-colors"
                            >
                                ✕
                            </button>

                            {/* Glowing Banner Header */}
                            <div className="bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 py-2 text-center">
                                <span className="text-white text-xs md:text-sm font-extrabold tracking-wider uppercase animate-pulse">
                                    ⚡ STAR NIGHT REVEAL &bull; 27TH NOV ⚡
                                </span>
                            </div>

                            {/* Poster Image */}
                            <div className="p-3 cursor-pointer" onClick={handleAction}>
                                <img
                                    src="/starNightPoster.jpg"
                                    alt="Akhil Sachdeva Live - Eternia 2026"
                                    className="w-full h-auto max-h-[65vh] object-contain rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
                                />
                            </div>

                            {/* Call to Action Button */}
                            <div className="p-4 pt-0">
                                <button
                                    onClick={handleAction}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-base rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Book Elite Pass / Register Now &rarr;
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Floating Pill when modal is closed */}
            {!isOpen && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-105 transition-transform"
                >
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-300 animate-ping" />
                    <span>🔥 Star Night: Akhil Sachdeva</span>
                </motion.button>
            )}
        </>
    );
};

export default StarNightModal;