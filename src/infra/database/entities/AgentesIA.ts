import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'agentesia' })
export class AgenteIA {
    @PrimaryGeneratedColumn()
    agenteid!: number;

    @Column({ type: 'varchar', length: 255 })
    nombre!: string;
}