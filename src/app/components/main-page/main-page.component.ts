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
import { AddCarComponent } from "../add-car/add-car.component";
import { CarsListComponent } from "../cars-list/cars-list.component";
import { AddServiceComponent } from "../add-service/add-service.component";

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
    AddCarComponent,
    CarsListComponent,
    AddServiceComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
}
