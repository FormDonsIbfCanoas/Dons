import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IDon } from '../common/dom.interface';
import { ResultDescriptionComponent } from './result-description/result-description';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'results',
  templateUrl: 'results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  public resultados: any = [];
  public topDons: any = [];
  constructor(private route: Router, private matDialog: MatDialog) {
    const res = this.route.getCurrentNavigation()?.extras.state?.['results'];
    if (res) {
      res.sort(
        (a: { score: number }, b: { score: number }) => b.score - a.score
      );
      this.topDons = res.slice(0, 3);
      this.resultados = res.slice(3, res.length);

      let dadosForm = localStorage.getItem('DadosForm');
      let objetoFinal = JSON.parse(dadosForm ? dadosForm : '{}');
      objetoFinal.top3Dados = this.topDons;
      objetoFinal.arrayDados = this.resultados;

      // 1. Criar objeto com todos os dados extraídos do objetoFinal
      const formData = {
        nome_pessoa: objetoFinal.nome,
        telefone: objetoFinal.telefone,

        // Top 3 dons (índices 0-2)
        don1: objetoFinal.top3Dados[0].name,
        score1: objetoFinal.top3Dados[0].score.toString(),
        don2: objetoFinal.top3Dados[1].name,
        score2: objetoFinal.top3Dados[1].score.toString(),
        don3: objetoFinal.top3Dados[2].name,
        score3: objetoFinal.top3Dados[2].score.toString(),

        // Dons restantes (índices 3-18 do arrayDados)
        don4: objetoFinal.arrayDados[0].name, // Índice 0 do arrayDados
        score4: objetoFinal.arrayDados[0].score.toString(),
        don5: objetoFinal.arrayDados[1].name, // Índice 1 do arrayDados
        score5: objetoFinal.arrayDados[1].score.toString(),
        don6: objetoFinal.arrayDados[2].name, // Índice 2 do arrayDados
        score6: objetoFinal.arrayDados[2].score.toString(),
        don7: objetoFinal.arrayDados[3].name, // Índice 3 do arrayDados
        score7: objetoFinal.arrayDados[3].score.toString(),
        don8: objetoFinal.arrayDados[4].name, // Índice 4 do arrayDados
        score8: objetoFinal.arrayDados[4].score.toString(),
        don9: objetoFinal.arrayDados[5].name, // Índice 5 do arrayDados
        score9: objetoFinal.arrayDados[5].score.toString(),
        don10: objetoFinal.arrayDados[6].name, // Índice 6 do arrayDados
        score10: objetoFinal.arrayDados[6].score.toString(),
        don11: objetoFinal.arrayDados[7].name, // Índice 7 do arrayDados
        score11: objetoFinal.arrayDados[7].score.toString(),
        don12: objetoFinal.arrayDados[8].name, // Índice 8 do arrayDados
        score12: objetoFinal.arrayDados[8].score.toString(),
        don13: objetoFinal.arrayDados[9].name, // Índice 9 do arrayDados
        score13: objetoFinal.arrayDados[9].score.toString(),
        don14: objetoFinal.arrayDados[10].name, // Índice 10 do arrayDados
        score14: objetoFinal.arrayDados[10].score.toString(),
        don15: objetoFinal.arrayDados[11].name, // Índice 11 do arrayDados
        score15: objetoFinal.arrayDados[11].score.toString(),
        don16: objetoFinal.arrayDados[12].name, // Índice 12 do arrayDados
        score16: objetoFinal.arrayDados[12].score.toString(),
        don17: objetoFinal.arrayDados[13].name, // Índice 13 do arrayDados
        score17: objetoFinal.arrayDados[13].score.toString(),
        don18: objetoFinal.arrayDados[14].name, // Índice 14 do arrayDados
        score18: objetoFinal.arrayDados[14].score.toString(),
        don19: objetoFinal.arrayDados[15].name, // Índice 15 do arrayDados
        score19: objetoFinal.arrayDados[15].score.toString(),
      };

      // 2. Converter para URLSearchParams
      const urlParams = new URLSearchParams();

      for (const [key, value] of Object.entries(formData)) {
        urlParams.append(key, value);
      }

      // 3. Enviar via fetch
      fetch(
        'https://script.google.com/macros/s/AKfycbxOlhcPFYNKLtmn9jdH2z1MTdfOtCSdrhH28FqfZDXur7_HPitIFB-mkFUX8g7qhZky/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: urlParams,
        }
      )
        .then((response) => response.text())
        .then((data) => {
          console.log('dados enviados');
          /* alert('Dados enviados com sucesso!'); */
        })
        .catch((error) => {
          console.error('Erro:', error);
          /* alert('Erro ao enviar dados!'); */
        });
    } else {
      route.navigate(['/']);
    }
  }

  showDescription(don: IDon) {
    this.matDialog.open(ResultDescriptionComponent, {
      data: don as IDon,
      panelClass: 'no-padding-dialog',
    });
  }

  gerarPdf() {
    let dados = this.resultados;
    let top3Dados = this.topDons;
    let dadosForm = localStorage.getItem('DadosForm');
    let dadosTotais = top3Dados.concat(dados);
    const top3 = document.querySelector('.bloco-dons') as HTMLElement;
    const tabela = document.querySelector('.conteudo .tabela') as HTMLElement;
    const nome = document.querySelector('.nome') as HTMLElement;
    const telefone = document.querySelector('.telefone') as HTMLElement;
    nome.innerHTML = JSON.parse(dadosForm ? dadosForm : '{nome:default}').nome;
    telefone.innerHTML = JSON.parse(
      dadosForm ? dadosForm : '{telefone:default}'
    ).telefone;

    let conteudohtml = '';
    dadosTotais.map((element: any) => {
      conteudohtml += `<div class="linhas">
             <div class="coluna nome">${element.name}</div>
             <div class="coluna pontuacao">${element.score}</div>
             <div class="coluna perguntas">${element.questions}</div>
           </div>`;
    });
    top3.innerHTML = '';
    JSON.parse(top3Dados ? top3Dados : '[]').map((element: any) => {
      top3.innerHTML += `<div class="bloco-don">${element.name}</div>`;
    });

    tabela.innerHTML += conteudohtml;

    const elemento = document.querySelector('.conteudo') as HTMLElement;

    // Torna o elemento visível
    elemento.style.display = 'flex';

    const opcoes = {
      margin: [10, 25, 0, 25],
      filename: 'dados.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf()
      .set(opcoes)
      .from(elemento)
      .save()
      .then(() => {
        // Esconde o elemento novamente depois de gerar o PDF
        elemento.style.display = 'none';
      });
  }
}
