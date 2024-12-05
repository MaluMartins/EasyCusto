import { useParams } from "react-router-dom";
import "./receitaItens.css";
import { useRecipeById } from "../../hooks/useRecipeDataById";
import { RecipeDetails } from "../../components/RecipeDetails/RecipeDetails";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export function ReceitaItens() {
    const { id } = useParams<{ id: string }>();
    const recipeId = Number(id);
    const { data, isLoading, error } = useRecipeById(recipeId);

    if (isLoading) {
        return <div className="loading">Carregando receita...</div>;
    }

    if (error) {
        return <div className="error">Erro ao carregar a receita.</div>;
    }

    if (!data?.data) {
        return <div className="not-found">Receita não encontrada.</div>;
    }

    const { nome, rendimento, margemLucro, horasPreparo, minutosPreparo } = data.data;

    return (
        <div id="receitaContainer">
            <Sidebar />
            <RecipeDetails
                nome={nome}
                rendimento={rendimento}
                margemLucro={margemLucro}
                horasPreparo={horasPreparo}
                minutosPreparo={minutosPreparo}
            />
        </div>
    );
}
