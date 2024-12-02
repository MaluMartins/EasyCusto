import { useState } from "react";
import { AddButton } from "../../components/AddButton/AddButton";
import { CategoryCard } from "../../components/CategoryCard/CategoryCard";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useRecipeData } from "../../hooks/useRecipeData";
import "./receitas.css"
import axios from "axios";

const API_URL = 'http://localhost:8080';

export function Receitas() {
    const { data, refetch } = useRecipeData();

    const [taxas, setTaxas] = useState<any[]>([]);

    const handleDelete = async (id: number | undefined) => {
        try {
            await axios.delete(`${API_URL}/receitas/${id}`);
            setTaxas(taxas.filter(taxa => taxa.id !== id));
            refetch();
        } catch (error) {
            console.error('Erro ao deletar receitas:', error);
        }
    };

    return (
        <div id="receitasContainer">
            <h1>Receitas</h1>
            <SearchBar />
            <div className="categorias">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>
            <div className="receitas-list">
                {data?.map(recipeData => <RecipeCard
                    key={recipeData.id_receita}
                    id_receita={recipeData.id_receita}
                    nome={recipeData.nome}
                    handleDelete={handleDelete}
                />)}
            </div>
            <AddButton type="receita" />
        </div>
        
    )
}