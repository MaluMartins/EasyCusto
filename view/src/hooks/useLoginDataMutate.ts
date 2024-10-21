import axios, { AxiosPromise } from "axios";
import { LoginData } from "../interface/LoginData";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const API_URL = "http://localhost:8080";

export function useLoginDataMutate() {
    const postData = async (data: LoginData): AxiosPromise<any> => {
        const response = await axios.post(API_URL + "/auth/login", data);
    
        return response; 
    }
   
    const navigate = useNavigate();
    const { setAuthToken } = useAuth();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 0,
        onSuccess: (response) => {
            const token = response.data.token;
            if (token) {
                localStorage.setItem("token", token);
                setAuthToken(token);
                navigate("/home");
            }
        },
        onError: (error: any) => {
            console.error(error);
        }
    });

    return mutate;
}

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
}
)