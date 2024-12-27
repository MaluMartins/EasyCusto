import { useState } from "react"
import "./addIngredientModal.css"
import { useIngredientData } from "../../hooks/useIngredientData"

interface ModalProps {
    closeModal(): void
}

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} />
        </>
    )
}

export function AddIngredientModal({ closeModal }: ModalProps) {
    const [ingrediente, setIngrediente] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const [unidade, setUnidade] = useState("g");

    const { data: ingredients } = useIngredientData();

    const handleIngredientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;

        const selectedIngredient = ingredients?.find(ingredient => ingredient?.id_ingrediente?.toString() === selectedId);

        if (selectedIngredient) {
            setIngrediente(selectedId); 
            setUnidade(selectedIngredient.unidadeMedida || "g"); 
        }
    };

    const submit = () => { }

    return (
        <div>
            <div className="modal-overlay">
                <div className="modal-body">
                    <button className="close-btn" onClick={closeModal}>×</button>
                    <h2>Adicionar ingrediente</h2>
                    <form className="input-container">
                        <label>Ingrediente</label>
                        <select value={ingrediente} onChange={handleIngredientChange} >
                            <option value="">Selecione um ingrediente</option>
                            {ingredients?.map(ingredient => (
                                <option key={ingredient.id_ingrediente} value={ingredient.id_ingrediente}>
                                    {ingredient.nome}
                                </option>
                            ))}
                        </select>
                        
                        <label>Quantidade usada</label>
                        <div className="flex">
                            <Input label="" value={quantidade} updateValue={setQuantidade} />
                            <input id="unidade-medida" value={unidade} disabled></input>
                        </div>
                        
                        <button onClick={submit} className='btn-secondary'>Confirmar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}