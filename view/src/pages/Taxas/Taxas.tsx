import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar"
import "./taxas.css"
import { CreateTaxModal } from "../../components/CreateTaxModal/CreateTaxModal";
import { TaxCard } from "../../components/TaxCard/TaxCard";
import { useTaxData } from "../../hooks/useTaxData";
import axios from "axios";

const API_URL = 'http://localhost:8080';

export function Taxas() {
    const { data, refetch } = useTaxData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }

    const [taxas, setTaxas] = useState<any[]>([]);

    const handleDelete = async (id: number | undefined) => {
        try {
            await axios.delete(`${API_URL}/taxas/${id}`);
            setTaxas(taxas.filter(taxa => taxa.id !== id));
            refetch();
        } catch (error) {
            console.error('Erro ao deletar taxa:', error);
        }
    };

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
                    key={taxData.id_taxa}
                    id_taxa={taxData.id_taxa}
                    nome={taxData.nome}
                    percentual={taxData.percentual}
                    handleDelete={handleDelete}
                />)}
            </div>
        </div>
    )
}