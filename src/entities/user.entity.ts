import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  firstname: string;

  @Column({ type: 'varchar', length: 30 })
  lastname: string;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f'] })
  /**
   * m - male
   * f - female
   */
  gender: string;

  @Column({ type: 'enum', enum: ['t', 's'] })
  /**
   * t - teacher
   * s - student
   */
  role: string;
}
