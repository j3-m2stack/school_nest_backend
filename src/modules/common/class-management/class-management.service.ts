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

  // ------------------------------------------------------
  // CREATE CLASS WITH SECTIONS + CLASS TEACHER
  // ------------------------------------------------------
  async create(dto: CreateClassDto) {
    // Check duplicate class name
    const exists = await ClassMst.findOne({ where: { name: dto.name } });
    if (exists) throw new BadRequestException('Class already exists');

    // Create the class
    const createdClass = await ClassMst.create({
      name: dto.name,
      description: dto.description ?? null,
    });

    // Create sections with optional teacher
    if (dto.sections?.length > 0) {
      const sectionEntries = dto.sections.map((sec) => ({
        name: sec.name,
        classId: createdClass.id,
        classTeacherId: sec.classTeacherId || null,
      }));

      await Section.bulkCreate(sectionEntries);
    }

    return {
      statusCode: 201,
      message: 'Class created successfully with section teachers',
      data: createdClass,
    };
  }

  // ------------------------------------------------------
  // FIND ALL CLASSES
  // ------------------------------------------------------
  async findAll(query: any) {
    return paginatedFind({
      model: ClassMst,
      where: {},
      query,
      include: [Section],
    });
  }

  // ------------------------------------------------------
  // FIND ONE CLASS
  // ------------------------------------------------------
  async findOne(id: number) {
    const classData = await ClassMst.findOne({
      where: { id },
      include: [Section],
    });

    if (!classData) throw new NotFoundException('Class not found');
    return classData;
  }

  // ------------------------------------------------------
  // UPDATE CLASS + SECTIONS + CLASS TEACHER
  // ------------------------------------------------------
  async update(id: number, dto: UpdateClassDto) {
    const classData = await this.findOne(id);

    // check for duplicate name
    if (dto.name && dto.name !== classData.name) {
      const exists = await ClassMst.findOne({ where: { name: dto.name } });
      if (exists) throw new BadRequestException('Class name already exists');
    }

    // update class fields
    await classData.update({
      name: dto.name,
      description: dto.description ?? classData.description,
    });

    // update sections
    if (dto.sections?.length) {
      // delete old sections
      await Section.destroy({ where: { classId: id } });

      // create new sections with classTeacherId
      const sectionEntries = dto.sections.map((sec) => ({
        name: sec.name,
        classId: id,
        classTeacherId: sec.classTeacherId || null,
      }));

      await Section.bulkCreate(sectionEntries);
    }

    return {
      statusCode: 200,
      message: 'Class updated successfully',
      data: classData,
    };
  }

  // ------------------------------------------------------
  // DELETE CLASS
  // ------------------------------------------------------
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
