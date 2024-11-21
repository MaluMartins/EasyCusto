import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar"
import "./taxas.css"
import { CreateTaxModal } from "../../components/CreateTaxModal/CreateTaxModal";
import { TaxCard } from "../../components/TaxCard/TaxCard";
import { useTaxData } from "../../hooks/useTaxData";

export function Taxas() {
    const { data } = useTaxData();
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

            <div className="taxas-list">
                {data?.map(taxData => <TaxCard
                    nome={taxData.nome}
                    percentual={taxData.percentual}
                />)}
            </div>
        </div>
    )
}