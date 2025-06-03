import { Component, Output, EventEmitter, HostListener, Inject } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    @Output('toggleMenu')
    toggleMenu = new EventEmitter();

    verticalOffset: number = 0;

    constructor() {}

    @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll(event: any) {
        this.verticalOffset = window.pageYOffset;
    }

    showMenu() {
        this.toggleMenu.emit(true);
    }
}
