import { useState } from "react";
import { IngredientCard } from "../../components/IngredientCard/IngredientCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import "./ingredientes.css";
import { useIngredientData } from "../../hooks/useIngredientData";
import axios from "axios";
import { CreateIngredientModal } from "../../components/CreateIngredientModal/CreateIngredientModal";

const API_URL = 'http://localhost:8080';

export function Ingredientes() {
    const { data, refetch } = useIngredientData();
    const [ingredientes, setIngredientes] = useState<any[]>([]);

    const handleDelete = async (id: number | undefined) => {
        try {
            await axios.delete(`${API_URL}/ingredientes/${id}`);
            setIngredientes(ingredientes.filter(ingrediente => ingrediente.id !== id));
            refetch();
        } catch (error) {
            console.error('Erro ao deletar ingrediente:', error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }

    return (
        <div id="ingredientesContainer">
            <h1>Materiais</h1>
            <SearchBar />

            <div className="materiais-list">
                {data?.map(ingredientData => <IngredientCard
                    key={ingredientData.id_ingrediente}
                    id_ingrediente={ingredientData.id_ingrediente}
                    nome={ingredientData.nome}
                    precoPorEmbalagem={ingredientData.precoPorEmbalagem}
                    qtPorEmbalagem={ingredientData.qtPorEmbalagem}
                    custoPorUnidade={ingredientData.custoPorUnidade}
                    handleDelete={handleDelete}
                />)}
            </div>

            <div>
            {isModalOpen && <CreateIngredientModal type="material" ingredient={null} closeModal={handleOpenModal} />}
            <button id="addButton" onClick={handleOpenModal}>+</button>
        </div>
        </div>
        
    )
}