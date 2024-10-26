import "./search.css"
import { LuSearch } from "react-icons/lu";

export function SearchBar() {
    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Pesquisar..."
            />
            <button className="search-button">
                <LuSearch />
            </button>
        </div>
    )
}