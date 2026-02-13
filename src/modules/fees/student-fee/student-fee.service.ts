import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentFee } from 'src/db/models/student-fee.model';
import { Student } from 'src/db/models/student.model';

@Injectable()
export class StudentFeeService {
  async create(dto: any) {
    const fee = await StudentFee.create(dto);

    return {
      statusCode: 201,
      message: 'Student fee assigned successfully',
      data: fee,
    };
  }

  async getStudentFee(studentId: number) {
     const fee = await StudentFee.findOne({
      where: { studentId },
      include: [{ model: Student, as: 'student', attributes: ['id', 'firstName', 'lastName', 'gender'] }],
    });


    if (!fee) throw new NotFoundException('Student fee not found');

    return {
      statusCode: 200,
      message: 'Student fee details',
      data: fee,
    };
  }
}
