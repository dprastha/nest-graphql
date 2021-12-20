import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './input/create-student.input';
import { v4 as uuid } from 'uuid';
import { EditStudentInput } from './input/edit-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id });
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async editStudent(
    id: string,
    editStudentInput: EditStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = editStudentInput;
    const student = await this.getStudent(id);

    student.firstName = firstName;
    student.lastName = lastName;

    return this.studentRepository.save(student);
  }

  async deleteStudent(id: string): Promise<Student> {
    const student = await this.getStudent(id);
    const result = await this.studentRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return student;
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
