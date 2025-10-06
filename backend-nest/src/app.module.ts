import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret) throw new Error('JWT_SECRET not set');
        return { secret, signOptions: { expiresIn: '1d' } };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRoot(process.env.DB_URL ?? ''),
    UsersModule,
    AuthentificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}