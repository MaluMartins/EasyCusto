import { Sidebar } from "../../components/Sidebar/Sidebar"
import "./taxas.css"

export function Taxas() {
    return (
        <div id="taxasContainer">
            <Sidebar />
            <h1>Taxas</h1>
            <h4>Cadastre aqui taxas como maquininha, delivery e gastos incalculáveis como água e luz.</h4>
            <p>Obs: As taxas cadastradas serão contabilizadas em cada receita de forma individual.</p>
        </div>
    )
}