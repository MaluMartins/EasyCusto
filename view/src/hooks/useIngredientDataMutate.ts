import axios, { AxiosPromise } from "axios"
import { IngredientData } from "../interface/IngredientData";
import { useMutation, useQueryClient } from "@tanstack/react-query"

const API_URL = "http://localhost:8080";

const postData = async (data: IngredientData): AxiosPromise<any> => {
    const response = axios.post(API_URL + "/ingredientes/criarIngrediente", data);
    return response;
}

const updateData = async (data: IngredientData): AxiosPromise<any> => {
    const response = axios.put(API_URL + `/ingredientes/${data.id_ingrediente}`, data);
    return response;
};

export function useIngredientDataMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingredient-data'] })
        }
    })

    const update = useMutation({
        mutationFn: updateData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingredient-data'] });
        }
    });

    return {mutate, update};
}