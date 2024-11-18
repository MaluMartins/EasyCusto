import { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

export function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <button className={`hamburger ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                {isSidebarOpen ? '✕' : '☰'}
            </button>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h2>EasyCusto</h2>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Página principal</Link>
                        </li>
                        <li>
                            <Link to="/products">Minhas taxas</Link>
                        </li>
                        <li>
                            <Link to="/orders">Meu salário</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}