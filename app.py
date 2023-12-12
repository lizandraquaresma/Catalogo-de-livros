from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

class Livro:
    def __init__(self, titulo, autor, exemplares_disponiveis):
        self.titulo = titulo
        self.autor = autor
        self.exemplares_disponiveis = exemplares_disponiveis

    def validar_disponibilidade(self, exemplares_disponiveis):
        # Converta a string para inteiro antes de comparar
        return int(exemplares_disponiveis) > 0 and exemplares_disponiveis.isdigit()

class CatalogoLivros:
    def __init__(self):
        self.catalogo = []

    def cadastrar_livro(self, titulo, autor, exemplares_disponiveis):
        # Validar se o título e autor estão preenchidos
        if not titulo or not autor:
            return jsonify({"error": "Erro: O título e autor são obrigatórios."})

        livro = Livro(titulo, autor, exemplares_disponiveis)

        # Validar a disponibilidade
        if not livro.validar_disponibilidade(exemplares_disponiveis):
            return jsonify({"error": "A quantidade de exemplares disponíveis deve ser um valor válido e maior que zero."})

        self.catalogo.append(livro)

        return jsonify({"message": "Livro cadastrado com sucesso!"})

    def pesquisar_livros(self, termo):
        resultados = [
            {"titulo": livro.titulo, "autor": livro.autor, "exemplares_disponiveis": livro.exemplares_disponiveis}
            for livro in self.catalogo
            if termo.lower() in livro.titulo.lower() or termo.lower() in livro.autor.lower()
        ]

        return jsonify(resultados)

catalogoLivros = CatalogoLivros()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cadastrar_livro', methods=['POST'])
def cadastrar_livro():
    data = request.get_json()
    return catalogoLivros.cadastrar_livro(data['titulo'], data['autor'], data['exemplares_disponiveis'])

@app.route('/pesquisar_livros', methods=['POST'])
def pesquisar_livros():
    data = request.get_json()
    return catalogoLivros.pesquisar_livros(data['termo'])

if __name__ == '__main__':
    app.run(debug=True)
