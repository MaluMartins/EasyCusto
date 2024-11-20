import { Sidebar } from "../../components/Sidebar/Sidebar";
import Tabs from "../../components/Tabs/Tabs";
import { Ingredientes } from "../Ingredientes/Ingredientes";
import { Receitas } from "../Receitas/Receitas";

export function Principal() {
    const tabData = [
        { label: 'Receitas', content: <Receitas /> },
        { label: 'Materiais', content: <Ingredientes /> },
      ];

    return (
        <div>
            <Sidebar />
            <Tabs tabs={tabData} />
        </div>
    )
}