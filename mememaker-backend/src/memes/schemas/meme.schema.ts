import * as mongoose from 'mongoose'
import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";


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
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
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
      type: mongoose.Schema.Types.Date,
    })
    created_at: Date;

    @Prop({
      type: mongoose.Schema.Types.Date,
    })  
    updated_at: Date;

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
        contentDatas: raw({
          text: {
            type: String
          },
          fontSize: {
            type: Number,
            required: true,
          }

        }),
      }]
    })
    dragboxesDatas: {_id:any, left: number, top: number, rot: number, width: number, height: number, contentDatas: {text: string, fontSize: number}}[];
}

export const MemeSchema = SchemaFactory.createForClass(Meme);