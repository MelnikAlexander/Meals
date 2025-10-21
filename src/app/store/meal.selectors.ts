import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Meal } from '../meal.model';

export const selectMealsFeature = createFeatureSelector<Meal[]>('meals');

export const selectAllMeals = createSelector(
  selectMealsFeature,
  (state: Meal[] | null) => state || []
);
