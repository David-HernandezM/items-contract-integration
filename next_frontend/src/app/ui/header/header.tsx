import SignInButton from "@/app/shared/SignInButton";



export const Header = async () => {
    return (
    <header
        className="flex justify-between p-4"
    >
        <div className="flex items-center">
            <p className="text-center">
                logo
            </p>
        </div>
        <SignInButton />
    </header>
  )
}
