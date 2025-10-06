import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { AuthentificationController } from './authentification.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthentificationService],
  controllers: [AuthentificationController],
  imports: [UsersModule]
})
export class AuthentificationModule {}
