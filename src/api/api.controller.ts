import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ApiService } from './api.service';
import { PMDto } from './api.dto';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    @Get('state')
    async getAllState() {
        return this.apiService.getAllState();
    }

    @Get('auto')
    async getAutoState() {
        return this.apiService.getAutoState();
    }

    @Post('auto')
    async toggleAutoState() {
        return this.apiService.toggleAutoState();
    }

    @Get('fan')
    async getFanState() {
        return this.apiService.getFanState();
    }

    @Post('fan')
    async toggleFanState() {
        return this.apiService.toggleFanState();
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
        return this.apiService.getAllState();
    }
}
