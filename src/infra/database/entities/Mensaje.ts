import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Conversacion } from './Conversacion';

@Entity({ name: 'mensajes' })
export class Mensaje {
    @PrimaryGeneratedColumn()
    mensajeid!: number;

    @Column()
    conversacionid!: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    fechahora!: Date;

    @Column({ type: 'varchar', length: 50 })
    emisor!: string;

    @Column({ type: 'text' })
    contenido!: string;

    @ManyToOne(() => Conversacion)
    @JoinColumn({ name: 'ConversacionID' })
    conversacion!: Conversacion;
}