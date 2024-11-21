import { useEffect, useState } from "react";
import { TaxData } from "../../interface/TaxData";
import { useTaxDataMutate } from "../../hooks/useTaxDataMutate";
import "../CreateIngredientModal/createIngredientModal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

const Input = ({ label, value, updateValue}: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}/>
        </>
    )
}   

interface ModalProps {
    closeModal(): void
}

export function CreateTaxModal({closeModal}: ModalProps) {
    const [nome, setNome] = useState("");
    const [percentual, setPercentual] = useState(0);
    const {mutate, isSuccess} = useTaxDataMutate();

    const submit = () => {
        const taxData: TaxData = {
            nome,
            percentual
        }

        mutate(taxData)
    }

    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <button className="close-btn" onClick={closeModal}>×</button>
                <h2>Cadastrar taxa</h2>
                <form className="input-container">
                    <Input label="Nome" value={nome} updateValue={setNome} />
                    <Input label="Taxa (%)" value={percentual} updateValue={setPercentual} />

                    <button onClick={submit} className='btn-secondary'>Confirmar</button>
                </form>
            </div>
        </div>
    ) 
}