class Livro {
    constructor(titulo, autor, exemplares_disponiveis) {
        this.titulo = titulo;
        this.autor = autor;
        this.exemplares_disponiveis = exemplares_disponiveis;
    }

    validar_disponibilidade(exemplares) {
        return exemplares > 0 && Number.isInteger(exemplares);
    }
}

class CatalogoLivros {
    constructor() {
        this.catalogo = [];
    }

    cadastrarLivro(titulo, autor, exemplares_disponiveis) {
        console.log("Função cadastrarLivro chamada.");

        // Limpar mensagem de erro ao tentar cadastrar um novo livro
        const mensagemErro = document.getElementById("mensagemErro");
        mensagemErro.textContent = "";

        const livro = new Livro(titulo, autor, exemplares_disponiveis);

        console.log(`Dados do livro: Título: ${titulo}, Autor: ${autor}, Exemplares: ${exemplares_disponiveis}`);

        if (!livro.validar_disponibilidade(exemplares_disponiveis)) {
            console.error("Erro: A quantidade de exemplares disponíveis deve ser um valor válido e maior que zero.");
            
            // Adiciona uma mensagem de erro na interface
            const mensagemErro = document.getElementById("mensagemErro");
            mensagemErro.textContent = "Erro: A quantidade de exemplares disponíveis deve ser um valor válido e maior que zero.";

            return;
        }

        this.catalogo.push(livro);

        // Alerta informando que o livro foi cadastrado
        alert(`Livro cadastrado com sucesso!\nTítulo: "${titulo}"\nAutor: ${autor}`);

        // Mostrar a lista de livros cadastrados
        this.mostrarCatalogo();

        // Chamar a função de pesquisa apenas se o termo de pesquisa não estiver vazio
        const termoPesquisa = document.getElementById("pesquisa").value;
        if (termoPesquisa.trim() !== "") {
            this.pesquisarLivros(termoPesquisa);
        }
    }


    pesquisarLivros(termo) {
        console.log("Catálogo durante a pesquisa:", this.catalogo);
        
        const resultados = this.catalogo.filter(livro =>
            livro.titulo.toLowerCase().includes(termo.toLowerCase()) ||
            livro.autor.toLowerCase().includes(termo.toLowerCase())
        );
    
        console.log("Resultados da pesquisa:", resultados);
        this.mostrarResultados(resultados);
    }
    

    mostrarCatalogo() {
        console.log("Catálogo atualizado:", this.catalogo);
        // Limpar o formulário após o cadastro
        document.getElementById("cadastroLivroForm").reset();
        // Atualizar a lista de livros cadastrados
        this.mostrarResultados(this.catalogo);
    }

    mostrarResultados(resultados) {
        console.log("Resultados da pesquisa:", resultados);

        const resultadosPesquisaDiv = document.getElementById("resultadosPesquisa");

        // Limpar resultados anteriores
        resultadosPesquisaDiv.innerHTML = "";

        if (resultados.length === 0) {
            resultadosPesquisaDiv.innerHTML = "Nenhum resultado encontrado.";
            return;
        }

        // Adicione um parágrafo antes de mostrar os resultados
        const listaLivrosParagrafo = document.createElement("p");
        listaLivrosParagrafo.innerHTML = "<strong>Livros Cadastrados:</strong>";
        resultadosPesquisaDiv.appendChild(listaLivrosParagrafo);

        // Criar elementos HTML para cada livro encontrado
        resultados.forEach(livro => {
            const livroDiv = document.createElement("div");
            livroDiv.classList.add("livro-item");

            const tituloAutor = document.createElement("p");
            tituloAutor.innerHTML = `<strong>${livro.titulo}</strong> - ${livro.autor}`;

            const disponibilidade = document.createElement("p");
            disponibilidade.innerHTML = `Disponibilidade: ${livro.exemplares_disponiveis} exemplares`;

            livroDiv.appendChild(tituloAutor);
            livroDiv.appendChild(disponibilidade);

            resultadosPesquisaDiv.appendChild(livroDiv);
        });

        console.log("HTML dos resultados:", resultadosPesquisaDiv.innerHTML);
    }
}

// Função para pesquisar livros ao digitar no campo de pesquisa
function pesquisarLivros() {
    console.log("Função pesquisarLivros chamada.");

    const termoPesquisa = document.getElementById("pesquisa").value;
    console.log(`Termo de pesquisa: ${termoPesquisa}`);

    catalogoLivros.pesquisarLivros(termoPesquisa);
}

// Criar uma instância da classe CatalogoLivros
const catalogoLivros = new CatalogoLivros();
