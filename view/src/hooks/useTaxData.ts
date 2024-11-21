import axios, { AxiosPromise } from "axios"
import { TaxData } from "../interface/TaxData"
import { useQuery } from "@tanstack/react-query"

const API_URL = "http://localhost:8080";

const fetchData = async (): AxiosPromise<TaxData[]> => {
    const response = axios.get(API_URL + "/taxas");
    return response;
}

export function useTaxData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['tax-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data,
        refetch: query.refetch
    }
}