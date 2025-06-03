import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDon } from 'src/app/common/dom.interface';

@Component({
    selector: 'result-description',
    template: `
        <div class="header" mat-dialog-title>
            <h2>{{ data.name }}</h2>
            <mat-icon mat-dialog-close>close</mat-icon>
        </div>
        
        <mat-dialog-content>
            <div class="content">
                <p [innerHTML]="data.description"></p>
                <h3>Como posso utlizar esse dom?</h3>
                <p [innerHTML]="data.howToUseIt"></p>
        
                <h3>Passagens bíblicas relacionadas a esse dom:</h3>
                <p>{{ data.biblicalVerses }}</p>
            </div>
        </mat-dialog-content>


    `,
    styles: [`
        @import '../../../assets/css/variables.scss';

        .content {
            padding: 0 24px 24px 24px;
        }

        .mat-dialog-content {
            padding: 0;
            margin: 0;

            h3 {
                color: $primary;
            }
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: $accent;
            padding: 12px 24px;
            margin-bottom: 10px;
    
            h2 {
                margin: 0;
            }
        }
    `]
})

export class ResultDescriptionComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: IDon) { }

    ngOnInit() { }
}
