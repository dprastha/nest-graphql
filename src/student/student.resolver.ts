import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateStudentInput } from './input/create-student.input';
import { EditStudentInput } from './input/edit-student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => [StudentType])
  async students() {
    return this.studentService.getStudents();
  }

  @Query((returns) => StudentType)
  async student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Mutation((returns) => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }

  @Mutation((returns) => StudentType)
  async editStudent(
    @Args('id') id: string,
    @Args('editStudentInput') editStudentInput: EditStudentInput,
  ) {
    return this.studentService.editStudent(id, editStudentInput);
  }

  @Mutation((returns) => StudentType)
  async deleteStudent(@Args('id') id: string) {
    return this.studentService.deleteStudent(id);
  }
}
