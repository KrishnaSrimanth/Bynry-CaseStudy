// src/app/profile.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private urlEndpoint: string = 'http://localhost:3000/profiles';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Create a new Profile (POST request)
  createProfile(profile: Profile): Observable<Profile> {
    return this.http
      .post<Profile>(this.urlEndpoint, profile, this.httpOptions)
      .pipe(catchError(this.processError));
  }

  // Get all Profiles (GET request)
  getAllProfiles(): Observable<Profile[]> {
    return this.http
      .get<Profile[]>(this.urlEndpoint)
      .pipe(catchError(this.processError));
  }

  // Get a single Profile by ID (GET request)
  getProfileById(id: string): Observable<Profile> {
    const url = `${this.urlEndpoint}/${id}`;
    return this.http
      .get<Profile>(url)
      .pipe(catchError(this.processError));
  }

  // Update a Profile by ID (PUT request)
  updateProfile(id: string, profile: Profile): Observable<Profile> {
    const url = `${this.urlEndpoint}/${id}`;
    return this.http
      .put<Profile>(url, profile, this.httpOptions)
      .pipe(catchError(this.processError));
  }

  // Delete a Profile by ID (DELETE request)
  deleteProfile(id: string): Observable<{}> {
    const url = `${this.urlEndpoint}/${id}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.processError));
  }

  private processError(error: any): Observable<never> {
    console.error('An error occurred', error);  // Log the error
    throw new Error('Unable to communicate with backend');
  }
}
