import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get, Param, Body, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get("/email/:email")
    async findUserByEmail (@Param('email') email: string) {
        return this.usersService.findUserByEmail(email);
    }
}