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
import { ClassSubject } from 'src/db/models/class-subjects.model';
import { Subject } from 'src/db/models/subject.model';

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

  // Validate subjects
  if (dto.subjectIds?.length) {
    const subjectCount = await Subject.count({
      where: { id: dto.subjectIds },
    });

    if (subjectCount !== dto.subjectIds.length) {
      throw new BadRequestException('One or more subjectIds are invalid');
    }
  }

  // Create class
  const createdClass = await ClassMst.create({
    name: dto.name,
    description: dto.description ?? null,
  });

  // Create sections
  if (dto.sections?.length > 0) {
    const sectionEntries = dto.sections.map((sec) => ({
      name: sec.name,
      classId: createdClass.id,
      classTeacherId: sec.classTeacherId || null,
    }));

    await Section.bulkCreate(sectionEntries);
  }

  // ✅ Assign subjects to class
  if (dto.subjectIds?.length) {
    const classSubjects = dto.subjectIds.map((subjectId) => ({
      classId: createdClass.id,
      subjectId,
    }));

    await ClassSubject.bulkCreate(classSubjects);
  }

  return {
    statusCode: 201,
    message: 'Class created successfully with sections and subjects',
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

  // ----------------------------------
  // Check duplicate class name
  // ----------------------------------
  if (dto.name && dto.name !== classData.name) {
    const exists = await ClassMst.findOne({ where: { name: dto.name } });
    if (exists) throw new BadRequestException('Class name already exists');
  }

  // ----------------------------------
  // Update class fields
  // ----------------------------------
  await classData.update({
    name: dto.name ?? classData.name,
    description: dto.description ?? classData.description,
  });

  // ----------------------------------
  // Update sections (ONLY if provided)
  // ----------------------------------
  if (Array.isArray(dto.sections)) {
    await Section.destroy({ where: { classId: id } });

    if (dto.sections.length > 0) {
      const sectionEntries = dto.sections.map((sec) => ({
        name: sec.name,
        classId: id,
        classTeacherId: sec.classTeacherId || null,
      }));

      await Section.bulkCreate(sectionEntries);
    }
  }

  // ----------------------------------
  // Update subjects (ONLY if provided)
  // ----------------------------------
  if (Array.isArray(dto.subjectIds)) {
    // Validate subject IDs
    if (dto.subjectIds.length > 0) {
      const subjectCount = await Subject.count({
        where: { id: dto.subjectIds },
      });

      if (subjectCount !== dto.subjectIds.length) {
        throw new BadRequestException('One or more subjectIds are invalid');
      }
    }

    // Remove old subject mappings
    await ClassSubject.destroy({ where: { classId: id } });

    // Create new mappings
    if (dto.subjectIds.length > 0) {
      const classSubjects = dto.subjectIds.map((subjectId) => ({
        classId: id,
        subjectId,
      }));

      await ClassSubject.bulkCreate(classSubjects);
    }
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
