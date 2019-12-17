import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PM } from '../entities/pm.entity';
import { Repository, getRepository } from 'typeorm';
import { PMDto } from './api.dto';

@Injectable()
export class ApiService {
    private autoState: boolean = false;
    private fanState: boolean = false;

    constructor(
        @InjectRepository(PM)
        private readonly pmRepository: Repository<PM>,
    ) {}

    async getAllState() {
        return {
            autostate: this.autoState,
            fanstate: this.fanState,
        };
    }

    async getAutoState() {
        return { autostate: this.autoState };
    }

    async toggleAutoState() {
        if (this.autoState) {
            this.autoState = false;
        } else if (!this.autoState) {
            this.autoState = true;
        }
    }

    async getFanState() {
        if (this.autoState) {
            return { fanstate: `auto` };
        } else {
            return { fanstate: this.fanState };
        }
    }

    async toggleFanState() {
        if (this.autoState) {
            throw new BadRequestException(
                `Currently in automatic mode, cannot toggle fan state`,
            );
        } else {
            if (this.fanState) {
                this.fanState = false;
            } else if (!this.fanState) {
                this.fanState = true;
            }
        }
    }

    async getPmData() {
        return await this.pmRepository.find();
    }

    async getPmDataWithLimit(num: number) {
        return await this.pmRepository
            .createQueryBuilder('pm')
            .orderBy('pm.id', 'DESC')
            .limit(num)
            .getMany();
    }

    async addPmData(pmDto: PMDto) {
        pmDto.timestamp = new Date();
        return await this.pmRepository.insert(pmDto);
    }
}
