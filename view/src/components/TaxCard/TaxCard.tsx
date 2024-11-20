import "./taxCard.css"
import { FaEdit, FaTrash } from 'react-icons/fa';

export function TaxCard() {
    return (
        <div className="taxCard">
            <div>
            <div>iFood</div>
            <div>10,5%</div>
            </div>
            <div className="card-buttons">
                <button className="edit-button"><FaEdit /></button>
                <button className="delete-button"><FaTrash /></button>
            </div>
            
        </div>
    )
}