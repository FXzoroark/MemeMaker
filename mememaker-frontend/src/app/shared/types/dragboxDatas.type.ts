import { ContentDatas } from "./contentDatas.type";

export type DragboxDatas = {
    id?: string;
    left: number;
    top: number;
    rot: number;
    width: number;
    height: number;
    contentDatas: ContentDatas;
};