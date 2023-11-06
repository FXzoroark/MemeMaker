import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Meme } from "../schemas/meme.schema";
import { Model } from "mongoose";
import { Observable, from, map, of, tap, throwIfEmpty, timestamp } from "rxjs";
import { CreateCustomMemeDTO } from "../dto/create-custom-meme.dto";
import { UpdateMemeDTO } from "../dto/update-meme.dto";
import { CreateBlankMemeDTO } from "../dto/create-blank-meme.dto";


@Injectable()
export class MemesDao{
  /**
   * Class constructor
   *
   * @param {Model<Meme>} _memeModel instance of the model representing a Meme
   */
  constructor(
    @InjectModel(Meme.name)
    private readonly _memeModel: Model<Meme>,
  ) {}

    /**
   * Call mongoose method, call toJSON on each result and returns MemeModel[]
   *
   * @return {Observable<Meme[]>}
   */
  findAll = (): Observable<Meme[]> =>
    from(this._memeModel.find({id_blank: {$exists: true}})).pipe(map((memes) => [].concat(memes)));
  
  /**
   * Call mongoose method, call toJSON on each result and returns MemeModel[]
   *
   * @return {Observable<Meme[]>}
   */
  findAllBlanks = (): Observable<Meme[]> =>
    from(this._memeModel.find({id_blank: {$exists: false}})).pipe(map((memes) => [].concat(memes)));

  /**
   * add meme it in memes list
   *
   * @param {CreateCustomMemeDTO | CreateBlankMemeDTO} meme to create
   *
   * @return {Observable<Meme>}
   */
   save = (meme: CreateCustomMemeDTO | CreateBlankMemeDTO): Observable<Meme> =>
    from(new this._memeModel({...meme, creationDate: Date.now(), updateDate: Date.now()}).save());

  /**
   * Returns one meme of the list matching id in parameter
   *
   * @param {string} id of the meme in the db
   *
   * @return {Observable<Meme | void>}
   */
  findById = (id: string): Observable<Meme | void> =>
    from(this._memeModel.findById(id));

  /**
   * Update a meme in memes list
   * 
   * @param {string} id
   * @param {UpdateMemeDTO} meme
   * 
   * @return {Observable<Meme | void>}
   */
  findByIdAndUpdate = (
    id: string,
    meme: UpdateMemeDTO
  ): Observable<Meme | void> =>
    from(
      this._memeModel.findByIdAndUpdate(id, meme, {
        new: true,
        runValidators: true,
      }),
    )
    
  /**
   * Delete a custom meme in meme list
   * 
   * @param {string} id 
   * @param {string} path 
   * @returns {Observable<Meme | void>}
   */
  findByIdAndRemoveCustom = (id: string): Observable<Meme | void> =>
    from(this._memeModel.findOneAndRemove({_id: id, id_blank: {$exists: true}}))
  
  /**
   * update image path of a meme
   * 
   * @param {string} id 
   * @param {string} path 
   * @returns {Observable<Meme | void>}
   */
  updatePath = (id: string, path: string): Observable<Meme | void> =>
    from(this._memeModel.findByIdAndUpdate({_id:id}, {path:path}));


}