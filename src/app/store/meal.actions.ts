import { createAction, props } from '@ngrx/store';
import { Meal } from '../meal.model';

export const loadMeals = createAction('[Meal] Load Meals');
export const addMeal = createAction('[Meal] Add Meal', props<{ meal: Meal }>());
export const deleteMeal = createAction('[Meal] Delete Meal', props<{ id: string }>());
