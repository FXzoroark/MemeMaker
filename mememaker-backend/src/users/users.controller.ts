import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly _userService: UsersService) {}

  @Post('signin')
  async signUp(@Res() res, @Body() user) {
    try {
      const newUser = await this._userService.create(user);
      res.status(HttpStatus.CREATED).json(newUser);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'User registration failed' });
    }
  }

  @Post('login')
  async signIn(@Res() res, @Body() user) {
    const foundUser = await this._userService.findOne(user.username);

    if (!foundUser || foundUser.password !== user.password) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    res.status(HttpStatus.OK).json({ message: 'Logged in successfully' });
  }
}
