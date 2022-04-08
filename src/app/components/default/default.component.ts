import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  count: number = 0
  status: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  checkCheckBoxvalue(event: any) {
    this.status = event.target.checked
  }
}
