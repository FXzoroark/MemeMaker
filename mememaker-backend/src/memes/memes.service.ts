import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Meme } from './memes.types';
import { Observable, catchError, defaultIfEmpty, filter, from, map, mergeMap, of, tap, throwError } from 'rxjs';
import { CreateMemeDTO } from './dto/create-meme.dto';
import { MemeEntity } from './entities/meme.entity';
import { MemesDao } from './dao/memes.dao';

@Injectable()
export class MemesService {
    private _memes: Meme[];

    constructor(private readonly _memesDao: MemesDao){
        this._memes = [];
    }

    /**
     * Returns all existing memes in the list
     * 
     * @returns {Observable<MemeEntity[] | void>}
     */
    findAll = (): Observable<MemeEntity[] | void> =>
        this._memesDao.findAll().pipe(
            filter(Boolean),
            map((memes) => (memes || []).map((meme) => new MemeEntity(meme))),
            defaultIfEmpty(undefined),
            );

    /**
     * Returns all existing blanks memes in the list
     * 
     * @returns {Observable<MemeEntity[] | void>}
     */
    findAllBlanks = (): Observable<MemeEntity[] | void> =>
        this._memesDao.findAllBlanks().pipe(
            filter(Boolean),
            map((memes) => (memes || []).map((meme) => new MemeEntity(meme))),
            defaultIfEmpty(undefined),
            );
    
    /**
     * Returns one meme of the list matching id in parameter
     *
     * @param {string} id of the meme
     *
     * @returns {Observable<MemeEntity>}
     */
    findOne = (id: string): Observable<MemeEntity> =>
        this._memesDao.findById(id).pipe(
        catchError((e) =>
            throwError(() => new UnprocessableEntityException(e.message)),
        ),
        mergeMap((meme) =>
            !!meme
            ? of(new MemeEntity(meme))
            : throwError(
                () => new NotFoundException(`Meme with id '${id}' not found`),
                ),
        ),
    );

    
    /**
     * add meme to memes list
     * 
     * @param meme to create
     * 
     * @returns {Observable<MemeEntity>}
     */
    create = (meme: CreateMemeDTO): Observable<MemeEntity> =>
        this._memesDao.save(meme).pipe(
            catchError(
                (e) => throwError(() => new UnprocessableEntityException(e.message)),
            ),
            map((memeCreated) => new MemeEntity(memeCreated)),
        );
    
    /**
     * update the path of the canva of the meme with the param id
     * 
     * @param id id of the meme
     * @param path path of the canva of the meme
     * 
     * @returns {Observable<MemeEntity>}
     */
    updatePath = (id:string, path: string): Observable<MemeEntity> =>{

        return this._memesDao.updatePath(id, path).pipe(
            catchError(
                (e) => throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((memeUpdated) =>
            !!memeUpdated
              ? of(new MemeEntity(memeUpdated))
              : throwError(
                  () => new NotFoundException(`Meme with id '${id}' not found`),
                ),
          ),        
          )
    }

}
