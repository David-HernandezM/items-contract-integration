'use client';
import { useEffect, useState } from "react";
import { fetchContractState } from "@/app/lib/data";
import axios from "axios";
import { Backend_URL } from "@/app/lib/Constants";

export const State = () => {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        const intervalId = setInterval(async () => {
            const temp = await axios.get(`${Backend_URL}/contract/query/get-items`);

            setItems(temp.data.contractMessage);
        }, 500);

        return () => clearInterval(intervalId);
    }, []);
    
    
    return (
        <div
            className="flex flex-col items-center gap-2 mt-10"
        >
            <h2
                className="text-3xl font-[700]"
            >
                Items
            </h2>
            <div
                className="flex"
            >
                {
                    items.map((item: any) => {
                        return (
                            <div
                                className="border-gray-300 border-4 rounded-md p-3"
                            >
                                <h2>
                                    Name: {item.name}
                                </h2>
                                <p>
                                    Description: {item.description}
                                </p>
                                <p>
                                    Image: {item.image}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}