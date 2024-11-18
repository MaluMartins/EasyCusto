import './App.css'
import Tabs from './components/Tabs/Tabs';
import { Ingredientes } from './pages/Ingredientes/Ingredientes';
import { Receitas } from './pages/Receitas/Receitas';
import { AppRoutes } from './routes/AppRoutes'


function App() {
    const tabData = [
      { label: 'Receitas', content: <Receitas /> },
      { label: 'Materiais', content: <Ingredientes /> },
    ];

  return (
    <div className="app">
      <AppRoutes />
      <Tabs tabs={tabData} />
    </div>
  )
}

export default App