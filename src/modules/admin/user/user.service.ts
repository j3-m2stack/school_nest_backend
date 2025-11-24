import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from 'src/db/models/user.model';
import { UserProfile } from 'src/db/models/user-profile.model';
import { CreateAdminUserDto } from './dto/create-user.dto';
import { UpdateAdminUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { paginatedFind } from 'src/common/utils/pagination.util';

@Injectable()
export class UserService {
  constructor() {}

  async create(dto: CreateAdminUserDto) {
    // Email duplication check
    const existingEmail = await User.findOne({
      where: { email: dto.email },
    });

    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }

    // Phone duplication check
    const existingPhone = await UserProfile.findOne({
      where: { phone: dto.phone },
    });

    if (existingPhone) {
      throw new BadRequestException('Phone number already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create user
    const user = await User.create({
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
    });

    // Create profile
    await UserProfile.create({
      userId: user.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      address: dto.address,
      photo: dto.photo,
      aadharNumber: dto.aadharNumber,
      qualification: dto.qualification,
      designation: dto.designation,
      joiningDate: new Date(dto.joiningDate),
    });

    return {
      statusCode: 201,
      message: 'User created successfully',
      data: user,
    };
  }

  async findAll(query: any) {
    const where: any = {};

    if (query.role) where.role = query.role;
    if (query.search) where.email = { $like: `%${query.search}%` };

    return paginatedFind({
      model: User,
      where,
      query,
      include: [UserProfile],
    });
  }

  async findOne(id: number) {
    const user = await User.findOne({
      where: { id },
      include: [UserProfile],
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, dto: UpdateAdminUserDto) {
    const user = await this.findOne(id);

    // If email updated → duplication check
    if (dto.email && dto.email !== user.email) {
      const exists = await User.findOne({ where: { email: dto.email } });
      if (exists) throw new BadRequestException('Email already exists');
    }

    // If phone updated → duplication check
    if (dto.phone && dto.phone !== user.profile.phone) {
      const exists = await UserProfile.findOne({
        where: { phone: dto.phone },
      });
      if (exists) throw new BadRequestException('Phone number already in use');
    }

    // Hash password if updated
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    // Update main user
    await user.update(dto);

    // Update profile
    await user.profile.update({
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      address: dto.address,
      photo: dto.photo,
      aadharNumber: dto.aadharNumber,
      qualification: dto.qualification,
      designation: dto.designation,
      joiningDate: new Date(dto.joiningDate),
    });

    return {
      statusCode: 200,
      message: 'User updated successfully',
      data: user,
    };
  }

  async delete(id: number) {
    const user = await this.findOne(id);

    await user.profile.destroy();
    await user.destroy();

    return {
      statusCode: 200,
      message: 'User deleted successfully',
    };
  }
}
