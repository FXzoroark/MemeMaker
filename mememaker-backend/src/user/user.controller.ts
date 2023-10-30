import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Res() res, @Body() user) {
    const newUser = await this.userService.create(user);
    res.status(HttpStatus.CREATED).json(newUser);
  }

  @Post('signin')
  async signIn(@Res() res, @Body() user) {
    const foundUser = await this.userService.findOne(user.username);

    if (!foundUser || foundUser.password !== user.password) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    res.status(HttpStatus.OK).json({ message: 'Logged in successfully' });
  }
}
