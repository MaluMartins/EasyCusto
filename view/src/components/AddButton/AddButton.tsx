import { CreateIngredientModal } from "../CreateIngredientModal/CreateIngredientModal";
import "./button.css"
import { useState } from 'react';

export function AddButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }

    return (
        <div>
            {isModalOpen && <CreateIngredientModal closeModal={handleOpenModal} />}
            <button id="addButton" onClick={handleOpenModal}>+</button>
        </div>
    )
}