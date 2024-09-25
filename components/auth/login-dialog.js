import { Button } from "../ui/button";
import DialogWrapper from "./dialog-wrapper";
import LoginForm from "./login-form";

export default function Login() {
    return (
        <DialogWrapper headerLabel="Login" triggerLabel="Login">
            <LoginForm />
        </DialogWrapper>
    )
}