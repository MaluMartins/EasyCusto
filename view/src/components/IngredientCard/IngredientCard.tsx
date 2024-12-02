import { useState } from "react";
import "./ingredientCard.css"
import { FaEdit, FaTrash } from 'react-icons/fa';
import { CreateIngredientModal } from "../CreateIngredientModal/CreateIngredientModal";
import { IngredientData } from "../../interface/IngredientData";

interface IngredientCardProps {
    id_ingrediente: number | undefined,
    nome: string,
    precoPorEmbalagem: number,
    qtPorEmbalagem: number,
    custoPorUnidade: number,
    handleDelete: (id: number | undefined) => void
}

export function IngredientCard({ id_ingrediente, nome, precoPorEmbalagem, qtPorEmbalagem, custoPorUnidade, handleDelete}: IngredientCardProps) {
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
                <div>Custo: R${custoPorUnidade}</div>
            </div>
            <div className="card-buttons">
                <button className="edit-button" onClick={() => openModalWithIngredient({ id_ingrediente, nome, precoPorEmbalagem, qtPorEmbalagem, custoPorUnidade })}><FaEdit /></button>

                <button className="delete-button" onClick={() => {
                    if (id_ingrediente !== undefined && window.confirm("Deseja realmente deletar este material?")) {
                        handleDelete(id_ingrediente);
                    }
                }}><FaTrash /></button>
            </div>
            {isModalOpen && <CreateIngredientModal type="material" ingredient={currentIngredient} closeModal={handleOpenModal} />}

        </div>
    )
}