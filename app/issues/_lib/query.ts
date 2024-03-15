import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@prisma/client";

export const useUsers = () =>
    useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get("/api/users").then((res) => res.data),
        staleTime: 60 * 1000,
        retry: 3,
    });
