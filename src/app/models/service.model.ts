import { Part } from "./part.model";

export interface Service {
    serviceCost: number;
    totalCost: number;
    parts: Part[];
}