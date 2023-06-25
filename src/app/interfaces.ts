export interface Movie {
    Title?: String;
    Description: String;
    Release_year: String;
    Runtime: String;
    Genres:genres[];
    Director:director[];
    Actors: String;
    ImagePath: String;
    Featured: Boolean;
  }

  interface genres{
    Name: String;
  }

  interface director{
    Name: String,
    Biography: String,
    Birth: String,
    Death: String,
    Directing: Movie [],

  }

  export interface User {
    Firstname?:  String
    Lastname?:  String
    Username?:  String
    Password?:  String
    Email?:  String
    Birthday?: Date,
    FavoriteMovies?: Movie[],
  }
 