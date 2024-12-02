import axios, { AxiosPromise } from "axios"
import { useQuery } from "@tanstack/react-query"
import { IngredientData } from "../interface/IngredientData";

const API_URL = "http://localhost:8080";

const fetchData = async (): AxiosPromise<IngredientData[]> => {
    const response = axios.get(API_URL + "/ingredientes");
    return response;
}

export function useIngredientData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['ingredient-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data,
        refetch: query.refetch
    }
}