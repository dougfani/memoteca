import api from './api.js';

const ui = {
    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId);
        document.querySelector('#pensamento-id').value = pensamento.id;
        document.querySelector('#pensamento-conteudo').value = pensamento.conteudo;
        document.querySelector('#pensamento-autoria').value = pensamento.autoria;
    },

    limparFormulario() {
        document.querySelector('#pensamento-form').reset();
    },

    async renderizarPensamentos() {
        const listaPensamentos = document.querySelector('#lista-pensamentos');
        listaPensamentos.innerHTML = '';

        try {
            const pensamentos = await api.buscarPensamentos();
            pensamentos.forEach(ui.adicionarPensamentoNaLista);
        } catch {
            alert('Erro ao renderizar pensamentos');
        }

        if (listaPensamentos.innerHTML == '') {
            ui.adicionarListaVazia();
        }
    },

    adicionarListaVazia() {
        const listaPensamentosContainer = document.querySelector('#lista-pensamentos-container');

        const paragrafo = document.createElement('p');
        paragrafo.textContent = 'Nada por aqui ainda, que tal compartilhar alguma ideia?';

        const imgVazia = document.createElement('img');
        imgVazia.setAttribute('src', 'assets/imagens/lista-vazia.png');
        imgVazia.setAttribute('alt', 'Imagem de gaveta vazia');

        listaPensamentosContainer.append(paragrafo, imgVazia);
    },

    adicionarPensamentoNaLista(pensamento) {
        const listaPensamentos = document.querySelector('#lista-pensamentos');
        const li = document.createElement('li');
        li.setAttribute('data-id', pensamento.id);
        li.classList.add('li-pensamento');

        const iconeAspas = document.createElement('img');
        iconeAspas.src = 'assets/imagens/aspas-azuis.png';
        iconeAspas.alt = 'Aspas Azuis';
        iconeAspas.classList.add('icone-aspas');

        const pensamentoConteudo = document.createElement('div');
        pensamentoConteudo.textContent = pensamento.conteudo;
        pensamentoConteudo.classList.add('pensamento-conteudo');

        const pensamentoAutoria = document.createElement('div');
        pensamentoAutoria.textContent = pensamento.autoria;
        pensamentoAutoria.classList.add('pensamento-autoria');

        const botaoEditar = document.createElement('button');
        botaoEditar.classList.add('botao-editar');
        botaoEditar.onclick = () => {
            document.querySelector('#pensamento-conteudo').focus();
            ui.preencherFormulario(pensamento.id);
        };

        const iconeEditar = document.createElement('img');
        iconeEditar.src = 'assets/imagens/icone-editar.png';
        iconeEditar.alt = 'Editar';
        botaoEditar.append(iconeEditar);

        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('botao-excluir');
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id);
                ui.renderizarPensamentos();
            } catch (error) {
                alert('Erro ao excluir pensamento');
                throw error;
            }
        };

        const iconeExcluir = document.createElement('img');
        iconeExcluir.src = 'assets/imagens/icone-excluir.png';
        iconeExcluir.alt = 'Excluir';
        botaoExcluir.append(iconeExcluir);

        const icones = document.createElement('div');
        icones.classList.add('icones');
        icones.append(botaoEditar, botaoExcluir);

        li.append(iconeAspas, pensamentoConteudo, pensamentoAutoria, icones);
        listaPensamentos.append(li);
    },
};

export default ui;
