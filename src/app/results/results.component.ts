import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IDon } from '../common/dom.interface';
import { ResultDescriptionComponent } from './result-description/result-description';

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
      console.log(this.topDons);
      console.log(this.resultados);
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
}
