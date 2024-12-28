import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:8080/ingredientes/adicionarIngredienteEmReceita";

interface IngredienteRequest {
    id: number | undefined;
    qtUsada: number; 
  }

export function useRecipeIngredientDataMutate() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const assignIngredientToRecipe = async (id_receita: number, ingredientData: IngredienteRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/${id_receita}`, ingredientData);

            return response.data;
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao adicionar ingrediente.");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { assignIngredientToRecipe, isLoading, error };
}