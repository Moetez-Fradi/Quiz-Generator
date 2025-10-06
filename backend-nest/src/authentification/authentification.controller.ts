import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { AuthGuard } from 'src/authentification/guards/auth.guard';

type AuthInput = {email: string, password : string}

@Controller('authentification')
export class AuthentificationController {
    constructor( private authService: AuthentificationService) {}

    @Post("/login")
    async login(@Body() payload: AuthInput) {
        return this.authService.login(payload);
    }

    @Post("/register")
    async register(@Body() payload: AuthInput) {
        return this.authService.register(payload);
    }

    @UseGuards(AuthGuard)
    @Get("/protected")
    async getInfo() {
        return {message: "This is protected"};
    }
}
