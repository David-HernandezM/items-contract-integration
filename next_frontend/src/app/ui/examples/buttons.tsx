'use client';
// import { sendGreen, sendYellow, sendRed } from "@/app/lib/actions";
import { fetchUserAddress } from "@/app/lib/data";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { Backend_URL } from "@/app/lib/Constants";

interface Props {
    messageSent: () => void,
}

const paddingButton = 15;

export const AddItemButton = () => {
    const { data: session } = useSession();
    
    const handleClick = async () => {        
        if (!session || !session.user) {
            return;
        }

        console.log('Adding an item...');

        const response = await axios.post(
            `${Backend_URL}/contract/command/add-item`,
            {
                itemId: 4,
                address: session.user.id,
                item: {
                    name: 'item 4 tests',
                    description: 'this is an item',
                    image: 'item imageee'
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${session.backendTokens.accessToken}`,
                },
            }
        );

        console.log('item added!');
    };


    return (
        <button
            onClick={handleClick}
            className={`bg-green-400 text-black rounded-lg p-2 pl-[${paddingButton}px] pr-[${paddingButton}px]`}
        >
            Add item
        </button>
    );
};

export const ModifyItemButton = () => {
    const { data: session } = useSession();

    const handleClick = async () => {
        if (!session || !session.user) {
            return;
        }

        console.log('Updating an item...');

        const response = await axios.put(
            `${Backend_URL}/contract/command/edit-item`,
            {
                itemId: 4,
                item: {
                    name: 'item with new data!!!!',
                    description: 'this is another item',
                    image: 'item imageee'
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${session.backendTokens.accessToken}`,
                },
            }
        );

        console.log('Item updated!');
    };
    
    return (
        <button
            onClick={handleClick}
            className={`bg-yellow-300 rounded-lg p-2 pl-[${paddingButton}px] pr-[${paddingButton}px]`}
        >
            Modify item
        </button>
    );
};

export const DeleteItemButton = () => {
    const { data: session } = useSession();

    const handleClick = async () => {
        if (!session || !session.user) {
            return;
        }

        console.log('Deleting an item...');

        const response = await axios.delete(
            `${Backend_URL}/contract/command/remove-item`,
            {
                headers: {
                    Authorization: `Bearer ${session.backendTokens.accessToken}`,
                },
                data: {
                    itemId: 4,
                },
            }
        );

        console.log('item deleted!');
    };

    return (
        <button
            onClick={handleClick}
            className={`bg-red-400 rounded-lg p-2 pl-[22px] pr-[22px]`}
        >
            Delete item
        </button>
    );
};