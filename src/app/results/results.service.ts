import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IDon } from "../common/dom.interface";

@Injectable({ providedIn: 'root' })
export class ResultsService {
    public results = new BehaviorSubject<IDon[] | undefined>(undefined);
}
