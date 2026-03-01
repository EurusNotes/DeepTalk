import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

export function Card({ question, onDismiss }) {
    const [exitX, setExitX] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const variants = {
        initial: {
            scale: 0.9,
            y: 60,
            opacity: 0,
            rotateZ: -4,
            rotateY: 0,
        },
        animate: (isFlipped) => ({
            scale: 1,
            y: 0,
            opacity: 1,
            rotateZ: isFlipped ? 0 : (Math.random() * 4 - 2), // Slight random tilt when dealt
            rotateY: isFlipped ? 180 : 0,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
            },
        }),
        exit: {
            x: exitX,
            opacity: 0,
            scale: 0.9,
            rotateZ: exitX > 0 ? 10 : -10,
            transition: { duration: 0.3 },
        },
    };

    const handleDragEnd = (event, info) => {
        if (Math.abs(info.offset.x) > 100) {
            setExitX(info.offset.x);
            onDismiss();
        }
    };

    return (
        <AnimatePresence mode="wait">
            {question && (
                <motion.div
                    key={question.id}
                    custom={flipped}
                    layout
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    drag={flipped ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    onClick={() => !flipped && setFlipped(true)}
                    whileTap={!flipped ? { scale: 0.97 } : { scale: 0.98 }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className={`absolute w-full aspect-[3/4] max-h-[65vh] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] touch-none ${!flipped ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}`}
                >
                    {/* BACK OF CARD (Tarot Style) */}
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center bg-brand-text text-brand-bg rounded-2xl w-full h-full overflow-hidden"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(0deg) translateZ(1px)' }}
                    >
                        <div className="border border-brand-bg/15 w-[92%] h-[94%] rounded-xl flex flex-col items-center justify-center p-6 relative">
                            {/* Mystical geometric elements */}
                            <div className="absolute top-8 w-16 h-16 border-[0.5px] border-brand-bg/20 rotate-45"></div>
                            <div className="absolute bottom-8 w-16 h-16 border-[0.5px] border-brand-bg/20 rotate-45"></div>

                            <div className="w-16 h-16 rounded-full border-[0.5px] border-brand-bg/30 flex items-center justify-center mb-8 relative z-10 bg-brand-text">
                                <div className="w-10 h-10 rounded-full border-[0.5px] border-brand-bg/50"></div>
                            </div>

                            <p className="font-serif tracking-[0.3em] uppercase text-sm opacity-90 relative z-10">Deep</p>
                            <p className="font-serif tracking-[0.3em] uppercase text-sm opacity-90 mt-2 relative z-10">Conversation</p>

                            <div className="mt-12 flex flex-col items-center opacity-50 relative z-10">
                                <span className="text-[9px] uppercase tracking-[0.4em]">Tap to draw</span>
                            </div>
                        </div>
                    </div>

                    {/* FRONT OF CARD (Question) */}
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl w-full h-full border border-brand-text/5"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)' }}
                    >
                        <motion.div
                            animate={{ y: [-2, 2, -2] }}
                            transition={{
                                repeat: Infinity,
                                duration: 4,
                                ease: 'easeInOut',
                            }}
                        >
                            <p className="text-xl sm:text-2xl font-serif text-brand-text/90 selection:bg-brand-text/10">
                                {question.text}
                            </p>
                        </motion.div>

                        <div className="absolute bottom-8 left-0 w-full text-center opacity-30 pointer-events-none">
                            <span className="text-xs uppercase tracking-widest block">Level {question.level}</span>
                            <span className="text-[10px] uppercase tracking-widest mt-1 block">Swipe to discard</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
