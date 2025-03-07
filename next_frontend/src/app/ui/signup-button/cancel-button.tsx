"use client";
import { redirect } from "next/navigation";

export const CancelButton = () => {
    return (
        <button
            className="bg-green-500 hover:bg-green-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => redirect('/')}
            type="button"
        >
            Cancel
        </button>
    );
}
