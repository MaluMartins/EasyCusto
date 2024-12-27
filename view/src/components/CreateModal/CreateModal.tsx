import { useEffect, useState } from 'react';
import { useIngredientDataMutate } from '../../hooks/useIngredientDataMutate';
import { IngredientData } from '../../interface/IngredientData';
import "./createModal.css";
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
    ingredient: IngredientData | null,
    recipe: RecipeData | null
}

const Input = ({ id, label, value, type, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input id={id} value={value} type={type} onChange={event => updateValue(event.target.value)} />
        </>
    )
}

export function CreateIngredientModal({ closeModal, type, ingredient, recipe }: ModalProps) {
    const [nome, setNome] = useState(ingredient?.nome || recipe?.nome || "");

    //material/ingrediente
    const [precoPorEmbalagem, setPrecoPorEmbalagem] = useState(ingredient?.precoPorEmbalagem || 0);
    const [qtPorEmbalagem, setQtPorEmbalagem] = useState(ingredient?.qtPorEmbalagem || 0);
    const [unidadeMedida, setUnidadeMedida] = useState("g");
    const [custoPorUnidade] = useState(0);

    //receita
    const [rendimento, setRendimento] = useState(recipe?.rendimento || 0);
    const [margemLucro, setMargemLucro] = useState(recipe?.margemLucro || 0);
    const [horasPreparo, setHorasPreparo] = useState(recipe?.horasPreparo || 0);
    const [minutosPreparo, setMinutosPreparo] = useState(recipe?.minutosPreparo || 0);
    const [unidadeRendimento, setUnidadeRendimento] = useState("g");

    useEffect(() => {
        if (recipe?.unidadeRendimento) {
            setUnidadeRendimento(recipe.unidadeRendimento);
        } else if (ingredient?.unidadeMedida) {
            setUnidadeMedida(ingredient.unidadeMedida);
        }
    }, [recipe, ingredient]);

    const { mutate: mutateIngredient, update: updateIngredient } = useIngredientDataMutate();
    const { mutate: mutateRecipe, update: updateRecipe } = useRecipeDataMutate();

    const submitIngrediente = () => {
        const ingredientData: IngredientData = {
            nome,
            precoPorEmbalagem,
            qtPorEmbalagem,
            custoPorUnidade,
            unidadeMedida
        };

        if (ingredient?.id_ingrediente) {
            updateIngredient.mutate({ ...ingredientData, id_ingrediente: ingredient.id_ingrediente });
        } else {
            if (!nome || !qtPorEmbalagem || !precoPorEmbalagem) {
                alert('Preencha todos os campos');
                return;
            } else {
                mutateIngredient.mutate(ingredientData);
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
            unidadeRendimento,
            margemLucro,
            horasPreparo,
            minutosPreparo
        };

        if (recipe?.id_receita) {
            updateRecipe.mutate({ ...recipeData, id_receita: recipe.id_receita });
        } else {
            if (!nome || !rendimento || !margemLucro) {
                alert('Preencha todos os campos');
                return;
            } else {
                mutateRecipe.mutate(recipeData);
            }
        }
    };


    useEffect(() => {
        if (mutateRecipe.isSuccess || updateRecipe.isSuccess) {
            closeModal();
        }
    }, [mutateRecipe.isSuccess, updateRecipe.isSuccess]);

    var operacao;
    if (ingredient?.id_ingrediente || recipe?.id_receita) {
        operacao = "Editar"
    } else {
        operacao = "Cadastrar"
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUnidadeRendimento(event.target.value);
    };

    const handleChangeIng = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUnidadeMedida(event.target.value);
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
                                <select id="unidade-medida-qt" value={unidadeMedida} onChange={handleChangeIng}>
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
                                <select id="unidade-medida" value={unidadeRendimento} onChange={handleChange}>
                                    <option value="g">g</option>
                                    <option value="kg">kg</option>
                                    <option value="un">un</option>
                                </select>
                            </div>
                            <Input id="" label="Margem de lucro (%)" value={margemLucro} type="number" updateValue={setMargemLucro} />

                            <label>Tempo de preparo</label>
                            <div className="linha-unidade">
                                <div className="block">
                                    <label>horas</label>
                                    <br />
                                    <Input id="horas" label="" value={horasPreparo} type="number" updateValue={setHorasPreparo} />
                                </div>
                                <div className="block">
                                    <label>min</label>
                                    <br />
                                    <Input id="minutos" label="" value={minutosPreparo} type="number" updateValue={setMinutosPreparo} />
                                </div>
                            </div>
                        </>

                    )}

                    <button onClick={(e) => {
                        e.preventDefault();
                        type === "material" ? submitIngrediente() : submitReceita();
                    }} className='btn-secondary'>Confirmar</button>
                </form>
            </div>
        </div>
    )
}