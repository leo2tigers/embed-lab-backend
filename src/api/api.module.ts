import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PM } from '../entities/pm.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PM])],
    controllers: [ApiController],
    providers: [ApiService],
})
export class ApiModule {}
