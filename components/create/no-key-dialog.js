import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import Link from "next/link";

export default function NoKeyDialog({ provider, open, onOpenChange })  {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">No {provider} API key found</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                </DialogDescription>
                <div className="flex flex-col gap-2 text-sm">
                    <p>Please enter your API key in settings.</p>
                    <p>Or check out <Link className="underline text-blue-500 hover:text-blue-600" href="/how-to" target="_blank" rel="noreferrer">our guide on how to get an API key</Link>.</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}