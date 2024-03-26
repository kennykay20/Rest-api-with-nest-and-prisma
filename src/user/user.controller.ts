import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
//import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guard';

@Controller('api/users')
export class UserController {
  constructor(private user: UserService) {}
  @UseGuards(JwtGuard)
  @Get('all')
  async getUser() {
    return await this.user.getAllUsers();
  }

  @Get('me/:id')
  async getUserById(@Param('id') id) {
    return await this.user.getUserById(id);
  }
}
