import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { Options } from '@angular-slider/ngx-slider';
import { DomService } from '../common/doms.service';
import { IDon, IDonScore } from '../common/dom.interface';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'perguntas',
  templateUrl: 'perguntas.component.html',
  styleUrls: ['./perguntas.component.scss'],
})
export class PerguntasComponent {
  options: Options = {
    floor: 0,
    ceil: 3,
    showTicks: true,
  };

  formulario: FormGroup = new FormGroup({
    perguntas: new FormArray([]),
  });

  mostrarPerguntas: boolean = false;

  contatoFormGroup: FormGroup = new FormGroup({
    nome: new FormControl(''),
    telefone: new FormControl(''),
  });

  perguntasTitle: any[] = [];

  constructor(
    httpClient: HttpClient,
    private domService: DomService,
    private router: Router,
    private servico: AppComponent
  ) {
    const perguntasCtrl = this.formulario.controls['perguntas'] as FormArray;
    httpClient
      .get('/assets/perguntas.json')
      .pipe(take(1))
      .subscribe((data: any) => {
        data.map((m: any) => {
          const f = new FormGroup({
            pontos: new FormControl(''),
            perguntaId: new FormControl(m.id),
          });
          this.perguntasTitle.push(m.pergunta);
          perguntasCtrl.push(f);
        });
      });
  }

  get perguntas() {
    return this.formulario.controls['perguntas'] as FormArray;
  }

  submitForm() {
    const scores = this.formulario.controls['perguntas'].value;
    this.calculateResults(scores);
  }

  enviarContato() {
    const contato = this.contatoFormGroup.value;
    if (contato.nome && contato.telefone) {
      this.servico.setTitle(contato.nome);
      /*  console.log('Dados de contato:', contato); */
      this.mostrarPerguntas = true;
      localStorage.setItem('DadosForm', JSON.stringify(contato));
      // Aqui você pode fazer um POST para seu backend, se quiser
    }
  }

  validarNumeros(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, ''); // remove tudo que não for número
  }

  calculateResults(scores: [{ pontos: number; perguntaId: number }]) {
    this.domService.dons.pipe(take(1)).subscribe((dons: any) => {
      const donsArray: IDonScore[] = [];
      dons.map((don: IDon) => {
        const scoresToCalculate: (number | undefined)[] = [];
        don.questions.map((q) => {
          const questionScore = scores.find((f) => f.perguntaId === q);
          scoresToCalculate.push(questionScore?.pontos);
        });
        const obj = {
          score: scoresToCalculate.reduce((prev, curr) => prev! + curr!, 0),
          ...don,
        } as IDonScore;
        donsArray.push(obj);
      });
      const res = donsArray.sort((a, b) => b.score! - a.score!);
      this.router.navigateByUrl('/resultado', { state: { results: res } });
    });
  }
}
