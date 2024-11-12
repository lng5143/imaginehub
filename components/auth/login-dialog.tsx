import AuthForm from "./login-form";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "../ui/button";

interface LoginProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function Login({ open, setOpen } : LoginProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ibLight">Login</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-6 text-white bg-indigo-950 border-none">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Login</DialogTitle>
                    <VisuallyHidden><DialogDescription/></VisuallyHidden>
                </DialogHeader>
                <AuthForm />
            </DialogContent>
        </Dialog>
    )
}