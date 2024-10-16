import { useSession } from "next-auth/react";

export default function useCurrentUserId() {
    const session = useSession();
    return session.data?.user?.tier;
}