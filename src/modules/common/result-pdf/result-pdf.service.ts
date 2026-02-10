import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as pdf from 'pdf-creator-node';
import { ClassMst } from 'src/db/models/class.model';
import { Parent } from 'src/db/models/parent.model';
import { Section } from 'src/db/models/section.model';
import { StudentAcademicRecord } from 'src/db/models/student-academic-record.model';
import { Student } from 'src/db/models/student.model';
import { StudentService } from 'src/modules/staff/student/student.service';
import { StudentMarksService } from 'src/modules/student-marks/student-marks.service';

@Injectable()
export class ResultPdfService {
  constructor(
    private readonly studentMarksService: StudentMarksService,
  ) {}

  private getGrade(percentage: number): string {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  }

  async generateClassResultPdf(classId: number, examType?: string) {
    const students = await StudentAcademicRecord.findAll({
      where: { classId },
      include: [
        {
          model: Student,
          include: [{ model: Parent, attributes: ['name', 'relation', 'phone'] }],
        },
        { model: Section, attributes: ['name'] },
        { model: ClassMst, attributes: ['name'] },
      ],
    });

    if (!students.length) {
      throw new NotFoundException('No students found for this class');
    }

    const results = [];

    for (const record of students) {
      const student = record.student;

      const marksData =
        await this.studentMarksService.getMarksByStudent(record.id);

      const examMarks = examType
        ? marksData.find(m => m.examType === examType)
        : marksData[0];

      let totalObtained = 0;
      let totalMarks = 0;
      let hasFail = false;

      const marks =
        examMarks?.marks.map(m => {
          totalObtained += m.marksObtained;
          totalMarks += m.totalMarks;

          const subjectPercentage =
            (m.marksObtained / m.totalMarks) * 100;

          const grade = this.getGrade(subjectPercentage);
          if (grade === 'F') hasFail = true;

          return {
            subjectName: m.subjectName,
            marksObtained: m.marksObtained,
            totalMarks: m.totalMarks,
            grade,
          };
        }) || [];

      const percentage =
        totalMarks > 0
          ? Number(((totalObtained / totalMarks) * 100).toFixed(2))
          : 0;

      const finalGrade = this.getGrade(percentage);

      const resultStatus = hasFail ? 'FAIL' : 'PASS';

      results.push({
        id: record.id,
        rollNo: record.rollNumber,
        studentName: `${student.firstName} ${student.lastName || ''}`.trim(),
        dob: student.dob
          ? new Date(student.dob).toLocaleDateString('en-GB')
          : '',
        className: record.class?.name || '',
        section: record.section?.name || '',
        examType: examMarks?.examType || '',
        session: examMarks?.academicRecord.session.name|| '2024-25',

        parent: student.parents?.map(p => ({
          name: p.name,
          relation: p.relation,
          phone: p.phone,
        })) || [],

        marks,
        totalObtained,
        totalMarks,
        percentage,
        finalGrade,
        resultStatus,
        resultStatusClass: resultStatus === 'PASS' ? 'pass' : 'fail',
      });
    }

    // Output folder
    const outputDir = path.join(__dirname, '../../output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Template
    const templatePath = path.join(
      __dirname,
      '../../../common/templates/result.html',
    );
    const html = fs.readFileSync(templatePath, 'utf8');

    const document = {
      html,
      data: { students: results },
      path: `./output/class-${classId}-results.pdf`,
      type: '',
    };

    const options = {
      format: 'A4',
      orientation: 'portrait',
      border: '10mm',
      footer: {
        height: '10mm',
        contents: {
          default:
            '<span style="font-size:10px;color:#666;">Generated on {{date}}</span>',
        },
      },
    };

    await pdf.create(document, options);

    return {
      statusCode: 201,
      message: 'Result PDF generated successfully',
      path: document.path,
    };
  }
}

