import { Injectable } from '@nestjs/common';
import {
  CreateAcademicSessionDto,
  CreateSessionDto,
} from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { AcademicSession } from 'src/db/models/academic-session.model';

@Injectable()
export class SessionsService {
  async create(dto: CreateAcademicSessionDto) {
    // Optional: If isCurrent = true, reset previous current session
    if (dto.isCurrent) {
      await AcademicSession.update(
        { isCurrent: false },
        { where: { isCurrent: true } },
      );
    }

    const session = await AcademicSession.create(dto);

    return {
      statusCode: 201,
      message: 'Academic session created successfully',
      data: session,
    };
  }

  async findAll() {
    return AcademicSession.findAll({ order: [['startDate', 'ASC']] });
  }
}
