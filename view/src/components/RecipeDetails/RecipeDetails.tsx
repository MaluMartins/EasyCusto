import "./recipeDetails.css";

interface RecipeDetailsProps {
    nome: string;
    rendimento: number;
    unidadeRendimento: string;
    margemLucro: number;
    horasPreparo: number;
    minutosPreparo: number;
}

export function RecipeDetails({
    nome,
    rendimento,
    unidadeRendimento,
    margemLucro,
    horasPreparo,
    minutosPreparo,
}: RecipeDetailsProps) {
    return (
        <div className="recipe-details-container">
            <h1 className="recipe-title">{nome}</h1>
            <div className="details-grid">
                <div className="detail-item">
                    <span className="detail-label">Rendimento:</span>
                    <span className="detail-value">{rendimento} {unidadeRendimento}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Margem de Lucro:</span>
                    <span className="detail-value">{margemLucro}%</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Tempo de Preparo:</span>
                    <span className="detail-value">
                        {horasPreparo}h {minutosPreparo}min
                    </span>
                </div>
            </div>
        </div>
    );
}
