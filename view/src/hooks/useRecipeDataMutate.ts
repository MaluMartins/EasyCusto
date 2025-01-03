import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RecipeData } from "../interface/RecipeData";

const API_URL = "http://localhost:8080";

const postData = async (data: RecipeData): AxiosPromise<any> => {
    const response = axios.post(API_URL + "/receitas/criarReceita", data);
    return response;
}

const updateData = async (data: RecipeData): AxiosPromise<any> => {
    const response = axios.put(API_URL + `/receitas/${data.id_receita}`, data);
    return response;
};

export function useRecipeDataMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recipe-data'] })
        }
    })

    const update = useMutation({
        mutationFn: updateData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recipe-data'] });
        }
    });

    return {mutate, update};
}