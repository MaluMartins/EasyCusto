import { useEffect, useState } from "react";
import { TaxData } from "../../interface/TaxData";
import { useTaxDataMutate } from "../../hooks/useTaxDataMutate";

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
    closeModal(): void,
    tax: TaxData | null
}

export function CreateTaxModal({closeModal, tax}: ModalProps) {
    const [nome, setNome] = useState(tax?.nome || "");
    const [percentual, setPercentual] = useState(tax?.percentual || 0);
    const { mutate: mutateTax, update: updateTax } = useTaxDataMutate();

    const submit = () => {
        const taxData: TaxData = {
            nome,
            percentual
        }

        if (tax?.id_taxa) {
            updateTax.mutate({ ...taxData, id_taxa: tax.id_taxa });
        } else {
            if (!nome || !percentual) {
                alert('Preencha todos os campos');
                return;
            } else {
                mutateTax.mutate(taxData);
            }
        }
    }

    useEffect(() => {
        if (mutateTax.isSuccess || updateTax.isSuccess) {
            closeModal();
        }
    }, [mutateTax.isSuccess, updateTax.isSuccess]);

    var operacao;
    if (tax?.id_taxa) {
        operacao = "Editar taxa"
    } else {
        operacao = "Cadastrar taxa"
    }

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <button className="close-btn" onClick={closeModal}>×</button>
                <h2>{operacao}</h2>
                <form className="input-container">
                    <Input label="Nome" value={nome} updateValue={setNome} />
                    <Input label="Taxa (%)" value={percentual} updateValue={setPercentual} />

                    <button onClick={submit} className='btn-secondary'>Confirmar</button>
                </form>
            </div>
        </div>
    ) 
}