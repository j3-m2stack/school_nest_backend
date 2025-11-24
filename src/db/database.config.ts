import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
dotenv.config();
import { User } from '../db/models/user.model';
import { UserProfile } from '../db/models/user-profile.model';
import { Student } from '../db/models/student.model';
import { Parent } from '../db/models/parent.model';
import { StudentAcademicRecord } from '../db/models/student-academic-record.model';
import { ClassMst } from '../db/models/class.model';
import { AcademicSession } from '../db/models/academic-session.model';
import { AuditLog } from '../db/models/audit-log.model';
import { Section } from '../db/models/section.model';
import { Subject } from '../db/models/subject.model';
export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
  models: [
    User,
    UserProfile,
    Student,
    Parent,
    StudentAcademicRecord,
    ClassMst,
    AcademicSession,
    AuditLog,
    Section,
    Subject,
  ],
  logging: true,
});
