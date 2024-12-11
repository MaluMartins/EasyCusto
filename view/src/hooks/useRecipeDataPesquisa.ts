import axios, { AxiosPromise } from "axios"
import { useQuery } from "@tanstack/react-query"
import { RecipeData } from "../interface/RecipeData";

const API_URL = "http://localhost:8080";

const fetchData = async (): AxiosPromise<RecipeData[]> => {
    const response = axios.get(API_URL + "/receitas/pesquisa");
    return response;
}

export function useRecipeDataPesquisa() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['recipe-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data,
        refetch: query.refetch
    }
}