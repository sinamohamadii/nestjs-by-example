import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// An @Entity maps a class to a database table.
// TypeORM creates the "task" table from this definition.
@Entity()
export class Task {
  // Auto-incrementing primary key.
  @PrimaryGeneratedColumn()
  id!: number;

  // A normal text column.
  @Column()
  title!: string;

  // A column with a default value.
  @Column({ default: false })
  done!: boolean;
}
