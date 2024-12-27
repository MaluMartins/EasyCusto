import { useState } from "react";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useRecipeData } from "../../hooks/useRecipeData";
import "./receitas.css"
import axios from "axios";
import { CreateIngredientModal } from "../../components/CreateModal/CreateModal";

const API_URL = 'http://localhost:8080';

export function Receitas() {
    const { data: allReceitas, refetch } = useRecipeData(); // Receitas iniciais
    const [filteredReceitas, setFilteredReceitas] = useState<any[]>([]); // Receitas da busca

    const handleSearchResults = (results: any[]) => {
        setFilteredReceitas(results);
    };

    const handleDelete = async (id: number | undefined) => {
        try {
            await axios.delete(`${API_URL}/receitas/${id}`);
            refetch(); 
            setFilteredReceitas((prev) => prev.filter((receita) => receita.id !== id));
        } catch (error) {
            console.error('Erro ao deletar receitas:', error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }

    const receitasParaExibir = filteredReceitas.length > 0 ? filteredReceitas : allReceitas;

    return (
        <div id="receitasContainer">
            <h1>Receitas</h1>
            <SearchBar onSearchResults={handleSearchResults} type="receita" />
            {/* <div className="categorias">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div> */}
            <div className="receitas-list">
                {receitasParaExibir?.map((recipeData) => <RecipeCard
                    key={recipeData.id_receita}
                    id_receita={recipeData.id_receita}
                    nome={recipeData.nome}
                    rendimento={recipeData.rendimento}
                    unidadeRendimento={recipeData.unidadeRendimento}
                    margemLucro={recipeData.margemLucro}
                    horasPreparo={recipeData.horasPreparo}
                    minutosPreparo={recipeData.minutosPreparo}
                    handleDelete={handleDelete}
                />)}
            </div>
            {isModalOpen && <CreateIngredientModal type="receita" ingredient={null} recipe={null} closeModal={handleOpenModal} />}
            <button id="addButton" onClick={handleOpenModal}>+</button>
        </div>

    )
}