import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TaxData } from "../interface/TaxData";

const API_URL = "http://localhost:8080";

const postData = async (data: TaxData): AxiosPromise<any> => {
    const response = await axios.post(API_URL + "/taxas", data);
    return response;
}

const updateData = async (data: TaxData): AxiosPromise<any> => {
    const response = axios.put(API_URL + `/taxas/${data.id_taxa}`, data);
    return response;
};

export function useTaxDataMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tax-data'] })
        },
        onError: (error) => {
            console.error("Erro ao cadastrar taxa:", error);
        }
    })

    const update = useMutation({
        mutationFn: updateData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tax-data'] });
        }
    });

    return {mutate, update};
}