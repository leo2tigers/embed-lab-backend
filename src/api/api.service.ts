import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PM } from '../entities/pm.entity';
import { Repository, getRepository } from 'typeorm';
import { PMDto } from './api.dto';

@Injectable()
export class ApiService {
    private autoState: boolean = false;

    constructor(
        @InjectRepository(PM)
        private readonly pmRepository: Repository<PM>,
    ) {}

    async getAutoState() {
        return this.autoState;
    }

    async toggleAutoState() {
        if (this.autoState) {
            this.autoState = false;
        }
        else if (!this.autoState) {
            this.autoState = true;
        }
    }

    async getPmData() {
        return await this.pmRepository.find();
    }

    async getPmDataWithLimit(num: number) {
        return await this.pmRepository.createQueryBuilder('pm').orderBy('pm.id', 'DESC').limit(num).getMany();
    }

    async addPmData(pmDto: PMDto) {
        pmDto.timestamp = new Date();
        return await this.pmRepository.insert(pmDto);
    }
}
