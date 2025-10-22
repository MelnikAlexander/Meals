import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { addMeal } from '../store/meal.actions';
import { LoadMealsModalComponent } from '../load-meals-modal/load-meals-modal.component';

@Component({
  selector: 'app-add-meal-modal',
  templateUrl: './add-meal-modal.component.html'
})
export class AddMealModalComponent {
  title = '';
  date = new Date();

  constructor(private modalCtrl: ModalController, private store: Store) {}

  close() {
    this.modalCtrl.dismiss();
  }

  async openMealList() {
    const modal = await this.modalCtrl.create({
      component: LoadMealsModalComponent
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.title = data;
    }
  }

  save() {
    if (!this.title.trim()) return;
    const meal = { id: uuidv4(), title: this.title, date: this.date};
    this.store.dispatch(addMeal({ meal }));
    this.close();
  }
}
