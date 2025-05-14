import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class Cliente {
    @PrimaryGeneratedColumn()
    clienteid!: number;

    @Column({ type: 'varchar', length: 20, unique: true })
    numerowhatsApp!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    nombre!: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    fecharegistro!: Date;
}