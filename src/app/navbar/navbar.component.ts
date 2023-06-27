import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router) {

  }

  // navigate to the /movies
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  // navigate to the /profile
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * navigate back to the welcome page
   * clear the localStorage
   */
  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

}
