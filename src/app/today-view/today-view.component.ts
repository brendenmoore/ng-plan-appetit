import { Component, OnInit } from '@angular/core';
import { MenuDay } from '../models';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-today-view',
  templateUrl: './today-view.component.html',
  styleUrls: ['./today-view.component.css']
})
export class TodayViewComponent implements OnInit {
  menuDay?: MenuDay;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getMenuDay(new Date()).valueChanges().subscribe(menuDay => {
      this.menuDay = menuDay
    })
  }

}
