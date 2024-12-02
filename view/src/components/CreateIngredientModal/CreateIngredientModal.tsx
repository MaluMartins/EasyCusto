import { useEffect, useState } from 'react';
import { useIngredientDataMutate } from '../../hooks/useIngredientDataMutate';
import { IngredientData } from '../../interface/IngredientData';
import "./createIngredientModal.css";
import { RecipeData } from '../../interface/RecipeData';
import { useRecipeDataMutate } from '../../hooks/useRecipeDataMutate';

interface InputProps {
    id?: string,
    label: string,
    value: string | number,
    type?: string,
    updateValue(value: any): void
}

interface ModalProps {
    type: "material" | "receita",
    closeModal(): void,
    ingredient: IngredientData | null
}

const Input = ({ id, label, value, type, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input id={id} value={value} type={type} onChange={event => updateValue(event.target.value)} />
        </>
    )
}

export function CreateIngredientModal({ closeModal, type, ingredient }: ModalProps) {

    //material/ingrediente
    const [nome, setNome] = useState(ingredient?.nome || "");
    const [precoPorEmbalagem, setPrecoPorEmbalagem] = useState(ingredient?.precoPorEmbalagem || 0);
    const [qtPorEmbalagem, setQtPorEmbalagem] = useState(ingredient?.qtPorEmbalagem || 0);
    const [unidadeMedidaQtEmbalagem, setUnidadeMedidaQtEmbalagem] = useState("");
    const [custoPorUnidade, setCustoPorUnidade] = useState(0);

    //receita
    const [unidadeMedidaRendimento, setUnidadeMedidaRendimento] = useState("");
    const [rendimento, setRendimento] = useState(0);
    const [margemLucro, setMargemLucro] = useState(0);
    const [horasPreparo, setHorasPreparo] = useState(0);
    const [minutosPreparo, setMinutosPreparo] = useState(0);

    const { mutate: mutateIngredient, update: updateIngredient } = useIngredientDataMutate();
    const { mutate: mutateRecipe, isSuccess: isRecipeSuccess } = useRecipeDataMutate();
    
    const submitIngrediente = () => {
        const ingredientData: IngredientData = {
            nome,
            precoPorEmbalagem,
            qtPorEmbalagem,
            custoPorUnidade
        };

        if (ingredient?.id_ingrediente) {
            updateIngredient.mutate({ ...ingredientData, id_ingrediente: ingredient.id_ingrediente });
        } else {
            mutateIngredient.mutate(ingredientData);
            if (!nome || !qtPorEmbalagem || !precoPorEmbalagem) {
                alert('Preencha todos os campos');
                return;
            }
        }
    };

    useEffect(() => {
        if (mutateIngredient.isSuccess || updateIngredient.isSuccess) {
            closeModal();
        }
    }, [mutateIngredient.isSuccess, updateIngredient.isSuccess]);

    const submitReceita = () => {

        const recipeData: RecipeData = {
            nome,
            rendimento,
            margemLucro,
            horasPreparo,
            minutosPreparo
        };

        mutateRecipe(recipeData);
    };


    useEffect(() => {
        if (isRecipeSuccess) {
            closeModal();
        }
    }, [isRecipeSuccess]);

    var operacao;
    if (ingredient?.id_ingrediente) {
        operacao = "Editar"
    } else {
        operacao = "Cadastrar"
    }

    const [selectedUnit, setSelectedUnit] = useState("g");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUnit(event.target.value);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button className="close-btn" onClick={closeModal}>×</button>
                <h2>{type === "material" ? operacao + " Material" : operacao + " Receita"}</h2>
                <form className="input-container">
                    
                    {type === "material" && (
                        <>
                            <Input label="Nome" value={nome} updateValue={setNome} />
                            <Input label="Preço por embalagem" value={precoPorEmbalagem} updateValue={setPrecoPorEmbalagem} />

                            <label>Quantidade por embalagem</label>
                            <div className="linha-unidade">
                                <Input label="" value={qtPorEmbalagem} updateValue={setQtPorEmbalagem} />
                                <select id="unidade-medida-qt" value={selectedUnit} onChange={handleChange}>
                                    <option value="g">g</option>
                                    <option value="un">un</option>
                                </select>
                            </div>
                        </>
                    )}

                    {type === "receita" && (
                        <>
                            <Input label="Nome" value={nome} updateValue={setNome} />
                            <label>Rendimento</label>
                            <div className="linha-unidade">
                                <Input id="rendimento" label="" value={rendimento} type="number" updateValue={setRendimento} />
                                <select id="unidade-medida" value={selectedUnit} onChange={handleChange}>
                                    <option value="g">g</option>
                                    <option value="un">un</option>
                                </select>                            </div>
                            <Input id="" label="Margem de lucro (%)" value={margemLucro} type="number" updateValue={setMargemLucro} />

                            <label>Tempo de preparo</label>
                            <div className="linha-unidade">
                                <Input id="horas" label="" value={horasPreparo} type="number" updateValue={setHorasPreparo} />
                                <Input id="minutos" label="" value={minutosPreparo} type="number" updateValue={setMinutosPreparo} />
                            </div>
                        </>

                    )}

                    <button onClick={type === "material" ? submitIngrediente : submitReceita} className='btn-secondary'>Confirmar</button>
                </form>
            </div>
        </div>
    )
}