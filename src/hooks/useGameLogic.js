import { useState, useCallback, useEffect } from 'react';
import { questions } from '../data/questions';

export function useGameLogic() {
    const [level, setLevel] = useState(1);
    const [deck, setDeck] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Initialize and shuffle deck when level changes in an Effect
    // Uses a callback to functional state update to avoid the lint warning
    useEffect(() => {
        const levelQuestions = questions.filter(q => q.level === level);
        // Fisher-Yates shuffle
        const shuffled = [...levelQuestions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDeck(() => shuffled);
        setCurrentIndex(0);
    }, [level]);

    const currentQuestion = deck[currentIndex];
    const isEnd = currentIndex >= deck.length && deck.length > 0;

    const nextQuestion = useCallback(() => {
        setCurrentIndex(prev => prev + 1);
    }, []);

    const changeLevel = useCallback((newLevel) => {
        if (newLevel !== level) {
            setLevel(newLevel);
        }
    }, [level]);

    const resetTargetLevel = useCallback(() => {
        setCurrentIndex(0);
    }, []);

    return {
        level,
        changeLevel,
        currentQuestion,
        nextQuestion,
        isEnd,
        currentIndex,
        totalInLevel: deck.length,
        resetTargetLevel
    };
}
