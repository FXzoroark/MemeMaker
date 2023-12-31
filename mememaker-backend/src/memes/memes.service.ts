import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Meme } from './memes.types';
import { Observable, catchError, defaultIfEmpty, filter, from, map, mergeMap, of, tap, throwError } from 'rxjs';
import { CreateCustomMemeDTO } from './dto/create-custom-meme.dto';
import { MemeEntity } from './entities/meme.entity';
import { MemesDao } from './dao/memes.dao';
import { UpdateMemeDTO } from './dto/update-meme.dto';
import { CreateBlankMemeDTO } from './dto/create-blank-meme.dto';

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
    create = (meme: CreateCustomMemeDTO | CreateBlankMemeDTO): Observable<MemeEntity> =>
        this._memesDao.save(meme).pipe(
            catchError(
                (e) => throwError(() => new UnprocessableEntityException(e.message)),
            ),
            map((memeCreated) => new MemeEntity(memeCreated)),
        );

    /**
     * Update a meme in memes list
     *
     * @param {string} id of the meme to update
     * @param meme data to update
     *
     * @returns {Observable<PersonEntity>}
     */
    update = (id: string, meme: UpdateMemeDTO): Observable<MemeEntity> =>
        this._memesDao.findByIdAndUpdate(id, meme).pipe(
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
        );

    
    /**
     * Deletes one meme in meme custom list
     *
     * @param {string} id of the meme to delete
     *
     * @returns {Observable<MemeEntity>}
     */
    delete = (id: string): Observable<MemeEntity> =>
        this._memesDao.findByIdAndRemoveCustom(id).pipe(
        catchError((e) =>
            throwError(() => new UnprocessableEntityException(e.message)),
        ),
        mergeMap((memeDeleted) =>
            !!memeDeleted
            ? of(new MemeEntity(memeDeleted))
            : throwError(
                () => new NotFoundException(`Meme with id '${id}' not found`),
                ),
        ),
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
