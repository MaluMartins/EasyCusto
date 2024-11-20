import { useEffect, useState } from 'react';
import { useIngredientDataMutate } from '../../hooks/useIngredientDataMutate';
import { IngredientData } from '../../interface/IngredientData';
import "./createIngredientModal.css";

interface InputProps {
    id?: string,
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface ModalProps {
    type: "material" | "receita";
    closeModal(): void
}

const Input = ({ id, label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input id={id} value={value} onChange={event => updateValue(event.target.value)} />
        </>
    )
}

export function CreateIngredientModal({ closeModal, type }: ModalProps) {
    const [nome, setNome] = useState("");

    //material/ingrediente
    const [precoPorEmbalagem, setPrecoPorEmbalagem] = useState(0);
    const [qtPorEmbalagem, setQtPorEmbalagem] = useState(0);

    //receita
    const [unidadeMedida, setUnidadeMedida] = useState("");
    const [rendimento, setRendimento] = useState(0);
    const [margemLucro, setMargemLucro] = useState(0);
    const [horasPreparo, setHorasPreparo] = useState(0);
    const [minutosPreparo, setMinutosPreparo] = useState(0);

    const { mutate, isSuccess } = useIngredientDataMutate();

    const submit = () => {
        const ingredientData: IngredientData = {
            nome,
            precoPorEmbalagem,
            qtPorEmbalagem
        }

        mutate(ingredientData)
    }

    useEffect(() => {
        if (!isSuccess) return
        closeModal();
    }, [isSuccess])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button className="close-btn" onClick={closeModal}>×</button>
                <h2>{type === "material" ? "Cadastrar Material" : "Cadastrar Receita"}</h2>
                <form className="input-container">
                    <Input label="Nome" value={nome} updateValue={setNome} />

                    {type === "material" && (
                        <>
                            <Input label="Preço por embalagem" value={precoPorEmbalagem} updateValue={setPrecoPorEmbalagem} />
                            <Input label="Quantidade por embalagem" value={qtPorEmbalagem} updateValue={setQtPorEmbalagem} />
                        </>
                    )}

                    {type === "receita" && (
                        <>
                            <label>Rendimento</label>
                            <div className="linha-unidade">
                                <Input id="rendimento" label="" value={rendimento} updateValue={setRendimento} />
                                <Input id="unidade-medida" label="" value={unidadeMedida} updateValue={setUnidadeMedida} />
                            </div>
                            <Input id="" label="Margem de lucro (%)" value={margemLucro} updateValue={setMargemLucro} />
                            
                            <label>Tempo de preparo</label>
                            <div className="linha-unidade">
                                <Input id="horas" label="" value={horasPreparo} updateValue={setHorasPreparo} />
                                <Input id="minutos" label="" value={minutosPreparo} updateValue={setMinutosPreparo} />
                            </div>
                        </>

                    )}
                    <button onClick={submit} className='btn-secondary'>Confirmar</button>
                </form>
            </div>
        </div>
    )
}