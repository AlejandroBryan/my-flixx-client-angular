import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import {Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../interfaces';
import { formatDate } from '@angular/common';

import {MovieCardComponent} from '../movie-card/movie-card.component';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [MovieCardComponent]
})
export class ProfilePageComponent implements OnInit{
  user:any = {};
  favoriteMovies: any[] = [];
  
  @Input() userData = {Firstname: '', Lastname: '', Username: '', Password: '', Email: '', Birthday: '' };
  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog,
    public isFavorites: MovieCardComponent,
       
  ){
    

  }
  ngOnInit(): void {
  this.getUser();
  }
   getUser(): void{
    
   this.user = this.fetchApiData.getUser();
   this.userData.Firstname = this.user.Firstname;
   this.userData.Lastname = this.user.Lastname;
   this.userData.Username = this.user.Username;
   this.userData.Password = '';
   this.userData.Email = this.user.Email;
   // this.user.Birthday comes in as ISOString format, like so: "2011-10-05T14:48:00.000Z"
   this.userData.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');

   this.fetchApiData.getAllMovies().subscribe((res: any) => {
    this.favoriteMovies = res.data.filter((m: { _id: any; }) => this.user.FavoriteMovies.indexOf(m._id) >= 0);
  });

   }

   editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result.data));

      this.snackBar.open('User successfully updated', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result.message, 'OK', {
        duration: 2000
      });
    });
  }

  /**
  *Calls the API to delete the user.
  */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe((result) => {
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open('User successfully deleted', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result.message, 'OK', {
        duration: 2000
      });
    });
  }

  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {

      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000
      });
    });
  }

  /**
  * Calls the check favorite movie method on the API.
  * @param id The movie ID
  */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  /**
   * Calls the delete favorite movie method on the API.
   * @param id The movie ID
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000
      });
    });
  }
 

}
