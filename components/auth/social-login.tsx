"use clients"

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function SocialLogin() {
    function onClick(provider : string) {
        signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT});
    }

    return (
        <div className="flex items-center w-full gap-2">
            <Button size="lg" className="w-full hover:scale-[1.02]" variant="ibLight" onClick={() => onClick('google')}>
                <FcGoogle className="w-5 h-5" />
            </Button>
            {/* <Button size="lg" className="w-full" variant="outline" onClick={() => onClick('facebook')}>
                <FaFacebook className="w-5 h-5" />
            </Button> */}
        </div>
    )
}