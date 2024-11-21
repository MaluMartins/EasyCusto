import "./taxCard.css"
import { FaEdit, FaTrash } from 'react-icons/fa';

interface TaxCardProps {
    nome: string,
    percentual: number
}

export function TaxCard({nome, percentual}: TaxCardProps) {
    return (
        <div className="taxCard">
            <div>
            <div>{nome}</div>
            <div>{percentual}%</div>
            </div>
            <div className="card-buttons">
                <button className="edit-button"><FaEdit /></button>
                <button className="delete-button"><FaTrash /></button>
            </div>
            
        </div>
    )
}