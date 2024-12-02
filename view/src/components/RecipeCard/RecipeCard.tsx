import "./recipeCard.css"
import { FaEdit, FaTrash } from 'react-icons/fa';

interface RecipeProps {
    id_receita: number | undefined,
    nome: string,
    handleDelete: (id: number | undefined) => void
}

export function RecipeCard({ id_receita, nome, handleDelete }: RecipeProps) {
    return (
        <div className="recipeCard" key={id_receita}>
            <div>
                <div>{nome}</div>
            </div>
            <div className="card-buttons">
            <button className="edit-button"><FaEdit /></button>
                <button className="delete-button" onClick={() => {
                    if (id_receita !== undefined && window.confirm("Deseja realmente deletar esta receita?")) {
                        handleDelete(id_receita);
                    }
                }}><FaTrash /></button>
            </div>
        </div>
        
    )
}