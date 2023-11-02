import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Meme } from "../schemas/meme.schema";
import { Model } from "mongoose";
import { Observable, from, map, of, tap, throwIfEmpty } from "rxjs";
import { CreateMemeDTO } from "../dto/create-meme.dto";


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
   * @param {CreateMemeDTO} meme to create
   *
   * @return {Observable<Meme>}
   */
   save = (meme: CreateMemeDTO): Observable<Meme> =>
    from(new this._memeModel(meme).save());

    /**
   * Returns one meme of the list matching id in parameter
   *
   * @param {string} id of the meme in the db
   *
   * @return {Observable<Meme | void>}
   */
    findById = (id: string): Observable<Meme | void> =>
      from(this._memeModel.findById(id));

    updatePath = (id: string, path: string): Observable<Meme | void> =>
      from(this._memeModel.findByIdAndUpdate({_id:id}, {path:path}));
}