import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Part } from '../../models/part.model';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-add-service',
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
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss'
})
export class AddServiceComponent {
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


  constructor(private localStorageService: LocalStorageService) {

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
    this.localStorageService.refreshList$.next();
  }



  public addPart(): void {
    this.currentServiceParts.push(this.newPartForm.value);
    this.newPartForm.reset();
    this.newPartForm.markAsUntouched();
  }
}
