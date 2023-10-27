import * as mongoose from 'mongoose'
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type MemeDocument = Meme & Document;

@Schema({
    toJSON: {
      virtuals: true,
      transform: (doc: any, ret: any) => {
        // delete obsolete data
        delete ret._id;
      },
    },
    versionKey: false,
  })

export class Meme {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: any;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
    })
    id_blank?: any;

    @Prop({
      type: String,
      required: true,
      trim: true,
    })
    title: string;

    @Prop({
      type: String,
    })
    description?: string;

    @Prop({
      type: String,
    })
    path?: string;

    @Prop({
      type: [{
        _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
        left: {type: Number, required: true},
        top: {type: Number, required: true},
        rot: {type: Number, required: true},
        width: {type: Number, required: true},
        height: {type: Number, required: true},
        content: {type: String,},
      }]
    })
    dragboxesDatas: {_id:any, left: number, top: number, rot: number, width: number, height: number, content?: string}[];
}

export const MemeSchema = SchemaFactory.createForClass(Meme);