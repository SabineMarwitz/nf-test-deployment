import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAll(): Promise<User[]> {
        return await this.userService.findAll();
    }
    
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.userService.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return user;
    }

}
