import { GreenButton, YellowButton, RedButton } from "../ui/examples/buttons";
import { State } from "../ui/examples/state";
import { Header } from "../ui/header/header";

export default function Page() {
    return (
        <>
            <Header />
            <div
                className="flex items-center justify-center mt-20"
            >
                <div
                    className="flex items-center gap-2 m-auto"
                >
                    <div
                        className="flex flex-col gap-2"
                    >
                        <GreenButton />
                        <YellowButton />
                        <RedButton />
                    </div>
                    <div>
                        <State />
                    </div>
                </div>
            </div>
        </>
    );
}