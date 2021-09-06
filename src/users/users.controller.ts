import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getOneById(@Param() params): Promise<User> {
        return this.usersService.getUser(params.id);
    }

    @Post()
    create(@Body() user: User) {
        return this.usersService.createUser(user);
    }

    @Put(':id')
    update(
        @Param() params,
        @Body() user: User
    ) {
        return this.usersService.updateUser(params.id, user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.usersService.deleteUser(params.id);
    }
}