import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, defaultIfEmpty, filter, map } from 'rxjs';
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

  fetchMemes(): Observable<Meme[]>{
    return this._http.get<Meme[]>(this._backendURL.allMemes).pipe(
      filter((memes: Meme[]) => !!memes),
      defaultIfEmpty([])
    )
  }

  fetchBlanks(): Observable<Meme[]>{
    //this._http.get<Meme[]>(this._backendURL.allBlanks).subscribe((memes) => console.log(memes))
    return this._http.get<Meme[]>(this._backendURL.allBlanks).pipe(
      filter((blankMemes: Meme[]) => !!blankMemes),
      defaultIfEmpty([])
    );
  }

  fetchOne(memeId: string): Observable<Meme>{
    return this._http.get<Meme>(
      this._backendURL.oneMeme.replace(':id', memeId)
    )
  }

  fetchCanva(path: string): Observable<Blob>{
    return this._http.get(this._backendURL.base+path, {responseType: 'blob'}).pipe(
      filter((file: Blob) => !!file),
    );
  }

  create(newMeme: Meme): Observable<any> {
    return this._http.post<Meme>(
      this._backendURL.allMemes,
      newMeme,
      this._options()
    )
  }

  update(memeId: string, meme: Meme) : Observable<any> {
    return this._http.put<Meme>(
      this._backendURL.oneMeme.replace(":id", memeId),
      meme,
      this._options()
    )
  }

  delete(memeId: string): Observable<string> {
    return this._http
               .delete(this._backendURL.oneMeme.replace(':id', memeId))
               .pipe(map(() => memeId))
  }

  upload(memeId: string, blob: Blob, isTemplate: boolean): Observable<any>{
    let fd = new FormData();
    fd.append('id', memeId);
    fd.append('isTemplate', isTemplate.toString());
    fd.append('canva', new File([blob], memeId+".jpg"));
    return this._http.post(
      this._backendURL.uploadMeme,
      fd,
      {headers: new HttpHeaders({})}
    )
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return {
      headers: new HttpHeaders(
        Object.assign({ 'Content-Type': 'application/json' }, headerList)
      ),
    };
  }
  
}
