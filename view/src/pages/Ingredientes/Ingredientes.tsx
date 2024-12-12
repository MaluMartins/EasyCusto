import { useState } from "react";
import { IngredientCard } from "../../components/IngredientCard/IngredientCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import "./ingredientes.css";
import { useIngredientData } from "../../hooks/useIngredientData";
import axios from "axios";
import { CreateIngredientModal } from "../../components/CreateIngredientModal/CreateModal";

const API_URL = 'http://localhost:8080';

export function Ingredientes() {
    const { data: allIngredients, refetch } = useIngredientData(); 
    const [filteredIngredients, setFilteredIngredients] = useState<any[]>([]);

    const handleSearchResults = (results: any[]) => {
        setFilteredIngredients(results);
    };

    const handleDelete = async (id: number | undefined) => {
        try {
            await axios.delete(`${API_URL}/ingredientes/${id}`);
            refetch();
            setFilteredIngredients((prev) => prev.filter((ingrediente) => ingrediente.id !== id));
        } catch (error) {
            console.error('Erro ao deletar ingrediente:', error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }

    const ingredientesParaExibir = filteredIngredients.length > 0 ? filteredIngredients : allIngredients;

    return (
        <div id="ingredientesContainer">
            <h1>Materiais</h1>
            <SearchBar onSearchResults={handleSearchResults} type="material" />

            <div className="materiais-list">
                {ingredientesParaExibir?.map((ingredientData) => <IngredientCard
                    key={ingredientData.id_ingrediente}
                    id_ingrediente={ingredientData.id_ingrediente}
                    nome={ingredientData.nome}
                    precoPorEmbalagem={ingredientData.precoPorEmbalagem}
                    qtPorEmbalagem={ingredientData.qtPorEmbalagem}
                    custoPorUnidade={ingredientData.custoPorUnidade}
                    unidadeMedida={ingredientData.unidadeMedida}
                    handleDelete={handleDelete}
                />)}
            </div>

            <div>
                {isModalOpen && <CreateIngredientModal type="material" ingredient={null} recipe={null} closeModal={handleOpenModal} />}
                <button id="addButton" onClick={handleOpenModal}>+</button>
            </div>
        </div>

    )
}