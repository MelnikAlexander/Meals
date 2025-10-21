import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ModalController } from '@ionic/angular';

import { Meal } from './meal.model';
import { loadMeals, deleteMeal } from './store/meal.actions';
import { selectAllMeals } from './store/meal.selectors';
import { AddMealModalComponent } from './add-meal-modal/add-meal-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  meals$!: Observable<Meal[]>;

  constructor(private store: Store, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.store.dispatch(loadMeals());
    this.meals$ = this.store.select(selectAllMeals).pipe(
      map(meals =>
        [...meals].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      )
    );
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddMealModalComponent
    });
    await modal.present();
  }

  delete(id: string) {
    this.store.dispatch(deleteMeal({ id }));
  }
}
