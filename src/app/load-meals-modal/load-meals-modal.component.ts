import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Meal } from '../meal.model';
import { selectAllMeals } from '../store/meal.selectors';

@Component({
  selector: 'app-load-meals-modal',
  templateUrl: './load-meals-modal.component.html',
  styleUrls: ['./load-meals-modal.component.scss']
})
export class LoadMealsModalComponent {
  allMeals: Meal[] = [];
  filteredMeals: Meal[] = [];
  search = '';

  constructor(private modalCtrl: ModalController, private store: Store) {
    this.store.select(selectAllMeals).subscribe((meals: Meal[]) => {
      this.allMeals = [...meals];
      this.filteredMeals = [...meals];
    });
  }

  onSearchChange(event: any) {
    const value = event.target.value.toLowerCase();
    this.filteredMeals = this.allMeals.filter(m =>
      m.title.toLowerCase().includes(value)
    );
  }

  selectMeal(meal: Meal) {
    this.modalCtrl.dismiss(meal);
  }

  close() {
    this.modalCtrl.dismiss(null);
  }
}
