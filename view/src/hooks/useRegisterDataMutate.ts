import axios, { AxiosPromise } from "axios";
import { LoginData } from "../interface/LoginData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080";

export function useRegisterDataMutate() {
    const postData = async (data: LoginData): AxiosPromise<any> => {
        const response = await axios.post(API_URL + "/auth/registrar", data);
    
        return response; 
    }
   
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 0,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['register-data'] })
            navigate("/login");
        },
        onError: (error: any) => {
            console.error(error);
        }
    });

    return mutate;
}
