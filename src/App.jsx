import { useGameLogic } from './hooks/useGameLogic';
import { Card } from './components/Card';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const {
    level,
    changeLevel,
    currentQuestion,
    nextQuestion,
    isEnd
  } = useGameLogic();

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto p-6 sm:p-8 overflow-hidden touch-none select-none">
      {/* Header / Level Selector */}
      <header className="flex justify-center items-center py-8 z-10 relative">
        <div className="flex space-x-4 items-center">
          {[1, 2, 3].map((l) => (
            <div key={l} className="flex flex-col items-center gap-2">
              <button
                onClick={() => changeLevel(l)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ease-out ${level === l
                  ? 'bg-brand-text scale-[1.5]'
                  : 'bg-brand-text/15 hover:bg-brand-text/30'
                  }`}
                aria-label={`Level ${l}`}
              />
            </div>
          ))}
        </div>
      </header>

      {/* Main Play Area */}
      <main className="flex-1 flex flex-col items-center justify-center w-full relative perspective-[1200px]">
        {/* Card Component Wrapper */}
        <div className="relative w-full aspect-[3/4] max-h-[65vh] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {isEnd ? (
              <div key="end" className="text-brand-text/50 font-serif text-center">
                <p>This level is complete.</p>
                <button
                  className="mt-4 px-4 py-2 border border-brand-text/20 rounded-full hover:bg-brand-text/5 transition-colors"
                  onClick={() => changeLevel((level % 3) + 1)}
                >
                  Next Level
                </button>
              </div>
            ) : currentQuestion ? (
              <Card
                key={currentQuestion.id}
                question={currentQuestion}
                onDismiss={nextQuestion}
              />
            ) : null}
          </AnimatePresence>
        </div>

        {/* Footer info / branding */}
        <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none text-brand-text/30 text-[10px] tracking-[0.2em] uppercase">
          <p>Deep Conversation</p>
        </div>
      </main>
    </div>
  );
}
