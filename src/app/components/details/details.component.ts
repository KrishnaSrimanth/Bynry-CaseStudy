import { Component,inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { MapComponent } from '../map/map.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { MapMarker } from '../../models/mapMarker';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MapComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  profileService = inject(ProfileService)
  profile: Profile | undefined
  localProfileMapMarkers: Array<MapMarker> = [];
  profileMapMarkers: Array<MapMarker> = [];


  constructor(){
    const profileId = this.route.snapshot.params['id']
    // this.profileService.getProfileById(profileId).then((_profile) => {
    //   this.profile = _profile;
    //   this.updateMarkers()
    // } )
    this.profileService.getProfileById(profileId).subscribe({
      next: (data) => {
        this.profile = data;
        this.updateMarkers()
      },
      error: (err) => console.error('Error fetching profiles', err),
    })
    
  }

  updateMarkers(){
    this.localProfileMapMarkers.length=0
    this.profileMapMarkers.length=0
    if (this.profile!=null){
      let mapMarker : MapMarker = {
        latitude: this.profile.latitude,
        longitude: this.profile.longitude,
        markerText: '<b>'+this.profile!.name+'</b></br>'+this.profile.address!+', '+this.profile.city+', '+this.profile.state +', '+this.profile.country,
        markerLink: ''
      }
      this.localProfileMapMarkers.push(mapMarker)
      this.profileMapMarkers=[...this.localProfileMapMarkers]  
    }

  }
}