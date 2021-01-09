export class FeelingProportionModel {
  feelingTypeId: number;

  amount: number;

  proportion: number;

  constructor(partial: Partial<FeelingProportionModel>) {
    Object.assign(this, partial);
  }
} 