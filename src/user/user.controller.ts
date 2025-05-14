import { Controller, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AddHolidaysDto } from './dto/add-holidays.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':userId/calendar/holidays')
  async addHolidaysToCalendar(
    @Param('userId') userId: string,
    @Body() addHolidaysDto: AddHolidaysDto,
  ) {
    return this.userService.addHolidaysToUserCalendar(userId, addHolidaysDto);
  }
}
