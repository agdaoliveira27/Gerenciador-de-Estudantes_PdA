const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const estudantes = [];

const calcularMedia = (notas) => notas.length > 0 ? notas.reduce((acc, nota) => acc + nota, 0) / notas.length : 0;

const menu = () => {
  console.log("\n📂 Genrenciador de Estudantes, o que deseja fazer? 🤔");
  console.log("1. Cadastrar 💻");
  console.log("2. Listar Todos 📝");
  console.log("3. Buscar por Nome 🔍");
  console.log("4. Média Geral 📊");
  console.log("5. Maior Média 👑");
  console.log("6. Aprovados 🎉");
  console.log("7. Recuperação ⏳");
  console.log("8. Reprovados ⌛");
  console.log("9. Sair ❌");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case '1':
        rl.question("Nome: ", (nome) => {
          rl.question("Idade: ", (idade) => {
            rl.question("Notas (separadas por vírgula, ex: 10, 10, 10, 10): ", (notasString) => {
              const idadeNum = parseInt(idade, 10);
              const notas = notasString.split(',').map(n => parseFloat(n.trim()));
              if (!nome || idadeNum <= 0 || notas.some(isNaN) || notas.some(n => n < 0 || n > 10)) {
                console.log("\nERRO: Dados inválidos. ⚠️");
              } else {
                estudantes.push({ nome, idade: idadeNum, notas });
                console.log(`\nEstudante "${nome}" cadastrado com sucesso!✅`);
              }
              menu();
            });
          });
        });
        break;
      case '2':
        if (estudantes.length === 0) console.log("\nNenhum estudante cadastrado. ⚠️");
        else estudantes.map(e => console.log(`Nome: ${e.nome}, Idade: ${e.idade}, Média: ${calcularMedia(e.notas).toFixed(2)}`));
        menu();
        break;
      case '3':
        rl.question("Nome para buscar: ", (nomeBusca) => {
          const encontrado = estudantes.find(e => e.nome.toLowerCase().includes(nomeBusca.toLowerCase()));
          encontrado ? console.log("\nEncontrado:", encontrado) : console.log("\nNão encontrado.");
          menu();
        });
        break;
      case '4':
        const mediaGeral = estudantes.length > 0 ? estudantes.reduce((acc, e) => acc + calcularMedia(e.notas), 0) / estudantes.length : 0;
        console.log(`\nMédia geral da turma: ${mediaGeral.toFixed(2)}`);
        menu();
        break;
      case '5':
        if (estudantes.length > 0) {
          const maiorMedia = estudantes.reduce((maior, atual) => (calcularMedia(atual.notas) > calcularMedia(maior.notas)) ? atual : maior);
          console.log(`\nEstudante com maior média é ${maiorMedia.nome} com ${calcularMedia(maiorMedia.notas).toFixed(2)}.`);
        } else {
          console.log("\nNenhum estudante cadastrado.");
        }
        menu();
        break;
      case '6':
        estudantes.filter(e => calcularMedia(e.notas) >= 7).forEach(e => console.log(`Nome: ${e.nome}, Média: ${calcularMedia(e.notas).toFixed(2)}`));
        menu();
        break;
      case '7':
        estudantes.filter(e => { const m = calcularMedia(e.notas); return m >= 5 && m < 7; }).forEach(e => console.log(`Nome: ${e.nome}, Média: ${calcularMedia(e.notas).toFixed(2)}`));
        menu();
        break;
      case '8':
        estudantes.filter(e => calcularMedia(e.notas) < 5).forEach(e => console.log(`Nome: ${e.nome}, Média: ${calcularMedia(e.notas).toFixed(2)}`));
        menu();
        break;
      case '9':
        console.log("\nEncerrando programa. Até logo! 👋");
        rl.close();
        break;
      default:
        console.log("\nOpção inválida. Por favor, escolha entre 1 e 9.");
        menu();
        break;
    }
  });
};

menu();
