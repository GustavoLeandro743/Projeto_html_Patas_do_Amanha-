// masks.js - máscara de CPF, CEP e Telefone em vanilla JS
document.addEventListener('DOMContentLoaded', function () {
  /* 
    Função para formatar automáticamente o campo CPF enquanto o usuário digita deixando no padrão 000.000.000-00. Isso evita erros de digitação.
    Como ele funciona: procura um campo de input com id CPF ou cpf ou name CPF, se encontrar aplica a máscara enquanto o usuário digita.
  */
  (function () {
    const cpfInput = document.getElementById('CPF') || document.getElementById('cpf') || document.querySelector('input[name="CPF"]'); //Nessa Linha será onde vai procurar o campo CPF usando o .getElementById ou querySelector para encontrar o campo
    if (!cpfInput) {  //Se não encontrar o campo CPF, exibe um aviso no console do navegador
      console.warn('masks.js: campo de CPF não encontrado.'); //Mensagem que aparece no console do navegador se não encontrar o campo
    } else { //Se encontrar o campo CPF, aplica a máscara enquanto o usuário digita
      cpfInput.setAttribute('inputmode', 'numeric'); //Define o inputmode como numerico para facilitar a digitação em dispositivos móveis
      cpfInput.setAttribute('maxlength', '14'); //Define o maxlength como 14 para limitar o número de caracteres
      // A função formatCPF recebe o valor do campo, remove tudo que não é dígito e aplica a máscara de CPF
      const formatCPF = (value) => { //Função que aplica a máscara de CPF
        let v = value.replace(/\D/g, '').slice(0, 11); //Remove tudo que não é dígito e limita a 11 caracteres
        v = v.replace(/^(\d{3})(\d)/, '$1.$2')  //Após digitar 3 dígitos, insere um ponto
             .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3') //Após digitar o 7º dígito, insere outro ponto
             .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Após digitar o 9º dígito, insere um hífen
        return v; //Retorna o valor formatado
      };
      cpfInput.addEventListener('input', (e) => { //Adiciona um listener para o evento input, que é disparado sempre que o usuário digita algo no campo
        const pos = e.target.selectionStart; //Guarda a posição do cursor
        const oldLength = e.target.value.length;  //Guarda o tamanho antigo do valor do campo
        e.target.value = formatCPF(e.target.value); //Aplica a máscara de CPF
        const newLength = e.target.value.length;  //Guarda o tamanho novo do valor do campo
        const diff = newLength - oldLength; //Calcula a diferença de tamanho
        try { e.target.setSelectionRange(pos + (diff > 0 ? diff : 0), pos + (diff > 0 ? diff : 0)); } catch (_) {}  //Tenta restaurar a posição do cursor, ajustando se necessário
      });
    }
  })();

  /*
    Função para formatar automáticamente o campo CEP enquanto o usuário digita deixando no padrão 00000-000. Isso evita erros de digitação.
    Como ele funciona: procura um campo de input com id CEP ou name CEP, se encontrar aplica a máscara enquanto o usuário digita.
  */
  (function () {  // Início da função autoexecutável para o campo CEP
    const cepInput = document.getElementById('CEP') || document.querySelector('input[name="CEP"]'); //Procura o campo CEP usando getElementById ou querySelector
    if (!cepInput) {  //Se não encontrar o campo CEP, exibe um aviso no console do navegador
      console.warn('masks.js: campo de CEP não encontrado.'); //Mensagem que aparece no console do navegador se não encontrar o campo
    } else {  //Se encontrar o campo CEP, aplica a máscara enquanto o usuário digita
      cepInput.setAttribute('inputmode', 'numeric');  //Define o inputmode como numerico para facilitar a digitação em dispositivos móveis
      cepInput.setAttribute('maxlength', '9');  //Define o maxlength como 9 para limitar o número de caracteres
      // A função formatCEP recebe o valor do campo, remove tudo que não é dígito e aplica a máscara de CEP
      const formatCEP = (value) => {  //Função que aplica a máscara de CEP
        let v = value.replace(/\D/g, '').slice(0, 8); //Remove tudo que não é dígito e limita a 8 caracteres
        v = v.replace(/(\d{5})(\d)/, '$1-$2');  //Após digitar 5 dígitos, insere um hífen
        return v; //Retorna o valor formatado
      };
      cepInput.addEventListener('input', (e) => { //Adiciona um listener para o evento input, que é disparado sempre que o usuário digita algo no campo
        const pos = e.target.selectionStart;  //Guarda a posição do cursor
        const oldLength = e.target.value.length;  //Guarda o tamanho antigo do valor do campo
        e.target.value = formatCEP(e.target.value); //Aplica a máscara de CEP
        const newLength = e.target.value.length;  //Guarda o tamanho novo do valor do campo
        const diff = newLength - oldLength; //Calcula a diferença de tamanho
        try { e.target.setSelectionRange(pos + (diff > 0 ? diff : 0), pos + (diff > 0 ? diff : 0)); } catch (_) {}  //Tenta restaurar a posição do cursor, ajustando se necessário
      });
    }
  })();

  /*
    Função para formatar automáticamente o campo Telefone enquanto o usuário digita deixando no padrão (00) 00000-0000 ou (00) 0000-0000. Isso evita erros de digitação.
    Como ele funciona: procura um campo de input com id Telefone ou telefone ou name Telefone, se encontrar aplica a máscara enquanto o usuário digita.
  */
  (function () {
    const telInput = document.getElementById('Telefone') || document.querySelector('input[name="Telefone"]') || document.getElementById('telefone');  //Procura o campo Telefone usando getElementById ou querySelector
    if (!telInput) {  //Se não encontrar o campo Telefone, exibe um aviso no console do navegador
      console.warn('masks.js: campo de Telefone não encontrado.');  //Mensagem que aparece no console do navegador se não encontrar o campo
    } else {  //Se encontrar o campo Telefone, aplica a máscara enquanto o usuário digita 
      telInput.setAttribute('inputmode', 'numeric');  //Define o inputmode como numerico para facilitar a digitação em dispositivos móveis
      telInput.setAttribute('maxlength', '15'); //Define o maxlength como 15 para limitar o número de caracteres
      const formatPhone = (value) => {  //Função que aplica a máscara de Telefone
        let v = value.replace(/\D/g, '').slice(0, 11);  //Remove tudo que não é dígito e limita a 11 caracteres
        if (v.length <= 10) { //Se tiver 10 ou menos dígitos, aplica a máscara para telefone fixo (00) 0000-0000
          v = v.replace(/^(\d{2})(\d)/, '($1) $2')  //Após digitar o 2º dígito, insere parênteses e espaço
               .replace(/(\d{4})(\d)/, '$1-$2');  //Após digitar o 6º dígito, insere um hífen
        } else {  //Se tiver 11 dígitos, aplica a máscara para celular (00) 00000-0000
          v = v.replace(/^(\d{2})(\d)/, '($1) $2')  //Após digitar o 2º dígito, insere parênteses e espaço
               .replace(/(\d{5})(\d)/, '$1-$2');  //Após digitar o 7º dígito, insere um hífen
        }
        return v; //Retorna o valor formatado
      };
      telInput.addEventListener('input', (e) => { //Adiciona um listener para o evento input, que é disparado sempre que o usuário digita algo no campo
        const pos = e.target.selectionStart;  //Guarda a posição do cursor
        const oldLength = e.target.value.length;  //Guarda o tamanho antigo do valor do campo
        e.target.value = formatPhone(e.target.value); //Aplica a máscara de Telefone
        const newLength = e.target.value.length;  //Guarda o tamanho novo do valor do campo
        const diff = newLength - oldLength; //Calcula a diferença de tamanho
        try { e.target.setSelectionRange(pos + (diff > 0 ? diff : 0), pos + (diff > 0 ? diff : 0)); } catch (_) {}  //Tenta restaurar a posição do cursor, ajustando se necessário
      });
    }
  })();

});