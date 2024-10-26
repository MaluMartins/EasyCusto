import { AddButton } from "../../components/AddButton/AddButton";
import { IngredientCard } from "../../components/IngredientCard/IngredientCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";

export function Ingredientes() {
    return (
        <div>
            <h1>Ingredientes</h1>
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