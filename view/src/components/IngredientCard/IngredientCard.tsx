import { useState } from "react";
import "./ingredientCard.css"
import { FaEdit, FaTrash } from 'react-icons/fa';
import { CreateIngredientModal } from "../CreateModal/CreateModal";
import { IngredientData } from "../../interface/IngredientData";

interface IngredientCardProps {
    id_ingrediente: number | undefined,
    nome: string,
    precoPorEmbalagem: number,
    qtPorEmbalagem: number,
    custoPorUnidade: number,
    unidadeMedida: string,
    handleDelete: (id: number | undefined) => void
}

export function IngredientCard({ id_ingrediente, nome, precoPorEmbalagem, qtPorEmbalagem, custoPorUnidade, unidadeMedida, handleDelete}: IngredientCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState<IngredientData | null>(null);

    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev);
    };

    const openModalWithIngredient = (ingredient: IngredientData) => {
        setCurrentIngredient(ingredient);
        setIsModalOpen(true);
    };


    return (
        <div className="ingredientCard" key={id_ingrediente}>
            <div className="nome-custo">
                <div>{nome}</div>    
                <div>Custo: R${custoPorUnidade} por {unidadeMedida == "g" ? "grama" : "unidade"}</div>
            </div>
            <div className="card-buttons">
                <button className="edit-button" onClick={() => openModalWithIngredient({ id_ingrediente, nome, precoPorEmbalagem, qtPorEmbalagem, custoPorUnidade, unidadeMedida })}><FaEdit /></button>

                <button className="delete-button" onClick={() => {
                    if (id_ingrediente !== undefined && window.confirm("Deseja realmente deletar este material?")) {
                        handleDelete(id_ingrediente);
                    }
                }}><FaTrash /></button>
            </div>
            {isModalOpen && <CreateIngredientModal type="material" ingredient={currentIngredient} recipe={null} closeModal={handleOpenModal} />}

        </div>
    )
}