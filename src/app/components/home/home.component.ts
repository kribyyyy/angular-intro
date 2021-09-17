import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public sort: string;
  public games: Array<Game>;

  name = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  playTime = new FormControl(20, Validators.required);
  genre = new FormControl();

  constructor(
    private httpService: HttpService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string): void {
    this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  addNewGame(): void {
    let details = {
      background_image: '',
      name: this.name.value,
      release: '',
      metacritic_url: '',
      website: '',
      description: '',
      metacritic: 0,
      genres: this.genre.value,
      parent_platforms: [{ platform: { name: '' } }],
      publishers: [{ name: '' }],
      ratings: [{ id: 0, count: 0, title: '' }],
      screenshots: [{ name: '' }],
      trailers: [{ data: { max: '' } }],
    };

    this.games.unshift(details);
  }
}
