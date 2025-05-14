import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import axios from 'axios';

interface FlagResponse {
  flag: string;
}

interface PopulationResponse {
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: {
      year: number;
      value: number;
    }[];
  }[];
}

export interface CountryInfoResponse {
  countryCode: string;
  name: string;
}

@Injectable()
export class CountryService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAvailableCountries(): Promise<CountryInfoResponse[]> {
    const apiUrl =
      this.configService.get<string>('NAGER_API') + '/AvailableCountries';
    const response = await lastValueFrom(this.httpService.get(apiUrl));
    if (!response || !response.data) {
      throw new Error('Failed to fetch available countries');
    }
    return response.data as CountryInfoResponse[];
  }

  async getCountryInfo(countryCode: string) {
    const borderCountries = await this.getBorderCountries(countryCode);
    const populationData = await this.getPopulationData(countryCode);
    const flagUrl: string = await this.getFlagUrl(countryCode);

    return {
      borderCountries,
      populationData,
      flagUrl,
    };
  }

  private async getBorderCountries(countryCode: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.get<{ borders: string[] }>(
          `${this.configService.get('NAGER_API')}/CountryInfo/${countryCode}`,
        ),
      );
      return response.data?.borders || [];
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new BadRequestException(
          `Invalid country code: ${countryCode}. Please provide a valid country code.`,
        );
      }
      throw new Error('An error occurred while fetching border countries');
    }
  }

  private async getPopulationData(countryCode: string): Promise<any[]> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<PopulationResponse>(
          `${this.configService.get('COUNTRIES_API')}/countries/population`,
          {
            params: { country: countryCode },
          },
        ),
      );
      return response.data?.data || [];
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new BadRequestException(
          `Invalid country code: ${countryCode}. Please provide a valid country code.`,
        );
      }
      throw new Error('An error occurred while fetching population data');
    }
  }

  private async getFlagUrl(countryCode: string): Promise<string> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<FlagResponse>(
          `${this.configService.get('COUNTRIES_API')}/countries/flag/images`,
          {
            params: { country: countryCode },
          },
        ),
      );
      return response.data?.flag || '';
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new BadRequestException(
          `Invalid country code: ${countryCode}. Please provide a valid country code.`,
        );
      }
      throw new Error('An error occurred while fetching flag data');
    }
  }
}
