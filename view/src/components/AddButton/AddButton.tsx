import { useIngredientData } from "../../hooks/useIngredientData";
import { IngredientData } from "../../interface/IngredientData";
import { CreateIngredientModal } from "../CreateIngredientModal/CreateIngredientModal";
import "./button.css"
import { useState } from 'react';

interface AddButtonProps {
    type: "material" | "receita",
    ingredient: IngredientData | null
}


export function AddButton({ type, ingredient }: AddButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }

    return (
        <div>
            {isModalOpen && <CreateIngredientModal type={type} ingredient={ingredient} closeModal={handleOpenModal} />}
            <button id="addButton" onClick={handleOpenModal}>+</button>
        </div>
    )
}