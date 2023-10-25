import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, defaultIfEmpty, filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meme } from '../types/meme.type';

@Injectable({
  providedIn: 'root'
})
export class MemesService {
  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {}
    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(
      (k) =>
        // @ts-ignore
        (this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`)
    );
  }

  fetchBlanks(): Observable<Meme[]>{
    //this._http.get<Meme[]>(this._backendURL.allBlanks).subscribe((memes) => console.log(memes))
    return this._http.get<Meme[]>(this._backendURL.allBlanks).pipe(
      filter((blankMemes: Meme[]) => !!blankMemes),
      defaultIfEmpty([])
    );
  }

  fetchCanva(path: string): any{
    return this._http.get(this._backendURL.blankCanvas+"6538417ff7d0c08dff7238a2.jpg").pipe(res => res);
  }
  
}
