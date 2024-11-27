import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Car } from '../../models/car.model';
import { MatDivider } from '@angular/material/divider';
import { LocalStorageService } from '../../services/local-storage.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddCarComponent } from '../add-car/add-car.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cars-list',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CdkAccordionModule,
    NgIf,
    NgFor,
    MatDivider
  ],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.scss'
})
export class CarsListComponent implements OnInit {
  public cars: Car[] = [];
  public expandedIndex = 0;

  constructor(private localStorageService: LocalStorageService) {
    this.localStorageService.refreshList$.pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      this.refreshCarList();
    })
  }

  public ngOnInit(): void {
    this.refreshCarList();
  }

  private refreshCarList(): void {
    this.cars = this.localStorageService.getCarsFromLocalStorage();
  }
}
