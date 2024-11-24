import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Component({
  selector: 'app-admin-details-panel',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './admin-details-panel.component.html',
  styleUrls: ['./admin-details-panel.component.css']
})
export class AdminDetailsPanelComponent {
  @Input() profile: any = {
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    longitude: 0,
    latitude: 0,
    photo: ''
  };
  @Output() createProfile = new EventEmitter<any>();
  @Output() updateProfile = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  onSubmit(): void {
    if (this.profile.id) {
      this.updateProfile.emit(this.profile);  // If profile has an ID, emit updateProfile
    } else {
      this.createProfile.emit(this.profile);  // Otherwise, emit createProfile
    }
  }
  cancelForm(): void {
    this.cancel.emit();
  }

  onFileSelected(event: any) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.profile.photo=base64
    });

  }
  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let base64String = reader.result;
      if (base64String != null){
        result.next(base64String.toString())
      }else{
        result.next('')
        console.log('Unable to load image')
        alert('Unable to load image')
      }
      
      } 
    return result;
  }
}
