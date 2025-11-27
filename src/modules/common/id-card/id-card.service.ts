import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as pdf from 'pdf-creator-node';
import { StudentService } from 'src/modules/staff/student/student.service';

@Injectable()
export class IdCardService {
  constructor(private readonly studentService: StudentService) {}


  
async generateClassIdCards(classId: number) {
  // Fetch students by class
  const students = await this.studentService.findByClass(classId);

  if (!students || students.length === 0) {
    throw new NotFoundException('No students found for this class');
  }

  // Format DOB -> dd/mm/yyyy
  const formattedStudents = students.map((s) => ({
    ...s,
    dob: new Date(s.dob).toLocaleDateString('en-GB'), // dd/mm/yyyy
  }));

  // Load HTML template
  const templatePath = path.join(
    __dirname,
    '../../../common/templates/id-card.html',
  );
  const html = fs.readFileSync(templatePath, 'utf8');

  const document = {
    html,
    data: { students: formattedStudents },
    path: `./output/class-${classId}-id-cards.pdf`,
    type: '',
  };

  const options = {
    format: 'A4',
    orientation: 'portrait',
    border: '10mm',
    footer: { height: '10mm' },
  };

  await pdf.create(document, options);

  return {
    statusCode: 201,
    message: 'PDF generated successfully',
    path: document.path,
  };
}

}
