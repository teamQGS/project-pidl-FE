import { Component } from '@angular/core';
import {SettingsComponent} from "../profile/settings/settings.component";

@Component({
  selector: 'app-update-user-form',
  standalone: true,
  imports: [
    SettingsComponent
  ],
  templateUrl: './update-user-form.component.html',
  styleUrl: './update-user-form.component.css'
})
export class UpdateUserFormComponent {

}
