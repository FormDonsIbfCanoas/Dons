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
      localStorage.setItem(
        'arrayTop3Competencias',
        JSON.stringify(this.topDons)
      );
      localStorage.setItem(
        'arrayCompetenciasRestantes',
        JSON.stringify(this.resultados)
      );
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
    let dados = localStorage.getItem('arrayCompetenciasRestantes');
    let top3Dados = localStorage.getItem('arrayTop3Competencias');
    let dadosForm = localStorage.getItem('DadosForm');
    let dadosTotais = JSON.parse(top3Dados ? top3Dados : '[]').concat(
      JSON.parse(dados ? dados : '[]')
    );
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

    JSON.parse(top3Dados ? top3Dados : '[]').map((element: any) => {
      top3.innerHTML += `<div class="bloco-don">${element.name}</div>`;
    });

    tabela.innerHTML += conteudohtml;

    const elemento = document.querySelector('.conteudo') as HTMLElement;

    // Torna o elemento visível
    elemento.style.display = 'flex';

    // Espera um tempo para garantir que o elemento foi renderizado
    setTimeout(() => {
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
    }, 200); // 200ms é geralmente suficiente
  }
}
