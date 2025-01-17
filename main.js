
const btnInverter = document.querySelector('.inverter');
const btnMarcarVogal = document.querySelector('.vogal');
const btnTabelaDeOcorrencias = document.querySelector('.tabelaDeOcorrencias');
const btnMaiorNumDeOcorrencias = document.querySelector('.maiorOcorrencia');
const btnSubtituir = document.querySelector('.btnSubtituir');
const btnCalcularDiasDeVida = document.querySelector('.diasDeVida');
const btnDataExtenso = document.querySelector('.dataExtenso');
const btnCalcularDistancia = document.querySelector('.calcularSemanas')

let campoTexto = document.querySelector('#itext'); //texto armazenado na text area
let campoTexto2 = document.querySelector('.textoQualquer');
let novoTexto = document.querySelector('.novoTexto'); //novo texto produzido


//questão 1
btnInverter.onclick = function(){
    let i = campoTexto.value.length - 1;
    let textoInvertido = '';
    
    while(i >= 0){
        textoInvertido += campoTexto.value[i];
        i--;
    }
    novoTexto.innerHTML = textoInvertido;
}

//questão 2
btnMarcarVogal.onclick = function(){
    let texto
    texto = campoTexto.value.replace(/[aeiouAEIOUáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛãõÃÕ]/gi, function(vogal){
        return `<span style="font-weight: bold;">${vogal}</span>`;
    });
    novoTexto.innerHTML = texto;
}

function palavrasEOcorrencias(textoArray){
    let contadorDePalavras = {} //objeto;
    
    for(let i = 0; i<textoArray.length; i++){
        let palavra = textoArray[i].toLowerCase();
        if(contadorDePalavras[palavra]){
            contadorDePalavras[palavra]++;
        }
        else{
            contadorDePalavras[palavra] = 1;
        }
    }
    return contadorDePalavras;
}
//questão 3
btnTabelaDeOcorrencias.onclick = function(){
    //ler texto
    //separar as palavras em um array
    let texto = campoTexto.value;
    let textoArray = texto.split(/\s+/);
    let objPalavras = palavrasEOcorrencias(textoArray);
    /*let contadorDePalavras = {} //objeto;
    
    for(let i = 0; i<textoArray.length; i++){
        let palavra = textoArray[i].toLowerCase();
        if(contadorDePalavras[palavra]){
            contadorDePalavras[palavra]++;
        }
        else{
            contadorDePalavras[palavra] = 1;
        }
    }*/


     // Preparar os dados para exibir em uma tabela
    let tabelaHTML = '<table border="1"><tr><th>Palavra</th><th>Ocorrências</th></tr>';

     // Criar as linhas da tabela
    for (let palavra in objPalavras) {
         tabelaHTML += `<tr><td>${palavra}</td><td>${objPalavras[palavra]}</td></tr>`;
    }
     
     tabelaHTML += '</table>';
    document.querySelector('.resultadoTabela').innerHTML = tabelaHTML; // Supondo que o resultado será exibido em um elemento com a classe 'resultadoTabela'
    
    console.log(objPalavras); // Imprime o objeto com as contagens das palavras no console
}

//questão 4
btnMaiorNumDeOcorrencias.onclick = function(){
    let texto = campoTexto.value;
    let textoArray = texto.split(/\s+/);
    let objPalavras = palavrasEOcorrencias(textoArray);

    let palavrasOrdenadas = Object.entries(objPalavras);

    palavrasOrdenadas.sort(function(a, b){
        return b[1] - a[1];
    });
    let maiorOcorrencia = palavrasOrdenadas[0][1];
    let palavrasComMaiorOcorrencia = [];

    for(let i = 0; i<palavrasOrdenadas.length; i++){
        if(palavrasOrdenadas[i][1] === maiorOcorrencia){
            palavrasComMaiorOcorrencia.push(palavrasOrdenadas[i][0]);
        }
    }
    console.log(palavrasOrdenadas);
    console.log(`As palavras com maior número de ocorrências (${maiorOcorrencia}): 
    ${palavrasComMaiorOcorrencia.join(', ')}`);
    
    novoTexto.innerHTML = `A(s) palavra(s) com maior ocorrência é/são (${palavrasComMaiorOcorrencia}) que ocorre(m) ${maiorOcorrencia} vez/vezes`;
}

