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
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-page',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CdkAccordionModule,
    NgIf
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

  public cars: Car[] = [];

  expandedIndex = 0;

  constructor(private localStorageService: LocalStorageService) {

  }

  public ngOnInit(): void {
    this.refreshCarList();
  }


  public addCar(): void {
    this.localStorageService.addCarToLocalStorage(this.newCarForm.value);
    this.newCarForm.reset();
    this.refreshCarList();
  }

  private refreshCarList(): void {
    this.cars = this.localStorageService.getCarsFromLocalStorage();

  }

}
