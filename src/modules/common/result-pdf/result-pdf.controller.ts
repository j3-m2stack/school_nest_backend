import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResultPdfService } from './result-pdf.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Results PDF')
@ApiBearerAuth()
@Controller('result-pdf')
export class ResultPdfController {
  constructor(private readonly resultPdfService: ResultPdfService) {}

  @Get('class/:classId')
  @ApiOperation({ summary: 'Generate result PDF for a class' })
  @ApiParam({ name: 'classId', description: 'ID of the class' })
  @ApiQuery({ name: 'examType', required: false, description: 'Filter by exam type' })
  @ApiResponse({ status: 201, description: 'PDF generated successfully' })
  generateClassResultPdf(
    @Param('classId') classId: number,
    @Query('examType') examType?: string,
  ) {
    return this.resultPdfService.generateClassResultPdf(classId, examType);
  }
}
