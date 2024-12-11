import { useState } from "react";
import { RecipeData } from "../../interface/RecipeData";
import "./search.css"
import { LuSearch } from "react-icons/lu";
import axios from "axios";

interface SearchBarProps {
    onSearchResults: (results: RecipeData[]) => void; 
  };

export function SearchBar({onSearchResults} : SearchBarProps) {
    const [query, setQuery] = useState<string>("")
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!query.trim()) {
            onSearchResults([]); 
            return;
        }

        try {
            setError(null); 
            const response = await axios.get(`http://localhost:8080/receitas/pesquisa`, {
                params: { termo: query }, 
              });
              onSearchResults(response.data);
        } catch (err) {
            console.error(err);
            setError("Erro ao buscar os dados. Por favor, tente novamente.");
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
                placeholder="Pesquisar..."
            />
            <button className="search-button" onClick={handleSearch}>
                <LuSearch />
            </button>
        </div>
    )
}