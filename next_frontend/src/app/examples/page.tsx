import { ModifyItemButton, DeleteItemButton, AddItemButton } from "../ui/examples/buttons";
import { State } from "../ui/examples/state";
import { Header } from "../ui/header/header";

export default function Page() {
    return (
        <>
            <Header />
            <div
                className="flex flex-col items-center justify-center mt-20"
            >
                <h1
                    className="text-2xl font-semibold"
                >
                    Toury actions
                </h1>
                <div
                    className="flex justify-center items-center gap-11 mt-7"
                >
                    <AddItemButton />
                    <ModifyItemButton />
                    <DeleteItemButton />
                </div>
                <div>
                    <State />
                </div>
            </div>
        </>
    );
}