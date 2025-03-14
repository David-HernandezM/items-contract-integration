import { Header } from "@/app/ui/header/header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import axios from "axios";
import { Backend_URL } from "@/app/lib/Constants";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    const params = await props.params;
    
    if (!session || session.user.id != params.id) {
        return redirect('/');
    }
    
    const getUserData = async () => {
        try {
            const response = await axios.get(
                `${Backend_URL}/keyring/${params.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${session.backendTokens.accessToken}`
                    }
                }
            );

            return response.data;
        } catch (e) {
            redirect('/');
        }
    }

    const userData = await getUserData();

    return (
        <>
            <Header />
            <div
                className="flex justify-center items-center"
            >
                <div
                    className="border-gray-300 border-4 rounded-md p-3"
                >
                    <h2>
                        Username: {session.user.name}                        
                    </h2>
                    <p>
                        Address: {session.user.id}
                    </p>
                    <p>
                        Voucher: {userData.voucherId}
                    </p>
                    <p>
                        Voucher Balance: {userData.voucherBalance}
                    </p>
                </div>
            </div>
        </>
    );
}