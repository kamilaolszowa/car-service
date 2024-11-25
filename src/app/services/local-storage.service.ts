import { Injectable } from "@angular/core";
import { Car } from "../models/car.model";

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    public addCarToLocalStorage(car: Car): void {
        const cars: Car[] = this.getCarsFromLocalStorage();
        cars.push(car);
        localStorage.setItem('carsArray', JSON.stringify(cars));
    }

    public getCarsFromLocalStorage(): Car[] {
        const carsArray: Car[] = JSON.parse(localStorage.getItem('carsArray') as string);
        if (carsArray) {
            return carsArray;
        } else {
            return [];
        }
    }


}