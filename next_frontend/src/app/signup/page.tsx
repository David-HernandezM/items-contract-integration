import { registerUser } from "../lib/actions";
import { fetchUserAddress } from "../lib/data";
import { redirect } from 'next/navigation';
import { CancelButton } from "../ui/signup-button/cancel-button";

export default async function Page() {
    return (
    <>
        <header
            className="p-7 pl-4"
        >
            <p>
                logo
            </p>
        </header>
        <div className="h-screen bg-gray-200 py-20 p-4 md:p-20 lg:p-32">
            <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign up!</h2>
                    <p className="text-gray-700 mb-6">Please set your username and password</p>
                    <form action={registerUser}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="text" placeholder="Username" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password" />
                        </div>
                        <div className="flex items-center gap-7">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Register
                            </button>
                            <CancelButton />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
};

