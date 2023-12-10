
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {
  @Input() userData = { Username: '', Password: '', };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void { }

  /**
   * Call the login user data service once user is authenticated
   * 
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result: any) => {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close();
      this.router.navigate(['movies']);
      this.snackBar.open(result.message, 'OK', {
        duration: 2000,
      });
    }, (result) => {
      this.snackBar.open(result.message, 'OK', {
        duration: 2000
      });
    });
  }


}
