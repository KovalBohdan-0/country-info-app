import { Controller, Get, Param } from '@nestjs/common';
import { CountryService, CountryInfoResponse } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get('available')
  async getAvailableCountries(): Promise<CountryInfoResponse[]> {
    return this.countryService.getAvailableCountries();
  }

  @Get(':countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    return await this.countryService.getCountryInfo(countryCode);
  }
}
