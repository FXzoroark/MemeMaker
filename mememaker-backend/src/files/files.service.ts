import { Injectable } from "@nestjs/common";
import { Observable, of } from "rxjs";
import * as fs from "fs"

@Injectable()
export class FileService{
    /**
     * Delete one uploaded image
     * 
     * @param {string} path path of the image
     * 
     * @return {Observable<void>}
     */
    delete = (path: string): void =>
        fs.unlinkSync(`./upload${path}`);

}