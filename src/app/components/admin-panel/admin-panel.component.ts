import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AdminDetailsPanelComponent } from '../admin-details-panel/admin-details-panel.component';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/profile';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, AdminDetailsPanelComponent],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  profilesList: Profile[] = [];
  showProfileDetails = false;
  isEditingProfile = false;
  selectedProfile!: Profile;

  constructor(private profileService: ProfileService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchProfiles();
  }

  fetchProfiles(): void {
    this.profileService.getAllProfiles().subscribe({
      next: (data: Profile[]) => {
        this.profilesList = data;
      },
      error: (err: any) => {
        console.error('Error while fetching profiles', err)
        alert('Error while fetching profiles');
      },
    });
  }

  toggleCreateProfile(): void {
    this.selectedProfile = {} as Profile;
    this.showProfileDetails = !this.showProfileDetails;
    this.isEditingProfile = false;
  }

  createProfile(profileData: any): void {
    this.profileService.createProfile(profileData).subscribe({
      next: (data: Profile) => {
        console.log('Profile created successfully:', data);
        this.fetchProfiles();
        this.toggleCreateProfile();
      },
      error: (err: any) => {
        console.error('Error while creating profile', err)
        alert('Error while creating profile');
      },
    });
  }

  editProfile(profileData: Profile): void {
    this.selectedProfile = { ...profileData };
    this.isEditingProfile = true;
    this.showProfileDetails = true;
  }

  updateProfile(profileData: Profile): void {
    if (this.selectedProfile && this.selectedProfile.id) {
      this.profileService.updateProfile(this.selectedProfile.id, profileData).subscribe({
        next: (data: Profile) => {
          console.log('Profile updated successfully:', data);
          this.fetchProfiles();
          this.isEditingProfile = false;
          this.showProfileDetails = false;
        },
        error: (err: any) => {
          console.error('Error while updating profile', err)
          alert('Error while updating profile');
        },
      });
    }
  }

  deleteProfile(profileData: Profile): void {
    let text;
    if (confirm(`Are you really want to delete ${profileData.name}!`) == true) {
      if (profileData && profileData.id) {
        this.profileService.deleteProfile(profileData.id).subscribe({
          next: (data: any) => {
            console.log('Profile deleted successfully:', data);
            this.fetchProfiles();
            this.isEditingProfile = false;
            this.showProfileDetails = false;
          },
          error: (err: any) => {
            console.error('Error while deleting profile', err)
            alert('Error while deleting profile');
          },
        });
      }
    }
  }
}