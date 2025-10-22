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
  allTitles: string[] = [];
  filteredTitles: string[] = [];
  search = '';

  constructor(private modalCtrl: ModalController, private store: Store) {
    this.store.select(selectAllMeals).subscribe((meals: Meal[]) => {
      const titles = meals.map(m => m.title);
      this.allTitles = Array.from(new Set(titles)).sort((a, b) => a.localeCompare(b));
      this.filteredTitles = [...this.allTitles];
    });
  }

  onSearchChange(event: any) {
    const value = event.target.value.toLowerCase();
    this.filteredTitles = this.allTitles.filter(t => t.toLowerCase().includes(value));
  }

  selectMeal(name: string) {
    this.modalCtrl.dismiss(name);
  }

  close() {
    this.modalCtrl.dismiss(null);
  }
}
