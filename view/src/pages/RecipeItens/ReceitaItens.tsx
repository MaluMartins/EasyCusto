import { useParams } from "react-router-dom";
import "./receitaItens.css";
import { useRecipeById } from "../../hooks/useRecipeDataById";
import { RecipeDetails } from "../../components/RecipeDetails/RecipeDetails";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { AddIngredientModal } from "../../components/AddIngredientModal/AddIngredientModal";
import { useState } from "react";

export function ReceitaItens() {
    const { id } = useParams<{ id: string }>();
    const recipeId = Number(id);
    const { data, isLoading, error } = useRecipeById(recipeId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }

    if (isLoading) {
        return <div className="loading">Carregando receita...</div>;
    }

    if (error) {
        return <div className="error">Erro ao carregar a receita.</div>;
    }

    if (!data?.data) {
        return <div className="not-found">Receita não encontrada.</div>;
    }

    const { nome, rendimento, unidadeRendimento, margemLucro, horasPreparo, minutosPreparo } = data.data;

    return (
        <div id="receitaContainer">
            <div className="receitaContent">
                <Sidebar />
                <RecipeDetails
                    nome={nome}
                    rendimento={rendimento}
                    unidadeRendimento={unidadeRendimento}
                    margemLucro={margemLucro}
                    horasPreparo={horasPreparo}
                    minutosPreparo={minutosPreparo}
                />
                {isModalOpen && <AddIngredientModal closeModal={handleOpenModal} />}
                <button onClick={handleOpenModal} className="btn-secondary">Adicionar ingrediente</button>
            </div>
        </div>
    );
}
