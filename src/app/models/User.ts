import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Quando não é passado o tipo da coluna no Decorator, ele pegará o tipo 'text'
  @Column()
  email: string;

  @Column()
  password: string;

  // Criptografia da senha antes da inserção e do update
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}

export default User;
