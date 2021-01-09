import { Body, ClassSerializerInterceptor, Controller, Delete, Param, Post, Req, UseInterceptors } from "@nestjs/common";
import { CreateFeelingDto } from "./dto/create-feeling.dto";
import { DeleteFeelingDto } from "./dto/delete-feeling.dto";
import { Feeling } from "./feeling.entity";
import { FeelingsService } from "./feelings.service";


@Controller('feelings')
@UseInterceptors(ClassSerializerInterceptor)
export class FeelingsController {
  constructor(
    private feelingsService: FeelingsService
  ) { }

  @Post()
  create(@Req() req, @Body() createFeelingDto: CreateFeelingDto): Promise<Feeling> {
    createFeelingDto.user = req.user;
    return this.feelingsService.create(createFeelingDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.feelingsService.deleteById(id);
  }

  @Delete()
  delete(@Req() req, @Body() deleteFeelingDto: DeleteFeelingDto) {
    deleteFeelingDto.userId = req.user.id;
    return this.feelingsService.delete(deleteFeelingDto);
  }
}