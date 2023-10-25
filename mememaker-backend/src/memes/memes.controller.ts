import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { HttpInterceptor } from 'src/interceptors/http.interceptor';
import { MemesService } from './memes.service';
import { CreateMemeDTO } from './dto/create-meme.dto';
import { MemeEntity } from './entities/meme.entity';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('memes')
@Controller('memes')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class MemesController {
    /**
     * Class constructor
     * @param _memesService
     */
    constructor(private readonly _memesService: MemesService){}
    
    /**
     * Handler to answer to GET /memes/blanks route
     * 
     * @returns Observable<MemeEntity[]>
     */
    @ApiOkResponse({
        description: 'Returns an array of blank meme',
        type: MemeEntity,
        isArray: true,
    })
    @ApiNoContentResponse({description: 'No blank meme exists in database'})
    @Get("blanks")
    findAllBlanks(): Observable<MemeEntity[] | void>{
        return this._memesService.findAllBlanks();
    }

    /**
     * Handler to answer to POST /memes route
     * 
     * @param createMemeDTO data to crate
     * 
     * @returns Observable<Meme>
     */
    @ApiCreatedResponse({
        description: 'The meme has been successfully created',
        type: MemeEntity,
    })
    @ApiBadRequestResponse({
        description: 'Payload provided is not good',
    })
    @ApiBody({
        description: 'Payload to create a new meme',
        type: CreateMemeDTO,
    })
    @Post()
    create(@Body() createMemeDTO: CreateMemeDTO): Observable<MemeEntity> {
        return this._memesService.create(createMemeDTO);
    }
}
