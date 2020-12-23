import { Exclude } from "class-transformer";
import { Book } from "src/books/book.entity";
import { User } from "src/users/user.entity";
import { FeelingType } from "src/feeling-types/feeling-type.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Feeling {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FeelingType, feelingType => feelingType.feelings)
  feelingType: FeelingType

  @ManyToOne(() => User, user => user.feelings)
  user: User;

  @ManyToOne(() => Book, book => book.feelings)
  book: Book;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<Feeling>) {
    Object.assign(this, partial);
  }

}