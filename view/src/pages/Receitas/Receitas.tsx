import { AddButton } from "../../components/AddButton/AddButton";
import { CategoryCard } from "../../components/CategoryCard/CategoryCard";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import "./receitas.css"

export function Receitas() {
    return (
        <div id="receitasContainer">
            <Sidebar />
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
            <AddButton />
        </div>
        
    )
}