import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { JokeService } from '../services/joke.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private jokeService: JokeService,
  ) { }

  jokes: any = [];
  categories: any = [];
  feedCategory: any = '';

  sortFilter: any = '';

  searchText: any = '';

  postJokeCategory: any = '';
  postJokeText: any = '';


  ngOnInit() {
    this.getHomeFeedJokes();
    this.getCategories();
  }

  async getCategories() {
    this.categories = await this.jokeService.getCategories();
    console.log(this.categories);
  }

  async getHomeFeedJokes() {
    this.jokes = await this.jokeService.getTenRandomJokes();

    console.log(this.jokes);
  }

  async postJoke() {
    const newJoke: any = {};
    newJoke.text = this.postJokeText;
    newJoke.categoryId = this.postJokeCategory;

    const res = await this.jokeService.postJoke(newJoke);
    if (res['text'] === newJoke.text) {
      alert('Joke Inserted! :)');
    } else {
      alert('There was in issue inserting the joke :(');
    }
  }

  async onCategoryChange() {
    this.jokes = await this.jokeService.getJokesForCategory(this.feedCategory);
  }

  async jokeRating(ratingScore: number, jokeId: number) {

    const rate: any = {};
    rate.jokeId = jokeId;
    rate.rating = ratingScore;
    console.log(ratingScore + ' ' + jokeId);

    const res = await this.jokeService.rateJoke(rate);
    console.log(res);
    if (res['joke'].jokeId === jokeId && res['rating'] === ratingScore) {
      alert('Joke Rated! :)');
    } else {
      alert('There was in issue rating the joke :(');
    }

    this.getHomeFeedJokes();

  }

  async sortJokes(event) {
    console.log(event);
    switch (event.target.value) {
      case 'Hot':
        this.jokes = this.getHomeFeedJokes();
        break;
      case 'Month':
        this.jokes = await this.jokeService.getTopOfTheMonth();
        break;
      case 'Year':
        this.jokes = await this.jokeService.getTopOfTheYear();
        break;
      case 'AllTime':
        this.jokes = await this.jokeService.getTopOfAllTime();
    }
  }

  async searchByUserName() {
    this.jokes = await this.jokeService.searchJokesByUsername(this.searchText);
  }

  async goToUserProfile(userId: number) {
    console.log(us
  }

}
