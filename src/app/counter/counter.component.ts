import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterAciton } from './../redux/actions/counter-action';
import rootReducer from './../redux/reducers/index';
import { DevToolsExtension, NgRedux, select } from "ng2-redux/lib";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

@select() counter$:Observable<number>;
  constructor(private ngRedux: NgRedux<any>, private devTools: DevToolsExtension, public actions: CounterAciton) {
    let middleware = [];
    let enhancer = [];
    enhancer.push(devTools.enhancer());
    let initalState = {};
    ngRedux.configureStore(rootReducer, initalState, middleware, enhancer);
  }

  ngOnInit() {
  }

}
