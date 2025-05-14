import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CountryModule } from './country/country.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    CountryModule,
    UserModule,
  ],
})
export class AppModule {}

export default () => ({
  PORT: parseInt(process.env.PORT ?? '3000', 10),
  NAGER_API: process.env.NAGER_API,
  COUNTRIES_API: process.env.COUNTRIES_API,
});
