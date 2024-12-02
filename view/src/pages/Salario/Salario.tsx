import { useEffect, useState } from 'react';
import "./salario.css"
import { Sidebar } from '../../components/Sidebar/Sidebar';
import axios from 'axios';

const API_URL = "http://localhost:8080/salario";

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

export function Salario() {
    const [salarioId, setSalarioId] = useState(0);
    const [salarioMensal, setSalarioMensal] = useState(0);
    const [horasPorDia, setHorasPorDia] = useState(0);
    const [diasPorSemana, setDiasPorSemana] = useState(0);
    const [salarioPorHora, setSalarioPorHora] = useState(0);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                if (response.status === 200 && response.data) {
                    const { id_salario, salarioMensal, horasPorDia, diasPorSemana, salarioPorHora } = response.data;
                    setSalarioId(id_salario);
                    setSalarioMensal(salarioMensal);
                    setHorasPorDia(horasPorDia);
                    setDiasPorSemana(diasPorSemana);
                    setSalarioPorHora(salarioPorHora);
                }
            })
            .catch(error => {
                console.error("Erro ao buscar salário:", error);
            });
    }, [refresh]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = { salarioMensal, horasPorDia, diasPorSemana };

        try {
            if (salarioId) {
                await axios.put(`${API_URL}/${salarioId}`, data);
            } else {
                const response = await axios.post(API_URL, data);
                setSalarioId(response.data.id); 
            }
        } catch (error) {
            console.error("Erro ao salvar salário:", error);
        }
        setRefresh(!refresh);
    };

    return (
        <div id="salarioContainer">
            <Sidebar />
            <h1>Meu salário</h1>
            <form className="input-container">
                <Input label="Salário mensal desejado" value={salarioMensal} updateValue={setSalarioMensal} />
                <Input label="Horas trabalhadas por dia" value={horasPorDia} updateValue={setHorasPorDia} />
                <Input label="Dias trabalhados por semana" value={diasPorSemana} updateValue={setDiasPorSemana} />
                <button className='btn-secondary' onClick={handleSubmit}>Confirmar</button>
            </form>
            <h4>Seu salário por hora trabalhada é: R${salarioPorHora} </h4>
        </div>
    )
}