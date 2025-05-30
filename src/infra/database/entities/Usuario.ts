import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn()
    usuarioid!: number;

    @Column({ type: 'varchar', length: 255 })
    nombre!: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    username!: string;

    @Column({ type: 'text' })
    hash!: string; // Aquí almacenaremos la contraseña encriptada

    @Column({ type: 'varchar', length: 50, default: 'usuario' })
    rol!: string; // Puede ser 'admin' o 'usuario'

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    fecharegistro!: Date;
}
