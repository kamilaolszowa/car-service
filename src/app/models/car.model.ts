import { Service } from "./service.model";

export interface Car {
    vin: string;
    brand: string;
    model: string;
    productionYear: number;
    services: Service[];
}