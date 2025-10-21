import { createReducer, on } from '@ngrx/store';
import { addMeal, deleteMeal } from './meal.actions';
import { Meal } from '../meal.model';

export const initialState: Meal[] = [];

const _mealReducer = createReducer(
  initialState,
  on(addMeal, (state, { meal }) => [...state, meal]),
  on(deleteMeal, (state, { id }) => state.filter(m => m.id !== id))
);

export function mealReducer(state: Meal[] | undefined, action: any) {
  return _mealReducer(state, action);
}
