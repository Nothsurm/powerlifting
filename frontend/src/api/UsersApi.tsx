import { CreateUserRequest, LoginUserRequest } from "@/types"
import { useMutation } from "@tanstack/react-query";
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

export const loginUser = () => {
    const navigate = useNavigate()
    const loginUserRequest = async (user: LoginUserRequest) => {
        const response = await fetch(`${API_BASE_URL}/api/users/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(user)
        });

        console.log(response);
        

        if (!response.ok) {
            throw new Error('Wrong credentials')
        }
    };

    const {
        mutateAsync: loginUser,
        isPending,
        isError,
        isSuccess
    } = useMutation({mutationFn: loginUserRequest})

    if (isSuccess) {
        toast.success('Successfully logged in')
       navigate('/')
    }
    if (isError) {
        toast.error('Wrong Credentials')
    }

    return {
        loginUser,
        isPending
    }
}

export const logoutUser = () => {
    const navigate = useNavigate()
    const logoutUserRequest = async () => {
        const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('Logout Unsuccessfull')
        }
    };

    const {
        mutateAsync: logoutUser,
        isPending,
        isSuccess,
        isError
    } = useMutation({mutationFn: logoutUserRequest})

    console.log(isError);
    

    if (isSuccess) {
        toast.success('Successfully logged out')
        navigate('/')
    }

    if (isError) {
        console.log(isError.toString());
        
    }
    
    return {
        logoutUser,
        isPending
    }
}