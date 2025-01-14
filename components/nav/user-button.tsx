import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import LogoutButton from "../auth/logout-button";
import { Button } from "../ui/button";
import { useState } from "react";
import SettingsDialog from "../settings/settings-dialog";
import { User } from "@prisma/client";

interface UserButtonProps {
    user: User;
}

export default function UserButton({ user } : UserButtonProps) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isUserButtonOpen, setIsUserButtonOpen] = useState(false);

    const handleOpenSettings = () => {
        setIsSettingsOpen(true);
        setIsUserButtonOpen(false);
    }

    return (
        <>
            <DropdownMenu open={isUserButtonOpen} onOpenChange={setIsUserButtonOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-sm">
                        <Avatar className="w-10 h-10 rounded-sm">
                            <AvatarImage src={user.image ?? ""} alt="User Avatar" />
                            <AvatarFallback className="w-10 h-10 rounded-sm">
                                <FaUser />
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                        <div className="flex flex-col gap-2">
                            <p className="text-normal">{user.name || user.email}</p>
                            <p className="text-muted-foreground text-xs truncate">{user.name && user.email}</p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-left cursor-pointer" onClick={handleOpenSettings}>
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogoutButton />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <SettingsDialog isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} user={user} />
        </>
    )
}