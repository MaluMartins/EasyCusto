import { useState } from "react";
import "./recipeCard.css"
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RecipeData } from "../../interface/RecipeData";
import { CreateIngredientModal } from "../CreateIngredientModal/CreateIngredientModal";
import { useNavigate } from "react-router-dom";

interface RecipeProps {
    id_receita: number | undefined,
    nome: string,
    rendimento: number,
    margemLucro: number,
    horasPreparo: number,
    minutosPreparo: number,
    handleDelete: (id: number | undefined) => void
}

export function RecipeCard({ id_receita, nome, rendimento, margemLucro, horasPreparo, minutosPreparo, handleDelete }: RecipeProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRecipe, setCurrentRecipe] = useState<RecipeData | null>(null);
    const navigate = useNavigate();

    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev);
    };

    const openModalWithRecipe = (recipe: RecipeData) => {
        setCurrentRecipe(recipe);
        setIsModalOpen(true);
    };

    const goToDetailsPage = () => {
        if (id_receita) {
          navigate(`/receitas/${id_receita}`); 
        }
      };

    return (
        <div className="recipeCard" key={id_receita}>
            <div>
                <div onClick={goToDetailsPage} style={{ cursor: "pointer", textDecoration: "underline" }}>{nome}</div>
            </div>
            <div className="card-buttons">
                <button className="edit-button" onClick={() => openModalWithRecipe({ id_receita, nome, rendimento, margemLucro, horasPreparo, minutosPreparo })}><FaEdit /></button>

                <button className="delete-button" onClick={() => {
                    if (id_receita !== undefined && window.confirm("Deseja realmente deletar esta receita?")) {
                        handleDelete(id_receita);
                    }
                }}><FaTrash /></button>
            </div>

            {isModalOpen && <CreateIngredientModal type="receita" ingredient={null} recipe={currentRecipe} closeModal={handleOpenModal} />}
        </div>
    )
}