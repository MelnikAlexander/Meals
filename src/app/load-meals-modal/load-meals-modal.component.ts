import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Meal } from '../meal.model';
import { selectAllMeals } from '../store/meal.selectors';

@Component({
  selector: 'app-load-meals-modal',
  templateUrl: './load-meals-modal.component.html',
})
export class LoadMealsModalComponent {
  meals$: Observable<string[]>;

  constructor(private store: Store, private modalCtrl: ModalController) {
    this.meals$ = this.store.select(selectAllMeals).pipe(
      map(meals =>
        [...new Set(meals.map(m => m.title.trim()))]
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b))
      )
    );
  }

  selectMeal(title: string) {
    this.modalCtrl.dismiss(title);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
