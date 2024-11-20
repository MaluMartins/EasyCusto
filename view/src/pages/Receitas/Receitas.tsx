import { AddButton } from "../../components/AddButton/AddButton";
import { CategoryCard } from "../../components/CategoryCard/CategoryCard";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import "./receitas.css"

export function Receitas() {
    return (
        <div id="receitasContainer">
            <h1>Receitas</h1>
            <SearchBar />
            <div className="categorias">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />  
            <AddButton type="receita" />
        </div>
        
    )
}