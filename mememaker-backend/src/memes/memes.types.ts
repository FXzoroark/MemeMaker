export type Meme = {
    id: string;
    id_blank?: string;
    title: string;
    description?: string;
    creationDate: Date;
    updateDate: Date;
    path?: string;
    dragboxesDatas: DragboxDatas[];
}

export type DragboxDatas = {
    id: string;
    left: number;
    top: number;
    rot: number;
    width: number;
    height: number;
    content: ContentDatas;
};

export type ContentDatas = {
    text?: string;
    fontSize: number;
}
