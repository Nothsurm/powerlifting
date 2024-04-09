import { CreateUserRequest, User } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



const API_BASE_URL = import.meta.env.VITE_BASE_URL

export const createUser = () => {
    const navigate = useNavigate()
    const createUserRequest = async (user: CreateUserRequest) => {
        const response = await fetch(`${API_BASE_URL}/api/users/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Failed to create User')
        }
    };

    const { 
        mutateAsync: createUser, 
        isPending, 
        isError, 
        isSuccess 
    } = useMutation({mutationFn: createUserRequest})

    if (isSuccess) {
        toast.success('User successfully created')
        navigate('/')
    }
    if (isError) {
        toast.error('Something went wrong')
    }

    return {
        createUser,
        isPending
    }
}