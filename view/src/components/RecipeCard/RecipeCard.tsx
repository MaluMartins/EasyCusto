import "./recipeCard.css"
import { FaEdit, FaTrash } from 'react-icons/fa';

export function RecipeCard() {
    return (
        <div className="recipeCard">
            <div>
                <div>Bolo</div>
                <div>R$150,00</div>
            </div>
            <div className="card-buttons">
                <button className="edit-button"><FaEdit /></button>
                <button className="delete-button"><FaTrash /></button>
            </div>
        </div>
        
    )
}