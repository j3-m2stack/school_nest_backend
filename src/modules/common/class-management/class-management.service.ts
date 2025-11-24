import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ClassMst } from 'src/db/models/class.model';
import { Section } from 'src/db/models/section.model';

import { paginatedFind } from 'src/common/utils/pagination.util';
import { CreateClassDto } from './dto/create-class-management.dto';
import { UpdateClassDto } from './dto/update-class-management.dto';

@Injectable()
export class ClassManagementService {
  constructor() {}

  async create(dto: CreateClassDto) {
    // Check if class already exists
    const exists = await ClassMst.findOne({ where: { name: dto.name } });
    if (exists) throw new BadRequestException('Class already exists');

    // Create class
    const newClass = await ClassMst.create({
      name: dto.name,
      description: dto.description,
    });

    // Create sections
    const sectionEntries = dto.sections.map((name) => ({
      classId: newClass.id,
      name,
    }));
    await Section.bulkCreate(sectionEntries);

    return {
      statusCode: 201,
      message: 'Class created successfully',
      data: newClass,
    };
  }

  async findAll(query: any) {
    return paginatedFind({
      model: ClassMst,
      where: {},
      query,
      include: [Section],
    });
  }

  async findOne(id: number) {
    const classData = await ClassMst.findOne({
      where: { id },
      include: [Section],
    });
    if (!classData) throw new NotFoundException('Class not found');
    return classData;
  }

  async update(id: number, dto: UpdateClassDto) {
    const classData = await this.findOne(id);

    if (dto.name && dto.name !== classData.name) {
      const exists = await ClassMst.findOne({ where: { name: dto.name } });
      if (exists) throw new BadRequestException('Class name already exists');
    }

    await classData.update({ name: dto.name, description: dto.description });

    if (dto.sections?.length) {
      await Section.destroy({ where: { classId: id } });

      const newSections = dto.sections.map((name) => ({ name, classId: id }));
      await Section.bulkCreate(newSections);
    }

    return {
      statusCode: 200,
      message: 'Class updated successfully',
      data: classData,
    };
  }

  async delete(id: number) {
    const classData = await this.findOne(id);

    await Section.destroy({ where: { classId: id } });
    await classData.destroy();

    return {
      statusCode: 200,
      message: 'Class deleted successfully',
    };
  }
}
