import { User } from "next-auth";
import { useSession } from "next-auth/react";

export default function useCurrentUser() : User  | undefined {
    const session = useSession();
    return session.data?.user;
}