import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatTooltip,
    ReactiveFormsModule,
    NgIf,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent{
  showUpdateForm: boolean = false;

  constructor(private fb: FormBuilder) { }

  updateForm = this.fb.group({
    username: ['', Validators.required],
    firstName: [''],
    lastName: [''],
    email: [''],
    address: [''],
    phoneNumber: ['']
  });

  onSubmitUpdate(): void {
    // @ts-ignore
    console.log(this.updateForm.value);
  }
}
