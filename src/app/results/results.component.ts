import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IDon } from '../common/dom.interface';
import { ResultDescriptionComponent } from './result-description/result-description';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

    let dadosTotais = JSON.parse(top3Dados ? top3Dados : '[]').concat(
      JSON.parse(dados ? dados : '[]')
    );

    const doc = new jsPDF();

    const colunas = ['Nome', 'Pontuação', 'Perguntas'];
    const linhas = dadosTotais.map((item: any) => [
      item.name,
      item.score,
      item.questions.join(', '),
    ]);

    autoTable(doc, {
      head: [colunas],
      body: linhas,
      margin: { top: 20 },
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save('resultado.pdf');
  }
}
