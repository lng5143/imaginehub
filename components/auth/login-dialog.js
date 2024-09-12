import { Button } from "../ui/button";
import DialogWrapper from "./dialog-wrapper";
import LoginForm from "./login-form";

export default function LoginDialog() {
    return (
        <DialogWrapper headerLabel="Login" triggerLabel="Login">
            <LoginForm />
        </DialogWrapper>
    )
}