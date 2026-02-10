import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Subject } from 'src/db/models/subject.model';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { paginatedFind } from 'src/common/utils/pagination.util';

@Injectable()
export class SubjectService {

  // -------------------------
  // CREATE
  // -------------------------
  async create(dto: CreateSubjectDto) {
    const exists = await Subject.findOne({
      where: { name: dto.name },
    });

    if (exists) {
      throw new BadRequestException('Subject already exists');
    }

    const subject = await Subject.create(dto);

    return {
      statusCode: 201,
      message: 'Subject created successfully',
      data: subject,
    };
  }

  // -------------------------
  // LIST (PAGINATED)
  // -------------------------
  async findAll(query: any) {
    const where: any = {};

    if (query.search) {
      where.name = { $like: `%${query.search}%` };
    }

    return paginatedFind({
      model: Subject,
      where,
      query,
    });
  }

  // -------------------------
  // SINGLE
  // -------------------------
  async findOne(id: number) {
    const subject = await Subject.findByPk(id);

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }

  // -------------------------
  // UPDATE
  // -------------------------
  async update(id: number, dto: UpdateSubjectDto) {
    const subject = await this.findOne(id);

    if (dto.name && dto.name !== subject.name) {
      const duplicate = await Subject.findOne({
        where: { name: dto.name },
      });

      if (duplicate) {
        throw new BadRequestException('Subject name already exists');
      }
    }

    await subject.update(dto);

    return {
      statusCode: 200,
      message: 'Subject updated successfully',
      data: subject,
    };
  }

  // -------------------------
  // DELETE (HARD DELETE)
  // -------------------------
  async delete(id: number) {
    const subject = await this.findOne(id);
    await subject.destroy();

    return {
      statusCode: 200,
      message: 'Subject deleted successfully',
    };
  }
}
