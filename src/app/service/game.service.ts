import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GameService {
  private readonly gamesUrl: string;

  constructor(private http: HttpClient) {
    this.gamesUrl = 'http://localhost:8080/games';
  }

  public startNewGame() {
    return this.http.post<any>(this.gamesUrl, {})
  }

  public sow(gameId: string, pitId: number) {
    return this.http.put<any>(this.gamesUrl + `/${gameId}/pits/${pitId}`, {})
  }
}
