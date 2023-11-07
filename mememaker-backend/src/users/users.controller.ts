import { Controller, Post, Body, Res, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { HttpInterceptor } from 'src/interceptors/http.interceptor';
import { CreateUserDTO } from './dto/create-user.dto';
import { Observable } from 'rxjs';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class UsersController {

  constructor(private readonly _userService: UsersService) {}

  @ApiCreatedResponse({
    description: "",
    type: UserEntity
  })
  @ApiBadRequestResponse()
  @ApiBody({
    description: "",
    type: CreateUserDTO
  })
  @Post('signin') 
  signin(@Body() createUserDTO: CreateUserDTO): Observable<UserEntity> {
    return this._userService.create(createUserDTO);
  }
}
