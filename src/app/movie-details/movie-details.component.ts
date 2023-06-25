import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Movie } from '../interfaces';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})



export class MovieDetailsComponent implements OnInit {
  movie!: Movie;
  constructor(
    private route: ActivatedRoute,
    private fetchApiDataService: FetchApiDataService,
  ) { }

  ngOnInit(): void {


    this.getMovieDetails()

  }

  getMovieDetails(): void {
    const Title = this.route.snapshot.paramMap.get('title') as string;
    console.log(Title)
    this.fetchApiDataService.getOneMovies(Title)
      .subscribe((res: any) => {
        this.movie = res.data;
        return this.movie;

      })
  }

}


