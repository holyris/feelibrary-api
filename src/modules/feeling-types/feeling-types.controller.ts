import { Controller, Get } from "@nestjs/common";
import { FeelingType } from "./feeling-type.entity";
import { FeelingTypesService } from "./feeling-types.service";

@Controller('feeling_types')
export class FeelingTypesController {

  constructor(
    private feelingTypesService: FeelingTypesService
  ) { }

  @Get()
  findAll(): Promise<FeelingType[]> {
    return this.feelingTypesService.findAll();
  }
}