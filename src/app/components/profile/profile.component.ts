import { Component, Input } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Profile } from '../../models/profile';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() profile!: Profile;

}
