import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LocalStorageService } from '../../services/local-storage.service';
import { throwIfEmpty } from 'rxjs';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Car } from '../../models/car.model';
import { NgFor, NgIf } from '@angular/common';
import { Part } from '../../models/part.model';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-main-page',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDivider,
    FormsModule,
    ReactiveFormsModule,
    CdkAccordionModule,
    NgIf,
    NgFor
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  public newCarForm: FormGroup = new FormGroup({
    vin: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    productionYear: new FormControl('', [Validators.required]),
  })
  public newServiceForm: FormGroup = new FormGroup({
    vin: new FormControl('', [Validators.required]),
    serviceCost: new FormControl('', [Validators.required]),
    totalCost: new FormControl('', [Validators.required]),
  })
  public newPartForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    cost: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  })
  public currentServiceParts: Part[] = [];



  public cars: Car[] = [];

  expandedIndex = 0;

  constructor(private localStorageService: LocalStorageService) {

  }

  public ngOnInit(): void {
    this.refreshCarList();
  }


  public addCar(): void {
    this.localStorageService.addCarToLocalStorage({
      ...this.newCarForm.value,
      services: []
    });
    this.newCarForm.reset();
    this.refreshCarList();
  }
  public addService(): void {
    let costOfAllParts: number = 0;
    this.currentServiceParts.forEach((currentPart) => {
      costOfAllParts += (Number(currentPart.cost) * Number(currentPart.quantity))
    })

    this.localStorageService.addServiceToCar({
      serviceCost: this.newServiceForm.value.serviceCost,
      totalCost: Number(this.newServiceForm.value.serviceCost) + costOfAllParts,
      parts: this.currentServiceParts
    },
      this.newServiceForm.value.vin
    );
    this.newServiceForm.reset();
    this.refreshCarList();
  }

  private refreshCarList(): void {
    this.cars = this.localStorageService.getCarsFromLocalStorage();

  }

  public addPart(): void {
    this.currentServiceParts.push(this.newPartForm.value);
    this.newPartForm.reset();
    this.newPartForm.markAsUntouched();
  }

}
