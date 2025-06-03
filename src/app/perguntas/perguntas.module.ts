import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PerguntasComponent } from './perguntas.component';

import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import { DomService } from '../common/doms.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: PerguntasComponent }
        ]),
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatStepperModule,
        NgxSliderModule,
    ],
    exports: [],
    declarations: [
        PerguntasComponent
    ],
    providers: [
        DomService
    ],
})
export class PerguntasModule { }
