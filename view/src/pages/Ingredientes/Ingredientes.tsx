import { AddButton } from "../../components/AddButton/AddButton";
import { IngredientCard } from "../../components/IngredientCard/IngredientCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import "./ingredientes.css";

export function Ingredientes() {
    return (
        <div id="ingredientesContainer">
            <Sidebar />
            <h1>Materiais</h1>
            <SearchBar />
            <AddButton />
            <IngredientCard />
            <IngredientCard />
            <IngredientCard />
            <IngredientCard />
            <IngredientCard />
        </div>
        
    )
}