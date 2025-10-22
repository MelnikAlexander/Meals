import { Meal } from './meal.model';

export function normalizeMealDates(meals: Meal[]): Meal[] {
  return meals.map(m => ({
    ...m,
    date: m.date instanceof Date ? m.date : new Date(m.date),
  }));
}

export function sortMealsByDate(meals: Meal[]): Meal[] {
  return [...meals].sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function filterTodayMeals(meals: Meal[]): Meal[] {
  return meals.filter(m => isToday(m.date));
}

export function getTodayCalories(meals: Meal[]): number {
  return filterTodayMeals(meals).reduce((sum, m) => sum + (m.calories || 0), 0);
}
