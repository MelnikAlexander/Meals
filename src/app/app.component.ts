import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { Meal } from './meal.model';
import { loadMeals, deleteMeal } from './store/meal.actions';
import { selectAllMeals } from './store/meal.selectors';
import { AddMealModalComponent } from './add-meal-modal/add-meal-modal.component';
import {
  sortMealsByDate,
  normalizeMealDates,
  getTodayCalories,
  isToday
} from './meal.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  meals$: Observable<Meal[]>;
  todayCalories$: Observable<number>;
  isToday = isToday;

  constructor(private store: Store, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.store.dispatch(loadMeals());
    this.meals$ = this.store.select(selectAllMeals).pipe(
          map(meals => sortMealsByDate(normalizeMealDates(meals)))
        );
    this.todayCalories$ = this.meals$.pipe(
        map(meals =>
        meals.filter(m => isToday(m.date))
             .reduce((sum, m) => sum + (m.calories || 0), 0)
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
