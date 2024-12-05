import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";
import { RecipeData } from "../interface/RecipeData";

const API_URL = "http://localhost:8080/receitas";

const fetchRecipeById = (id: number): AxiosPromise<RecipeData> => {
  return axios.get(`${API_URL}/${id}`);
};

export function useRecipeById(id: number) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id),
    enabled: !!id, 
  });
}
