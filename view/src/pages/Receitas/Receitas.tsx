import { useState } from "react";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useRecipeData } from "../../hooks/useRecipeData";
import "./receitas.css"
import axios from "axios";
import { CreateIngredientModal } from "../../components/CreateIngredientModal/CreateIngredientModal";

const API_URL = 'http://localhost:8080';

export function Receitas() {
    const { data, refetch } = useRecipeData();

    const [receitas, setReceitas] = useState<any[]>([]);

    const handleDelete = async (id: number | undefined) => {
        try {
            await axios.delete(`${API_URL}/receitas/${id}`);
            setReceitas(receitas.filter(receita => receita.id !== id));
            refetch();
        } catch (error) {
            console.error('Erro ao deletar receitas:', error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }

    return (
        <div id="receitasContainer">
            <h1>Receitas</h1>
            <SearchBar />
            {/* <div className="categorias">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div> */}
            <div className="receitas-list">
                {data?.map(recipeData => <RecipeCard
                    key={recipeData.id_receita}
                    id_receita={recipeData.id_receita}
                    nome={recipeData.nome}
                    rendimento={recipeData.rendimento}
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