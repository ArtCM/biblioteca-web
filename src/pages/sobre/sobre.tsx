import "./sobre.css";

export default function About() {
  return (
    <main className="content-container sobre">
      <h1>Sobre o Projeto</h1>
      <p>
        Projeto foi desenvolvido como um teste prático com objetivo inicial de realizar um CRUD para administração de autores e livros.
        <br/>
        <br/>
        Houveram <strong>restrições</strong> quanto ao uso de bibliotecas de estilização como tailwind e frameworks como Next.js
        <br/>
        O projeto foi feito levando em consideração a reutilização dos componentes e a facil manutenção do código, foi feito o deploy na vercel.
        <br/>
        Não foi configurado rotas para o projeto, é uma SPA que troca o conteudo renderizado em App.tsx pelo hook useNavigation, criado para navegação e troca dinamica do conteudo exibido
        <br/><br/>
        Evitei usar bibliotecas externas para nao fugir das restrições e utilizo icones como svg diretamente do font-awesome, também foi criado um projeto inicial no figma que não está completo pois foi utilizado somente para inicializar o projeto, uma vez que se tem estruturado um padrão para o projeto construo o restante usando o que foi estabelecido como base. No projeto do Figma se encontram o style guide e o mockup.
      </p>
    </main>
  );
}
