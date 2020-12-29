import { Exclude } from "class-transformer";
import { Book } from "src/modules/books/book.entity";
import { User } from "src/modules/users/user.entity";
import { FeelingType } from "src/modules/feeling-types/feeling-type.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Movie } from "../movies/movie.entity";

@Entity()
@Index("idx_feeling_user_movie_book", ["user", "movie", "book"], {unique:true})
export class Feeling {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FeelingType, feelingType => feelingType.feelings)
  feelingType: FeelingType

  @ManyToOne(() => User, user => user.feelings)
  user: User;

  @ManyToOne(() => Movie, movie => movie.feelings, {nullable: true})
  movie: Movie;

  @ManyToOne(() => Book, book => book.feelings, {nullable: true})
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