//questão 5
btnSubtituir.onclick = function(){
    //armazenar os valores dos campos procurar e subtituir
    let procurar = document.querySelector('.procurar');
    let substituir = document.querySelector('.substituir');

    campoTexto2.value = campoTexto2.value.replace(new RegExp(procurar.value, 'gi'),substituir.value);
    //fazer a troca, replace(provavelmente)
}

//questão 6
btnCalcularDiasDeVida.onclick = function(){
    let dataAtual = new Date(); //data atual
    let dataDeNascimento = new Date(document.querySelector('#idata').value); //valor do campo input

    let diasDeVida = calcularDiasDeVida(dataDeNascimento, dataAtual)
    console.log(diasDeVida);
}

function calcularDiasDeVida(dataNascimento, dataAtual){
    let anos = dataAtual.getFullYear() - dataNascimento.getFullYear();
    let meses = dataAtual.getMonth() - dataNascimento.getMonth();
    let dias = dataAtual.getDate() - dataNascimento.getDate();

    if(meses < 0 || (meses === 0 && dias < 0)){ // ainda não passou o aniversário;
        anos--;
        meses+= 12;
    }

    let diasTotais = anos*365 + meses*30 + dias;

    let anoBixesto = contarAnoBissextos(dataNascimento, dataAtual);
    diasTotais += anoBixesto;

    return diasTotais;
}

function contarAnoBissextos(dataNascimento, dataAtual){
    let anoBixesto = 0;
    for(let ano = dataNascimento.getFullYear(); ano <= dataAtual.getFullYear(); ano++){
        if(isAnoBissexto(ano)){
            anoBixesto++;
        }
    }
    return anoBixesto;
}

function isAnoBissexto(ano){
    return(ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0));
}

//questão 7
btnDataExtenso.onclick = function(){
    let data = new Date(document.querySelector('#idata').value);
    let mes = data.getMonth() + 1;

    switch(mes){
        case 1:
            mes = 'janeiro';
            break;
        case 2:
            mes = 'fevereiro';
            break;
        case 3:
            mes = 'março';
            break;
        case 4:
            mes = 'abril';
            break;
        case 5:
            mes = 'maio';
            break;
        case 6:
            mes = 'junho';
            break;
        case 7:
            mes = 'julho';
            break;
        case 8:
            mes = 'agosto';
            break;
        case 9:
            mes = 'setembro';
            break;
        case 10:
            mes = 'outubro';
            break;
        case 11:
            mes = 'novembro';
            break;
        case 12:
            mes = 'dezembro';
            break;
    }
    let dia = String(data.getDate()).padStart(2, '0');
    let ano = data.getFullYear();
    let porExtensoHTML = `<div>${dia} de ${mes} de ${ano}</div>`;
    let novoElemento = document.createElement('div');
    novoElemento.innerHTML = porExtensoHTML;

    document.body.appendChild(novoElemento);
}

//questão 8
btnCalcularDistancia.onclick = function(){
    let data1 = new Date(document.querySelector('#idata1').value);
    let data2 = new Date(document.querySelector('#idata2').value);

    /*let dia = data2.getDate() - data1.getDate();
    let mes = (data2.getMonth() + 1) - (data1.getMonth() + 1);
    let ano = data2.getFullYear() - data1.getFullYear();
    let exibirResultado = document.createElement('div');*/
    if((dia < 0 && mes <= 0 && ano <= 0) || ano < 0){
        let mensagem = `<div>Data inválida</div>`
        exibirResultado.innerHTML = mensagem;
        document.body.appendChild(exibirResultado);
        return;
    }

    let diffEmMs = data2 - data1 //diferença em miliSegundos
    //converter miliSegundos em dias
    let diasTotais = Math.floor(diffEmMs / (1000* 60 * 60 * 24));//abordagem ChatGpt

    //let diasTotais = ano*365 + mes*30 + dia;
    
    let semanas = Math.floor(diasTotais/7);
    let diasRestantes = diasTotais%7;    
    let resultado = `<div>${semanas} semana(s) e  ${diasRestantes} dia(s).</div>`

    exibirResultado.innerHTML = resultado;
    document.body.appendChild(exibirResultado);
}
//ler 2 datas
//retornar a distância em semanas
//            