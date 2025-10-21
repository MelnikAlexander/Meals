import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddMealModalComponent } from './add-meal-modal/add-meal-modal.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { mealReducer } from './store/meal.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({ keys: ['meals'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    AddMealModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),   
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ meals: mealReducer }, { metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
