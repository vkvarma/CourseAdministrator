import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_DECREMENT = 'COUNTER_DECREMENT';

@Injectable()
export class CounterAciton {
    constructor(private ngRedux: NgRedux<any>) {

    }
    increment() {
        this.ngRedux.dispatch({ type: COUNTER_INCREMENT });
    }
    decrement() {
        this.ngRedux.dispatch({ type: COUNTER_DECREMENT });
    }



}
