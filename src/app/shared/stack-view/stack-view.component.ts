import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stack-view',
  templateUrl: './stack-view.component.html',
  styleUrls: ['./stack-view.component.css'],
})
export class StackViewComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  constructor(private location: Location) {}

  ngOnInit(): void {}

  close(){
    // this.onClose.emit()
    this.location.back()
  }
}
