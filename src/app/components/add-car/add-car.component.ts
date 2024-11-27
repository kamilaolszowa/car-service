import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocalStorageService } from '../../services/local-storage.service';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgIf, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-car',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CdkAccordionModule,
  ],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.scss'
})
export class AddCarComponent {
  public newCarForm: FormGroup = new FormGroup({
    vin: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    productionYear: new FormControl('', [Validators.required]),
  })

  constructor(private localStorageService: LocalStorageService) {

  }

  public addCar(): void {
    this.localStorageService.addCarToLocalStorage({
      ...this.newCarForm.value,
      services: []
    });
    this.newCarForm.reset();
    this.localStorageService.refreshList$.next();
  }
}
