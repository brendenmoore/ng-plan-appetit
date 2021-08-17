import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Meal, Menu, MenuDay, Template } from '../models';
import { UserService } from '../user.service';
import {endOfWeek, startOfWeek, eachDayOfInterval, format} from 'date-fns'
import { newMeal } from './util';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  userId?: string;
  menu: AngularFirestoreCollection<MenuDay>;
  DATE_FORMAT: string = "yyyyMMdd"

  constructor(private store: AngularFirestore, private user: UserService) {
    this.userId = this.user.uid;
    this.menu = this.store.collection<MenuDay>('users/' + this.userId + "/menuDays")
  }

  setMenuDay(menuDay: MenuDay){
    return this.menu.doc(menuDay.dateString).set(menuDay)
  }

  updateMultipleDays(menuDays: MenuDay[] | undefined) {
    if (!menuDays) {
      return;
    }

    let batch = this.store.firestore.batch();

    menuDays.forEach(menuDay => {
      let ref = this.menu.doc(menuDay.dateString).ref;
      batch.set(ref, menuDay)
    })

    return batch.commit()
  }

  addMenuDay(day: Date, meal: Meal){
    const dateString = format(day, this.DATE_FORMAT);
    const menuDay: MenuDay = {dateString: dateString, dateNumber: day.getTime(), meal: meal}
    return this.setMenuDay(menuDay);
  }

  getMenuDay(day: Date){
    const dateString = format(day, this.DATE_FORMAT)
    return this.menu.doc(dateString)
  }

  getCurrentWeek(){
    const today = new Date();
    const startingDay = startOfWeek(today);
    const endingDay = endOfWeek(today);
    return eachDayOfInterval({ start: startingDay, end: endingDay });
  }

  getMenuDaysInRange(startingDate: Date, numberOfDays: number){
    const startingDayString = format(startingDate, this.DATE_FORMAT);
    return this.store.collection<MenuDay>('users/' + this.userId + "/menuDays", ref => ref.orderBy('dateString').startAt(startingDayString).limit(numberOfDays))
  }

  loadMenu(daysInView: Date[], menuDays: MenuDay[]){
    let menu = daysInView.map(date => {
      let menuDay = menuDays.find(menu => menu.dateNumber === date.getTime())
      if (!menuDay) {
        const dateString = format(date, this.DATE_FORMAT);
        menuDay = {
          dateString: dateString,
          dateNumber: date.getTime(),
          meal: newMeal(),
        };
      }
      return {date: date, menuDay: menuDay}
    })
    return menu
  }

}
