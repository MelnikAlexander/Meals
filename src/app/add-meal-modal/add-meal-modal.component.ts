import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { Meal } from '../meal.model';
import { addMeal } from '../store/meal.actions';
import { LoadMealsModalComponent } from '../load-meals-modal/load-meals-modal.component';

@Component({
  selector: 'app-add-meal-modal',
  templateUrl: './add-meal-modal.component.html'
})
export class AddMealModalComponent {
  title = '';
  calories: number | null = null;
  date = new Date();
  todayISO: string;

  constructor(private modalCtrl: ModalController, private store: Store) {
    const today = new Date();
    this.todayISO = today.toISOString();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (!this.title.trim()) return;
    const meal = {
      id: uuidv4(),
      title: this.title,
      date: this.date,
      calories: this.calories ?? 100
    };
    this.store.dispatch(addMeal({ meal }));
    this.close();
  }

  onTitleInput() {
    if (!this.calories) {
      this.calories = 100;
    }
  }

  async openLoadMealsModal() {
    const modal = await this.modalCtrl.create({
      component: LoadMealsModalComponent
    });

    modal.onDidDismiss().then(result => {
      if (result.data) {
        const meal = result.data as Meal;
        this.title = meal.title;
        this.calories = meal.calories || 100;
      }
    });

    await modal.present();
  }
}
