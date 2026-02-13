import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FeePaymentService } from './fee-payment.service';
import { CreateFeePaymentDto } from './dto/create-fee-payment.dto';
import { AdminUserRole } from 'src/common/types/admin-user-role.enum';
import { RolesGuard } from 'src/common/Guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Fee Payments')
@ApiBearerAuth()
@Roles(AdminUserRole.ADMIN, AdminUserRole.STAFF)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('fee-payments')
export class FeePaymentController {
  constructor(private readonly service: FeePaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Pay student fee' })
  payFee(@Body() dto: CreateFeePaymentDto) {
    return this.service.payFee(dto);
  }
}
