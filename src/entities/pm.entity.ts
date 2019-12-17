import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PM {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('datetime')
    timestamp: Date;

    @Column({ type: 'decimal', precision: 7, scale: 3 })
    pm25: number;

    @Column({ type: 'decimal', precision: 7, scale: 3 })
    pm10: number;
}
