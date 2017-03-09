import { Directive, OnInit, Inject, ElementRef } from '@angular/core';
import { JQUERY_TOKEN } from './../../shared/service/jQuery.service';

@Directive({
    selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {
    private el: HTMLElement;
    constructor(elRef: ElementRef, @Inject (JQUERY_TOKEN) private $: any) {
        this.el = elRef.nativeElement;
    }
    ngOnInit() {
        this.el.addEventListener ('click', e => {
            this.$('#customModal1').modal({});
        })
    }
}
