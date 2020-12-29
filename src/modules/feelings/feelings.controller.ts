import { Body, ConflictException, Controller, InternalServerErrorException, Post, Req } from "@nestjs/common";
import { CreateFeelingDto } from "./dto/create-feeling.dto";
import { Feeling } from "./feeling.entity";
import { FeelingsService } from "./feelings.service";


@Controller('feelings')
export class FeelingsController {
  constructor(
    private feelingsService: FeelingsService
  ) { }

  @Post()
  create(@Req() req, @Body() createFeelingDto: CreateFeelingDto): Promise<Feeling> {
    createFeelingDto.user = req.user;
    return this.feelingsService.create(createFeelingDto).catch(err => {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(err.message);
      } else {
        throw new InternalServerErrorException('unhandled exception: ' + err)
      }
    });
  }
}