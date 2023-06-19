import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game} from "./model/game";
import {Status} from "./model/status";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title: String = 'Mancala Game';
  game?: Game;

  constructor(private http: HttpClient) {
  }

  startNewGame() {
    this.http.post<any>('http://localhost:8080/games', "{}")
      .subscribe((data) => {
        this.game = {
          id: data.id,
          activePlayer: data.activePlayer,
          pits: data.pits,
          status: data.status,
          winner: data.winner,
          errors: []
        }
      })
  }

  sow(pitId?: number) {
    if (pitId != null && this.isGameActive()) {
      this.http.put<any>('http://localhost:8080/games/' + this.game?.id + '/pits/' + pitId, "{}")
        .subscribe({
          next: data => {
            this.game = {
              id: data.id,
              activePlayer: data.activePlayer,
              pits: data.pits,
              status: data.status,
              winner: data.winner,
              errors: []
            };
          },
          error: error => {
            if (this.game) {
              this.game.errors = [error.error.message];
            }
            console.error('There was an error!', error);
          }
        });
      console.log(this.game);
    }
  }

  private isGameActive() {
    return this.game?.status == this.eStatus.ACTIVE
  }

  protected readonly eStatus = Status;
}
