import { fetchUserAddress } from "@/app/lib/data";
import Link from "next/link";

export const LoginButton = async () => {
    const userIsLiggin = await fetchUserAddress();

    return !userIsLiggin ? (
        <Link
            href={'/login'}
            className="flex items-stretch self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
            login
        </Link>
    ) : (
        <></>
    );
}
