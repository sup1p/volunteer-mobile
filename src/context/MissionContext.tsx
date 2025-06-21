import React, { createContext, useState, useContext, ReactNode } from 'react';
import { mockMissions, Mission } from '@/src/data/mockData';

interface MissionContextType {
    missions: Mission[];
    completeMission: (missionId: string) => void;
    getMissionById: (missionId: string) => Mission | undefined;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const MissionProvider = ({ children }: { children: ReactNode }) => {
    const [missions, setMissions] = useState<Mission[]>(mockMissions);

    const completeMission = (missionId: string) => {
        setMissions(prevMissions =>
            prevMissions.map(mission =>
                mission.id === missionId ? { ...mission, completed: true } : mission
            )
        );
    };

    const getMissionById = (missionId: string) => {
        return missions.find(m => m.id === missionId);
    }

    return (
        <MissionContext.Provider value={{ missions, completeMission, getMissionById }}>
            {children}
        </MissionContext.Provider>
    );
};

export const useMissions = () => {
    const context = useContext(MissionContext);
    if (context === undefined) {
        throw new Error('useMissions must be used within a MissionProvider');
    }
    return context;
}; 