import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { addMeal } from '../store/meal.actions';
import { Meal } from '../meal.model';
import { LoadMealsModalComponent } from '../load-meals-modal/load-meals-modal.component';

@Component({
  selector: 'app-add-meal-modal',
  templateUrl: './add-meal-modal.component.html',
  styleUrls: ['./add-meal-modal.component.scss']
})
export class AddMealModalComponent {
  title = '';
  date = new Date();

  constructor(private modalCtrl: ModalController, private store: Store) {}

  async openMealList() {
    const modal = await this.modalCtrl.create({
      component: LoadMealsModalComponent,
      componentProps: { selected: this.title }
    });

    modal.onDidDismiss().then(result => {
      if (result.data) {
        this.title = result.data;
      }
    });

    await modal.present();
  }


  close() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (!this.title.trim()) return;
    const meal: Meal = { id: uuidv4(), title: this.title, date: this.date };
    this.store.dispatch(addMeal({ meal }));
    this.close();
  }
}
