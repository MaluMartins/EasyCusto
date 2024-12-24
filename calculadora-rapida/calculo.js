const formularioDiv = document.querySelector('#formulario');
const resultadosDiv = document.querySelector('#resultados');
const form = document.querySelector('form');
const btnRecalcular = document.querySelector('#btnRecalcular');

const precoVendaEl = document.querySelector('#precoVenda');
const lucroTotalEl = document.querySelector('#lucroTotal');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const custoIngredientes = parseFloat(document.querySelector('#custoIngredientes').value.trim());
    const custosFixos = parseFloat(document.querySelector('#custosFixos').value.trim());
    const margemLucro = parseFloat(document.querySelector('#margemLucro').value.trim());

    if (isNaN(custoIngredientes) || isNaN(custosFixos) || isNaN(margemLucro)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    const custoTotal = custoIngredientes + custosFixos;
    const precoVenda = custoTotal + (custoTotal * margemLucro / 100);
    const lucroTotal = precoVenda - custoTotal;

    precoVendaEl.textContent = `Preço de venda: R$${precoVenda.toFixed(2).replace('.', ',')}`;
    lucroTotalEl.textContent = `Lucro total: R$${lucroTotal.toFixed(2).replace('.', ',')}`;

    formularioDiv.style.display = 'none';
    resultadosDiv.style.display = 'block';
});

btnRecalcular.addEventListener('click', () => {
    resultadosDiv.style.display = 'none';
    formularioDiv.style.display = 'block';

    form.reset();
});
