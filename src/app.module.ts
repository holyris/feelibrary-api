import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Connection } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { UsersModule } from './modules/users/users.module';
import { FeelingsModule } from './modules/feelings/feelings.module';
import { FeelingTypesModule } from './modules/feeling-types/feeling-types.module';
import { MoviesModule } from './modules/movies/movies.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    AuthModule, UsersModule, FeelingsModule, FeelingTypesModule, MoviesModule, SearchModule],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter }
  ],
})
export class AppModule {
  constructor(private connection: Connection) {
  }
}