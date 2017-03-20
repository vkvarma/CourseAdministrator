import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { JQUERY_TOKEN } from './../service/jQuery.service';

@Component({
    selector: 'custom-modal',
    templateUrl: './custom-modal.component.html'
})
export class CustomModal {
    @Input() title: string;
    @Input() actionType: string;
    @Output() notifyParent: EventEmitter<boolean>;
    constructor( @Inject(JQUERY_TOKEN) private $: any) {
        this.notifyParent = new EventEmitter<boolean>();
    }

    saveChanges() {

        if (this.actionType.toLowerCase() === "student") {
            //console.log('student')
        }
        else if (this.actionType.toLowerCase() === "course") {
            //console.log('course');
        }
        this.notifyParent.emit(true);
        this.$('#customModal').modal('hide');
    }
}
