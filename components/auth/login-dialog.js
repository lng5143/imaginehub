import IBButton from "../ib-button";
import LoginForm from "./login-form";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function Login() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <IBButton variant="light">Login</IBButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <LoginForm />
            </DialogContent>
        </Dialog>
    )
}