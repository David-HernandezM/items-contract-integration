'use client';
import { sendGreen, sendYellow, sendRed } from "@/app/lib/actions";
import { fetchUserAddress } from "@/app/lib/data";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


interface Props {
    messageSent: () => void,
}

const paddingButton = 15;

export const GreenButton = () => {
    const { data: session } = useSession();

    
    const handleClick = async () => {
        console.log('Session: ');
        console.log(session);
        // const response = await fetchUserAddress();

        // if (!response) redirect('/login');

        // await sendGreen();
    };

    return (
        <button
            onClick={handleClick}
            className={`bg-green-400 rounded-lg p-2 pl-[${paddingButton}px] pr-[${paddingButton}px]`}
        >
            Green
        </button>
    );
};

export const YellowButton = () => {
    const handleClick = async () => {
        const response = await fetchUserAddress();

        if (!response) redirect('/login');

        await sendYellow();
    };
    
    return (
        <button
            onClick={handleClick}
            className={`bg-yellow-300 rounded-lg p-2 pl-[${paddingButton}px] pr-[${paddingButton}px]`}
        >
            Yellow
        </button>
    );
};

export const RedButton = () => {
    const handleClick = async () => {
        const response = await fetchUserAddress();

        if (!response) redirect('/login');

        await sendGreen();
    };

    return (
        <button
            onClick={handleClick}
            className={`bg-red-400 rounded-lg p-2 pl-[22px] pr-[22px]`}
        >
            Red
        </button>
    );
};