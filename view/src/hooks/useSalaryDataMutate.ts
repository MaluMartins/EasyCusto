import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SalaryData } from "../interface/SalaryData";

const API_URL = "http://localhost:8080";

const postData = async (data: SalaryData): AxiosPromise<any> => {
    const response = await axios.post(API_URL + "/salario", data);
    return response;
}

export function useSalaryDataMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['salario-data'] })
        },
        onError: (error) => {
            console.error("Erro ao cadastrar salário:", error);
        }
    })

    return mutate;
}