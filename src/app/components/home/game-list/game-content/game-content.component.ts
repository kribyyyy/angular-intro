import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-content',
  templateUrl: './game-content.component.html',
  styleUrls: ['./game-content.component.scss'],
})
export class GameContentComponent implements OnInit {
  @Input() game: any;

  constructor() {}

  ngOnInit(): void {}
}
