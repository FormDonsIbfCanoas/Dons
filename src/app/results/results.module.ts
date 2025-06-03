import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResultsComponent } from './results.component';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { ResultDescriptionComponent } from './result-description/result-description';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: ResultsComponent }
        ]),
        MatListModule,
        MatDividerModule,
        MatExpansionModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [],
    declarations: [
        ResultsComponent,
        ResultDescriptionComponent
    ],
    providers: [],
})
export class ResultsModule { }
