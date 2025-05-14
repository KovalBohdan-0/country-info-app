import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HolidayEntity } from './entities/holiday.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        synchronize: true,
        entities: [HolidayEntity],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([HolidayEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
