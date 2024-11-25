import { Component,inject, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile.service';
import { MapComponent } from '../map/map.component';
import { MapMarker } from '../../models/mapMarker';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule ,ProfileComponent,MapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{
  profileList: Profile[] = []
  filteredProfileList: Profile[] = []
  map: any;
  localProfileMapMarkers: Array<MapMarker> = [];
  profileMapMarkers: Array<MapMarker> = [];

  profileService: ProfileService = inject(ProfileService)
  constructor(){
    this.profileService.getAllProfiles().subscribe({
      next: (data) => {
        this.profileList = data;
        this.filteredProfileList = data
        this.updateMarkers()

      },
      error: (err) => {
        console.error('Error while fetching profiles', err)
        alert('Error while fetching profiles')
        },
    });
  }

  filterResults (text: string){
    if (!text) {
      this.filteredProfileList = this.profileList;
    }else{
      this.filteredProfileList = this.profileList.filter((profile) =>
        profile?.name.toLowerCase().includes(text.toLowerCase()),
      );
    }
    this.updateMarkers()
  }

  updateMarkers(){
    this.localProfileMapMarkers.length=0
    this.profileMapMarkers.length=0

    this.filteredProfileList.forEach(profile => {
      let mapMarker : MapMarker = {
        latitude: profile.latitude,
        longitude: profile.longitude,
        markerText: '<b>'+profile!.name+'</b></br>'+profile.address!+', '+profile.city+', '+profile.state +', '+profile.country,
        markerLink: ''
      }
      this.localProfileMapMarkers.push(mapMarker)
    })
    this.profileMapMarkers=[...this.localProfileMapMarkers]

  }
}