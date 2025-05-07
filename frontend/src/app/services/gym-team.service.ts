import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GymTeam } from '../models/gym-team.model';

@Injectable({
  providedIn: 'root',
})
export class GymTeamService {
  private apiUrl = '/api/gymteams';

  constructor(private http: HttpClient) {
    console.log('GymTeamService initialized');
  }

  getGymTeams(): Observable<GymTeam[]> {
    return this.http.get<GymTeam[]>(this.apiUrl);
  }

  addGymTeam(gymTeam: GymTeam): Observable<GymTeam> {
    return this.http.post<GymTeam>(this.apiUrl, gymTeam);
  }

  deleteGymTeam(gymTeamId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${gymTeamId}`);
  }

}