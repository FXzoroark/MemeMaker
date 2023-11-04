import { Body, ClassSerializerInterceptor, Controller, Get, Delete, Param, Post, UseInterceptors, Put } from '@nestjs/common';
import { Observable, filter, map, of } from 'rxjs';
import { HttpInterceptor } from 'src/interceptors/http.interceptor';
import { MemesService } from './memes.service';
import { CreateMemeDTO } from './dto/create-meme.dto';
import { MemeEntity } from './entities/meme.entity';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnprocessableEntityResponse,
  } from '@nestjs/swagger';import { HandlerParams } from './validators/handler-params';
import { FileService } from 'src/files/files.service';
import { UpdateMemeDTO } from './dto/update-meme.dto';

@ApiTags('memes')
@Controller('memes')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class MemesController {
    /**
     * Class constructor
     * @param _memesService
     */
    constructor(private readonly _memesService: MemesService, private readonly _filesService: FileService){}

    /**
     * Handler to answer to GET /memes route
     * 
     * @returns Observable<MemeEntity[]>
     */
    @ApiOkResponse({
        description: 'Returns an array of meme',
        type: MemeEntity,
        isArray: true,
    })
    @ApiNoContentResponse({description: 'No meme exists in database'})
    @Get()
    findAll(): Observable<MemeEntity[] | void>{
        return this._memesService.findAll();
    }

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
     * Handler to answer to GET /memes/:id route
     *
     * @param {HandlerParams} params list of route params to take meme id
     *
     * @returns Observable<MemeEntity>
     */
    @ApiOkResponse({
    description: 'Returns the meme for the given "id"',
    type: MemeEntity,
    })
    @ApiNotFoundResponse({
    description: 'Meme with the given "id" doesn\'t exist in the database',
    })
    @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
    })
    @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
    @ApiParam({
    name: 'id',
    description: 'Unique identifier of the meme in the database',
    type: String,
    allowEmptyValue: false,
    })
    @ApiNoContentResponse({description: 'No meme exists in database'})
    @Get(':id')
    findOne(@Param() params: HandlerParams): Observable<MemeEntity>{
        return this._memesService.findOne(params.id);
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

      /**
   * Handler to answer to PUT /memes/:id route
   *
   * @param {HandlerParams} params list of route params to take meme id
   * @param updateMemeDto data to update
   *
   * @returns Observable<MemeEntity>
   */
  @ApiOkResponse({
    description: 'The meme has been successfully updated',
    type: MemeEntity,
  })
  @ApiNotFoundResponse({
    description: 'meme with the given "id" doesn\'t exist in the database',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the meme in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a meme', type: UpdateMemeDTO })
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() updateMemeDto: UpdateMemeDTO,
  ): Observable<MemeEntity> {
    return this._memesService.update(params.id, updateMemeDto);
  }


    /**
     * Handler to answer to DELETE /memes/:id route
     * 
     * @param {HandlerParams} param list of route params to take meme id
     * 
     * @returns Observable<void>
     */
    @ApiNoContentResponse({
        description: 'The meme has been successfully deleted',
    })
    @ApiNotFoundResponse({
        description: 'Meme with given "id" doesn\'t exist in the database',
    })
    @ApiUnprocessableEntityResponse({
        description: "The request can't be performed in the database",
    })
    @ApiBadRequestResponse({
         description: 'Parameter provided is not good' 
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the meme in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Delete(':id')
    delete(@Param() params: HandlerParams): Observable<void> {
    return this._memesService.delete(params.id).pipe(
        filter((memeDeleted: MemeEntity) => !!memeDeleted),
        map((memeDeleted: MemeEntity) => this._filesService.delete(memeDeleted.path))
    );
    }
}
