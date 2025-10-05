import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { AuthentificationController } from './authentification.controller';

@Module({
  providers: [AuthentificationService],
  controllers: [AuthentificationController]
})
export class AuthentificationModule {}
