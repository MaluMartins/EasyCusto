import { useState } from "react";
import "./taxCard.css"
import { FaEdit, FaTrash } from 'react-icons/fa';
import { TaxData } from "../../interface/TaxData";
import { CreateTaxModal } from "../CreateTaxModal/CreateTaxModal";

interface TaxCardProps {
    id_taxa: number | undefined,
    nome: string,
    percentual: number,
    handleDelete: (id: number | undefined) => void
}

export function TaxCard({ id_taxa, nome, percentual, handleDelete }: TaxCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTax, setCurrentTax] = useState<TaxData | null>(null);

    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev);
    };

    const openModalWithTax = (tax: TaxData) => {
        setCurrentTax(tax);
        setIsModalOpen(true);
    };

    return (
        <div className="taxCard" key={id_taxa}>
            <div>
                <div>{nome}</div>
                <div>{percentual}%</div>
            </div>
            <div className="card-buttons">
                <button className="edit-button" onClick={() => openModalWithTax({ id_taxa, nome, percentual })}>
                    <FaEdit />
                </button>
                
                <button className="delete-button" onClick={() => {
                    if (id_taxa !== undefined && window.confirm("Deseja realmente deletar esta taxa?")) {
                        handleDelete(id_taxa);
                    }
                }}><FaTrash /></button>
            </div>

            {isModalOpen && <CreateTaxModal tax={currentTax} closeModal={handleOpenModal} />}
        </div>
    )
}