import { CreateIngredientModal } from "../CreateIngredientModal/CreateIngredientModal";
import "./button.css"
import { useState } from 'react';

interface AddButtonProps {
    type: "material" | "receita";
}


export function AddButton({ type }: AddButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }

    return (
        <div>
            {isModalOpen && <CreateIngredientModal type={type} closeModal={handleOpenModal} />}
            <button id="addButton" onClick={handleOpenModal}>+</button>
        </div>
    )
}