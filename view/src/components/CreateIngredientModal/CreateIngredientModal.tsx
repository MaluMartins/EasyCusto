import { useEffect, useState } from 'react';
import { useIngredientDataMutate } from '../../hooks/useIngredientDataMutate';
import { IngredientData } from '../../interface/IngredientData';
import "./createIngredientModal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue}: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}/>
        </>
    )
}

export function CreateIngredientModal({closeModal}: ModalProps) {
    const [nome, setNome] = useState("");
    const [precoPorEmbalagem, setPrecoPorEmbalagem] = useState(0);
    const [qtPorEmbalagem, setQtPorEmbalagem] = useState(0);
    const {mutate, isSuccess} = useIngredientDataMutate();

    const submit = () => {
        const ingredientData: IngredientData = {
            nome,
            precoPorEmbalagem,
            qtPorEmbalagem
        }

        mutate(ingredientData)
    }

    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <button className="close-btn" onClick={closeModal}>×</button>
                <h2>Cadastrar material</h2>
                <form className="input-contlainer">
                    <Input label="Nome" value={nome} updateValue={setNome} />
                    <Input label="Preço por embalagem" value={precoPorEmbalagem} updateValue={setPrecoPorEmbalagem} />
                    <Input label="Quantidade por embalagem" value={qtPorEmbalagem} updateValue={setQtPorEmbalagem} />
                    <button onClick={submit} className='btn-secondary'>Confirmar</button>
                </form>
            </div>
        </div>
    )
}