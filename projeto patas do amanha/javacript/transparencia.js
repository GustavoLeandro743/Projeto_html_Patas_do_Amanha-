// Dados da Minha História (2012-2024): Marcos e Desafios
const anos = Array.from({length: 2024-2012+1}, (_,i) => 2012 + i); // Período de 2012 a 2024

// "Marcos de Sucesso" por ano (ex: projetos concluídos, habilidades adquiridas, etc.)
const marcosDeSucesso = [2, 3, 5, 7, 9, 12, 15, 18, 22, 26, 30, 35, 40]; // Total de marcos por ano

// Desafios encontrados, mapeados por ano
// Categorias de Desafios: 'tecnico', 'organizacional', 'aprendizagem', 'colaboracao', 'tempo', 'comunicacao'
const desafiosPorAno = anos.map((a,i) => ({ 
  ano: a,
  tecnico:       (marcosDeSucesso[i]*0.15), // 15% dos marcos foram técnicos
  organizacional:  (marcosDeSucesso[i]*0.10), // 10% dos marcos foram organizacionais
  aprendizagem:    (marcosDeSucesso[i]*0.20), // 20% dos marcos foram de aprendizagem
  colaboracao:     (marcosDeSucesso[i]*0.05), // 5% dos marcos foram de colaboração
  tempo:           (marcosDeSucesso[i]*0.12), // 12% dos marcos foram de gerenciamento de tempo
  comunicacao:     (marcosDeSucesso[i]*0.03), // 3% dos marcos foram de comunicação
}));

// No bloco abaixo desenha um gráfico de linha que mostra como os Marcos de Sucesso evoluíram ao longo dos anos.
function renderConquistas() {
  // ATUALIZADO: Procurando pelo novo ID 'conquistasChart' no HTML
  const ctx = document.getElementById('conquistasChart').getContext('2d');  
  new Chart(ctx, {  
    type: 'line',  
  data: { 
        labels: anos, 
        datasets: [{ 
            label: 'Marcos de Sucesso (Unidades)', // NOVO RÓTULO
            data: marcosDeSucesso, // NOVOS DADOS
            borderColor: '#3f51b5', // Nova cor
            backgroundColor: 'rgba(63,81,181,0.1)', // Novo fundo
            tension:0.2 
        }] 
    },  
    options: { responsive:true, plugins:{legend:{display:true}} } // Legend: true para explicar o que são os pontos
  });
}

// O bloco abaixo desenha um gráfico de barras que mostra a distribuição dos Desafios no ano mais recente (2024).
function renderDesafios() {
  // ATUALIZADO: Procurando pelo novo ID 'desafiosChart' no HTML
  const ctx = document.getElementById('desafiosChart').getContext('2d');
  const last = desafiosPorAno[desafiosPorAno.length-1];
  // NOVOS RÓTULOS para as categorias de Desafios
  const labels = ['Técnico','Organizacional','Aprendizagem','Colaboração','Tempo','Comunicação'];
  // NOVOS DADOS
  const data = [last.tecnico,last.organizacional,last.aprendizagem,last.colaboracao,last.tempo,last.comunicacao];
  
  new Chart(ctx, { 
        type: 'bar', 
        data:{ 
            labels, 
            datasets:[{ 
                label:'Desafios Encontrados', // NOVO RÓTULO
                data, 
                backgroundColor: ['#ff9800','#f44336','#00bcd4','#8bc34a','#673ab7','#e91e63'] // Novas cores
            }] 
        }, 
        options:{responsive:true} 
    });
}

// O bloco abaixo cria uma tabela HTML que resume os Marcos de Sucesso e Desafios por ano
function renderTable(){
  // ATENÇÃO: Se você usou o HTML sugerido, o ID da div que recebe a tabela é 'summaryTable', o mesmo do seu original, então está OK.
  const container = document.getElementById('summaryTable');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  
  // NOVOS CABEÇALHOS
  thead.innerHTML = '<tr><th>Ano</th><th>Marcos de Sucesso</th><th>Técnico</th><th>Organizacional</th><th>Aprendizagem</th><th>Colaboração</th><th>Tempo</th><th>Comunicação</th></tr>';
  table.appendChild(thead);
  
  const tbody = document.createElement('tbody');
  desafiosPorAno.forEach((row,i)=>{
    const tr = document.createElement('tr');
    // toFixed(2) para garantir duas casas decimais, já que os valores são fracionários
    tr.innerHTML = `<td style="text-align:left">${row.ano}</td><td>${marcosDeSucesso[i]}</td><td>${row.tecnico.toFixed(2)}</td><td>${row.organizacional.toFixed(2)}</td><td>${row.aprendizagem.toFixed(2)}</td><td>${row.colaboracao.toFixed(2)}</td><td>${row.tempo.toFixed(2)}</td><td>${row.comunicacao.toFixed(2)}</td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}

// As três instruções abaixo chamam as funções para desenhar os gráficos e a tabela.
// ATUALIZADO: Chamando as funções com os novos nomes
renderConquistas();
renderDesafios();
renderTable();

// A função abaixo cria arquivos CSV para download com os dados de Marcos de Sucesso e Desafios
(function criarCSVs(){
  // NOVAS VARIÁVEIS E RÓTULOS
  const conquistasCsv = ['ano,marcos_de_sucesso', ...anos.map((a,i)=>`${a},${marcosDeSucesso[i]}`)].join('\n');
  const desafiosCsv = ['ano,tecnico,organizacional,aprendizagem,colaboracao,tempo,comunicacao', 
    ...desafiosPorAno.map(r=>`${r.ano},${r.tecnico},${r.organizacional},${r.aprendizagem},${r.colaboracao},${r.tempo},${r.comunicacao}`)
  ].join('\n');
  
  // ATENÇÃO: As strings CSV estão prontas, mas seu código original não as usava para anexar aos links de download. 
  // Você precisaria adicionar código extra para anexar essas strings ao HTML, mas o foco aqui é a lógica dos dados.
})();