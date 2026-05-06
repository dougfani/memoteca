import ui from './ui.js';
import api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.querySelector('#pensamento-form');
    const btnCancelar = document.querySelector('#botao-cancelar');

    formularioPensamento.addEventListener('submit', manipularSubmissaoFormulario);
    btnCancelar.addEventListener('click', manipularCancelamento);
});

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = document.querySelector('#pensamento-id').value;
    const conteudo = document.querySelector('#pensamento-conteudo').value;
    const autoria = document.querySelector('#pensamento-autoria').value;

    try {
        await api.salvarPensamento({
            conteudo,
            autoria,
        });
        ui.renderizarPensamentos();
    } catch (error) {
        alert('Erro ao salvar pensamento');
    }
}

function manipularCancelamento() {
    ui.limparFormulario();
}
