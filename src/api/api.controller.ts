import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ApiService } from './api.service';
import { PMDto } from './api.dto';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    @Get('auto')
    async getAutoState() {
        return { autostate: await this.apiService.getAutoState() };
    }

    @Post('auto')
    async toggleAutoState() {
        return this.apiService.toggleAutoState();
    }

    @Get('pm')
    async getPmData(@Query('num') num: number) {
        if (num) {
            return this.apiService.getPmDataWithLimit(num);
        } else {
            return this.apiService.getPmData();
        }
    }

    @Post('pm')
    async addPmData(@Body() pmDto: PMDto) {
        await this.apiService.addPmData(pmDto);
        return { autostate: await this.apiService.getAutoState() };
    }
}
