import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { AgenteIA } from './AgentesIA';
import { Cliente } from './Cliente';

@Entity({ name: 'conversaciones' })
export class Conversacion {
    @PrimaryGeneratedColumn()
    conversacionid!: number;

    @Column()
    agenteid!: number;

    @Column()
    clienteid!: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    fechaInicio!: Date;

    @ManyToOne(() => AgenteIA)
    @JoinColumn({ name: 'AgenteID' })
    agente!: AgenteIA;

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'ClienteID' })
    cliente!: Cliente;
}