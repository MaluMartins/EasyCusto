import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar"
import "./taxas.css"
import { CreateTaxModal } from "../../components/CreateTaxModal/CreateTaxModal";

export function Taxas() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }

    return (
        <div id="taxasContainer">
            <Sidebar />
            <h1>Taxas</h1>
            <h4>Cadastre aqui taxas como maquininha, delivery e gastos incalculáveis como água e luz.</h4>
            <p>Obs: As taxas cadastradas serão contabilizadas em cada receita de forma individual.</p>

            {isModalOpen && <CreateTaxModal closeModal={handleOpenModal} />}
            <button onClick={handleOpenModal} className="btn-secondary">Nova taxa</button>
        </div>
    )
}