import { useState } from 'react';
import "./salario.css"
import { Sidebar } from '../../components/Sidebar/Sidebar';

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
    const [salarioMensal, setSalarioMensal] = useState(0);
    const [horasPorDia, setHorasPorDia] = useState(0);
    const [diasPorSemana, setDiasPorSemana] = useState(0);

    return (
        <div id="salarioContainer">
            <Sidebar />
            <h1>Meu salário</h1>
            <form className="input-container">
                <Input label="Salário mensal desejado" value={salarioMensal} updateValue={setSalarioMensal} />
                <Input label="Horas trabalhadas por dia" value={horasPorDia} updateValue={setHorasPorDia} />
                <Input label="Dias trabalhados por semana" value={diasPorSemana} updateValue={setDiasPorSemana} />
                <button className='btn-secondary'>Confirmar</button>
            </form>
            <h4>Seu salário por hora trabalhada é: </h4>
        </div>
    )
}