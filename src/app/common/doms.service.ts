import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, take, tap } from "rxjs";

interface Dom {
    id: string;
    name: string;
    questions: [],
}

@Injectable({ providedIn: 'root' })
export class DomService {

    constructor(private http: HttpClient) {
    }

    get dons() {
        return this.http.get<Dom>('/assets/doms.json');
    }

    calculateScore() {
        this.http.get('../../assets/doms.json')
            .pipe(take(1))
            .subscribe()
    }

}
