'use client';
import { useEffect, useState } from "react";
import { fetchContractState } from "@/app/lib/data";

export const State = () => {
    const [lightColor, setLightColor] = useState<keyof typeof colors>('gray');
    const colors = {
        "gray": 'gray-400',
        "green": 'green-400',
        "yellow": 'yellow-300',
        "red": 'red-400'
    };
    
    useEffect(() => {
        const intervalId = setInterval(async () => {

        }, 500);

        return () => clearInterval(intervalId);
    }, [])
    
    
    return (
        <div
            className="flex flex-col items-center gap-2"
        >
            <h2
                className="text-3xl font-[700]"
            >
                Traffic-light
            </h2>
            <div
                className={`flex items-center justify-center h-[400px] w-[400px] bg-${colors[lightColor]} rounded-[50px]`}
            >
                <p>
                    Light
                </p>
            </div>
            <h3>
                State Contract
            </h3>
            <p>
                "Green"
            </p>
        </div>
    );
}