import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KeyringService } from 'src/keyring/keyring.service';
import { SailscallsService } from 'src/sailscallsService/sailscalls.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtService, 
    KeyringService,
    SailscallsService
  ],
})
export class AuthModule {}
