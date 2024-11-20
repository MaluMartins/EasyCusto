import { AddButton } from "../../components/AddButton/AddButton";
import { IngredientCard } from "../../components/IngredientCard/IngredientCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import "./ingredientes.css";

export function Ingredientes() {
    return (
        <div id="ingredientesContainer">
            <h1>Materiais</h1>
            <SearchBar />
            <AddButton type="material" />
            <IngredientCard />
            <IngredientCard />
            <IngredientCard />
            <IngredientCard />
            <IngredientCard />
        </div>
        
    )
}