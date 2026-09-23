import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';

import { AuthGuard } from './auth.guard';

import { ProfessorGuard } from './professor.guard';

import { DatabaseModule } from '../database/database.module';

@Module({

  imports: [

    ConfigModule,

    DatabaseModule,

    JwtModule.registerAsync({

      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({

        secret: configService.get<string>('JWT_SECRET'),

        signOptions: {

          expiresIn: '1d',

        },

      }),

    }),

  ],

  controllers: [AuthController],

  providers: [

    AuthService,

    AuthGuard,

    ProfessorGuard,

  ],

  exports: [

    AuthService,

    JwtModule,

    AuthGuard,

    ProfessorGuard,

  ],

})

export class AuthModule {}
 