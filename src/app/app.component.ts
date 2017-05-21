import { Component } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  ngOnInit() {
    console.log('using underscore...');
    let response = _.map([1, 2, 3], (item) => {
      console.log(item);
    });
  }
}
