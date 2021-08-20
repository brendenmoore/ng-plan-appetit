import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stack-view',
  templateUrl: './stack-view.component.html',
  styleUrls: ['./stack-view.component.css'],
})
export class StackViewComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  close(){
    this.onClose.emit()
  }
}
