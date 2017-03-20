import { Directive, ElementRef, OnInit, Input } from '@angular/core';
@Directive({
    selector: '[highlight-border]'
})
export class HighLightBorderDirective implements OnInit {
    el: HTMLElement;
    @Input() isCheckBoxTicked: boolean;
    constructor(elRef: ElementRef) {
        this.el = elRef.nativeElement;
    }
    ngOnInit() {
        this.el.addEventListener('click', e => {
            if (this.isCheckBoxTicked) {
                this.el.style.borderColor = '#cb4b16';
            }
            else {
                this.el.style.removeProperty('border-color');
            }
        });
    }
}