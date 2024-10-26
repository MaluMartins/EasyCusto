import "./ingredientCard.css"
import { FaEdit, FaTrash } from 'react-icons/fa';

export function IngredientCard() {
    return (
        <div className="ingredientCard">
            <div>Farinha</div>
            <div className="card-buttons">
                <button className="edit-button"><FaEdit /></button>
                <button className="delete-button"><FaTrash /></button>
            </div>
            
        </div>
    )
}