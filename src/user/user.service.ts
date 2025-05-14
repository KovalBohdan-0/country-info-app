import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AddHolidaysDto } from './dto/add-holidays.dto';
import { DatabaseService } from 'src/database/database.service';
import { Holiday } from './interfaces/holiday.interface';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    private httpService: HttpService,
    private databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  async addHolidaysToUserCalendar(
    userId: string,
    addHolidaysDto: AddHolidaysDto,
  ) {
    const { countryCode, year, holidays } = addHolidaysDto;
    const holidaysResponse = await this.fetchPublicHolidays(countryCode, year);

    if (!holidaysResponse || holidaysResponse.length === 0) {
      throw new BadRequestException(
        'No holidays found for the specified country and year',
      );
    }

    const filteredHolidays = holidaysResponse.filter(
      (holiday) => !holidays || holidays.includes(holiday.name),
    );

    const holidayEntities = filteredHolidays.map((holiday) => ({
      userId: userId,
      name: holiday.name,
      localName: holiday.localName || holiday.name,
      date: holiday.date,
      countryCode: holiday.countryCode,
      type: holiday.type || 'Public',
      fixed: holiday.fixed || false,
      global: holiday.global || false,
    }));

    return this.databaseService.saveHolidays(holidayEntities);
  }

  async fetchPublicHolidays(
    countryCode: string,
    year: number,
  ): Promise<Holiday[]> {
    const apiUrl = `${this.configService.get('NAGER_API')}/PublicHolidays/${year}/${countryCode}`;
    try {
      const response = await lastValueFrom(this.httpService.get(apiUrl));

      if (!response || !response.data) {
        throw new Error('Failed to fetch public holidays');
      }

      return response.data as Holiday[];
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new BadRequestException(
          `Invalid country code: ${countryCode}. Please provide a valid country code.`,
        );
      }

      throw new Error('An error occurred while fetching public holidays');
    }
  }
}
