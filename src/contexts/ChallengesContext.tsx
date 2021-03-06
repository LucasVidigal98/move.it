import { createContext, ReactNode, useState } from 'react';

import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number; 
    levelUp: () => void; 
    currentExperience: number; 
    challengesCompleted: number; 
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel: number;
}

interface ChallengesProviderProps {
    children: ReactNode;
}  

export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider:React.FC<ChallengesProviderProps> = ({ children }) => {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrenteExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level+1)*4, 2)

    function levelUp() {
       setLevel(level + 1);
    }

    function startNewChallenge() {
        const random = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[random];
        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

   return (
    <ChallengesContext.Provider value={{ 
        level, 
        levelUp, 
        currentExperience, 
        challengesCompleted, 
        startNewChallenge,
        activeChallenge,
        resetChallenge, 
        experienceToNextLevel 
    }}>
        {children}
    </ChallengesContext.Provider>
   );
}