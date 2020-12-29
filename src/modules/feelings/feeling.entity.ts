import { Exclude } from "class-transformer";
import { User } from "src/modules/users/user.entity";
import { FeelingType } from "src/modules/feeling-types/feeling-type.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Movie } from "../movies/movie.entity";

@Entity()
@Index("idx_feeling_user_movie_book", ["user", "movie"], {unique:true})
export class Feeling {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FeelingType, feelingType => feelingType.feelings)
  feelingType: FeelingType

  @ManyToOne(() => User, user => user.feelings)
  user: User;

  @ManyToOne(() => Movie, movie => movie.feelings, {nullable: true})
  movie: Movie;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Feeling>) {
    Object.assign(this, partial);
  }

}