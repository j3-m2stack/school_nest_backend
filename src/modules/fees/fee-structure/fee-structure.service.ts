import { Injectable } from '@nestjs/common';
import { FeeStructure } from 'src/db/models/fee-structure.model';

@Injectable()
export class FeeStructureService {
  async create(dto: any) {
    const fee = await FeeStructure.create(dto);

    return {
      statusCode: 201,
      message: 'Fee structure created successfully',
      data: fee,
    };
  }

  async findAll() {
    const data = await FeeStructure.findAll();

    return {
      statusCode: 200,
      message: 'Fee structure list',
      data,
    };
  }
}
