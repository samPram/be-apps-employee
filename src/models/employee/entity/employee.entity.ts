import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('employee')
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_employee_name')
  @Column('varchar', { length: 225, nullable: false })
  name: string;

  @Index('idx_employee_number')
  @Column('int', { width: 10, nullable: false, unique: true })
  number: number;

  @Index('idx_employee_position')
  @Column('varchar', { length: 225, nullable: false })
  position: string;

  @Column('varchar', { length: 50, nullable: false })
  department: string;

  @Column('date', { nullable: false })
  joined: Date;

  @Column('varchar', { length: 225, nullable: true })
  photo: string;

  @Index('idx_employee_status')
  @Column('varchar', { length: 50, nullable: false })
  status: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
