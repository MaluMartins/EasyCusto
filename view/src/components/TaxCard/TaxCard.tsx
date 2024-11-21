import "./taxCard.css"
import { FaEdit, FaTrash } from 'react-icons/fa';

interface TaxCardProps {
    id_taxa: number | undefined,
    nome: string,
    percentual: number,
    handleDelete: (id: number | undefined) => void
}

export function TaxCard({ id_taxa, nome, percentual, handleDelete }: TaxCardProps) {
    return (
        <div className="taxCard" key={id_taxa}>
            <div>
                <div>{nome}</div>
                <div>{percentual}%</div>
            </div>
            <div className="card-buttons">
                <button className="edit-button"><FaEdit /></button>
                <button className="delete-button" onClick={() => {
                    if (id_taxa !== undefined && window.confirm("Deseja realmente deletar esta taxa?")) {
                        handleDelete(id_taxa);
                    }
                }}><FaTrash /></button>
            </div>

        </div>
    )
}