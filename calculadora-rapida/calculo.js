// Selecionando os elementos
const formularioDiv = document.querySelector('#formulario');
const resultadosDiv = document.querySelector('#resultados');
const form = document.querySelector('form');
const btnRecalcular = document.querySelector('#btnRecalcular');

// Selecionando os elementos para exibir os resultados
const precoVendaEl = document.querySelector('#precoVenda');
const lucroTotalEl = document.querySelector('#lucroTotal');

// Função para calcular o preço
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtendo os valores do formulário
    const custoIngredientes = parseFloat(document.querySelector('#custoIngredientes').value.replace('R$', '').replace(',', '.').trim());
    const custosFixos = parseFloat(document.querySelector('#custosFixos').value.replace('R$', '').replace(',', '.').trim());
    const margemLucro = parseFloat(document.querySelector('#margemLucro').value.trim());

    if (isNaN(custoIngredientes) || isNaN(custosFixos) || isNaN(margemLucro)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    // Calculando
    const custoTotal = custoIngredientes + custosFixos;
    const precoVenda = custoTotal + (custoTotal * margemLucro / 100);
    const lucroTotal = precoVenda - custoTotal;

    // Atualizando os resultados
    precoVendaEl.textContent = `Preço de venda: R$${precoVenda.toFixed(2).replace('.', ',')}`;
    lucroTotalEl.textContent = `Lucro total: R$${lucroTotal.toFixed(2).replace('.', ',')}`;

    // Alternando a exibição
    formularioDiv.style.display = 'none';
    resultadosDiv.style.display = 'block';
});

// Função para recalcular
btnRecalcular.addEventListener('click', () => {
    // Alternando a exibição de volta
    resultadosDiv.style.display = 'none';
    formularioDiv.style.display = 'block';

    // Opcional: limpa os campos do formulário
    form.reset();
});
