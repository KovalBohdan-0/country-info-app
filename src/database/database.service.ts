import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HolidayEntity } from './entities/holiday.entity';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(HolidayEntity)
    private holidayRepository: Repository<HolidayEntity>,
  ) {}

  async saveHolidays(holidays: Partial<HolidayEntity>[]) {
    return this.holidayRepository.save(holidays);
  }

  async findHolidaysByUser(userId: string) {
    return this.holidayRepository.find({ where: { userId } });
  }
}
