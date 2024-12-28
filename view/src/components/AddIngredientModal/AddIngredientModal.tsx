import { useState } from "react"
import "./addIngredientModal.css"
import { useIngredientData } from "../../hooks/useIngredientData"
import { useRecipeIngredientDataMutate } from "../../hooks/useRecipeIngredientDataMutate"
import { IngredientData } from "../../interface/IngredientData"

interface ModalProps {
    closeModal(): void,
    id_receita: number
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

export function AddIngredientModal({ closeModal, id_receita }: ModalProps) {
    const [ingrediente, setIngrediente] = useState("");
    const [quantidade, setQuantidade] = useState<number>(0);
    const [unidade, setUnidade] = useState("g");
    const { assignIngredientToRecipe, isLoading } = useRecipeIngredientDataMutate();
    const [selectedIngredient, setSelectedIngredient] = useState<IngredientData>();

    const { data: ingredients } = useIngredientData();

    const handleIngredientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;

        const foundIngredient = ingredients?.find(ingredient => ingredient?.id_ingrediente?.toString() === selectedId);
        
        if (foundIngredient) {
            setIngrediente(selectedId); 
            setUnidade(foundIngredient?.unidadeMedida || "g"); 
            setSelectedIngredient(foundIngredient)
        }
    };

    const submit = async () => { 
        if (!ingrediente || quantidade <= 0) {
            alert("Preencha todos os campos corretamente.");
            return;
          }
      
          try {
            await assignIngredientToRecipe(id_receita, { id: selectedIngredient?.id_ingrediente , qtUsada: quantidade });
            alert("Ingrediente adicionado à receita com sucesso!");
            closeModal();
          } catch (err) {
            console.error(err);
          }
    }

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
                            <input id="unidade-ingrediente" value={unidade} disabled></input>
                        </div>
                        
                        <button onClick={submit} disabled={isLoading} className='btn-secondary'>
                            {isLoading ? "Adicionando..." : "Confirmar"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}