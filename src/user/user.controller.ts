import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAll() {
        const users: User[] = await this.userService.findAll();
        return users;
    } 

}
