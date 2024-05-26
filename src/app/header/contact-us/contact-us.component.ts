import { Component } from '@angular/core';
import {FormBuilder, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import { AxiosService } from '../../services/axios/axios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  constructor(
    private axiosService: AxiosService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  contactUsForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    subject: [ '', Validators.required],
    feedbackContent: [ '', Validators.required]
  });

  onSubmit() {
    const formattedDate = this.formatDate(new Date());
    this.axiosService.request(
        "POST",
        "/api/feedback/add",
        {
          username: this.contactUsForm.value.username,
          email: this.contactUsForm.value.email,
          subject: this.contactUsForm.value.subject,
          feedbackContent: this.contactUsForm.value.feedbackContent,
          date: formattedDate
        }
      ).then(response => {
        this.snackBar.open("Message sent successfully", '', {
          duration: 3000
        });
      }).catch(error => {
        console.log('error', error);
        this.snackBar.open("Error occurred while sending message", '', {
          duration: 3000
        });
      });
    }
  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }
}
