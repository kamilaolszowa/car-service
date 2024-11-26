import { Injectable } from "@angular/core";
import { Car } from "../models/car.model";
import { Service } from "../models/service.model";

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

    public addServiceToCar(service: Service, vin: string): void {
        const cars: Car[] = this.getCarsFromLocalStorage();
        const servicedCar = cars.find((car) => car.vin === vin);
        if (servicedCar) {
            servicedCar.services.push(service);
        }
        localStorage.setItem('carsArray', JSON.stringify(cars));
    }


}