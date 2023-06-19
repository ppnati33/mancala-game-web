import {Component} from '@angular/core';
import {Game} from "./model/game";
import {Status} from "./model/status";
import {GameService} from "./service/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [GameService]
})
export class AppComponent {
  title: String = 'Mancala Game';
  game?: Game;

  constructor(private gameService: GameService) {
  }

  startNewGame() {
    this.gameService.startNewGame()
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
    if (this.game?.id != null && this.isGameActive() && pitId != null) {
      this.gameService.sow(this.game?.id, pitId)
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
