import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { FeelingType } from "src/modules/feeling-types/feeling-type.entity";
import { Movie } from "src/modules/movies/movie.entity";
import { User } from "src/modules/users/user.entity";


export class DeleteFeelingDto {

  @IsNotEmpty()
  @IsNumber()
  feelingTypeId: number

  @IsNumber()
  userId: number

  @IsNumber()
  movieId: number

}