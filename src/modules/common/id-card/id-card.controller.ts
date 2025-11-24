import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { IdCardService } from './id-card.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/Guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AdminUserRole } from 'src/common/types/admin-user-role.enum';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('ID Cards')
@ApiBearerAuth()
@Roles(AdminUserRole.ADMIN, AdminUserRole.STAFF)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('id-card')
export class IdCardController {
  constructor(private readonly idCardService: IdCardService) {}

  @Get('class/:classId')
  @ApiOperation({ summary: 'Generate ID cards PDF for a class' })
  @ApiParam({ name: 'classId', description: 'ID of the class' })
  @ApiResponse({ status: 201, description: 'PDF generated successfully' })
  generateClassPdf(@Param('classId') classId: number) {
    return this.idCardService.generateClassIdCards(classId);
  }
}
