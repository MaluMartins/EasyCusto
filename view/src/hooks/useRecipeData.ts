import axios, { AxiosPromise } from "axios"
import { useQuery } from "@tanstack/react-query"
import { RecipeHeaderData } from "../interface/RecipeHeaderData";

const API_URL = "http://localhost:8080";

const fetchData = async (): AxiosPromise<RecipeHeaderData[]> => {
    const response = axios.get(API_URL + "/receitas");
    return response;
}

export function useRecipeData() {
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