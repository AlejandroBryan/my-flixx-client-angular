import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { map,  catchError  } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl: String = 'https://myflixx.herokuapp.com/api/v1/';
//https://myflixx.herokuapp.com
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users/register', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for fetching all movies endpoint
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    

    return this.http.get(apiUrl + 'movies',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call for the one movies endpoint
  public getOneMovies(title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies/' + title,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
    // Making the api call for the one movies endpoint
    public getOneGenre(title: string): Observable<any> {
      const token = localStorage.getItem('token');
  
      return this.http.get(apiUrl + 'movies/' + title,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        }).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

  // Making the api call for the user registration endpoint
  public getOneDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(apiUrl + 'movies/director' + director,
      {
        header: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call for the user registration endpoint
  public getOneMovieByGenres(genres: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(apiUrl + 'movies/genres' + genres,
      {
        header: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

    // Making the api call for the user registration endpoint
    public getUser(): Observable<any> {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;

    }

    addFavoriteMovie(movieId: string): Observable<any> {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      
      user.FavoriteMovies.push(movieId);
      localStorage.setItem('user', JSON.stringify(user));
      return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movieId,{} ,{
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }),
        responseType: "text"
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    isFavoriteMovie(movieId: string): boolean {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.FavoriteMovies.indexOf(movieId) >= 0;
    }

    deleteFavoriteMovie(movieId: string): Observable<any> {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
  
      const index = user.FavoriteMovies.indexOf(movieId);
      console.log(index);
      if (index > -1) { // only splice array when item is found
        user.FavoriteMovies.splice(index, 1); // 2nd parameter means remove one item only
      }
      localStorage.setItem('user', JSON.stringify(user));
      return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }),
        responseType: "text"
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    editUser(updatedUser: any): Observable<any> {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      return this.http.put(apiUrl + 'users/' + user.Username, updatedUser, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    deleteUser(): Observable<any> {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      return this.http.delete(apiUrl + 'users/' + user.Username , {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }),
        responseType: "text"
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error.message}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
