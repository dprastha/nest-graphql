import {
  Mutation,
  Query,
  Resolver,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './input/create-lesson.input';
import { AssignStudentsToLessonInput } from './input/assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';
import { EditLessonInput } from './input/edit-lesson.input';
import { GetLessonsFilterInput } from './input/get-lessons-input';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((returns) => [LessonType])
  async lessons(
    @Args('getLessonsFilterInput', { nullable: true })
    filterLessons: GetLessonsFilterInput,
  ) {
    return this.lessonService.getLessons(filterLessons);
  }

  @Query((returns) => LessonType)
  async lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation((returns) => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  async editLesson(
    @Args('id') id: string,
    @Args('editLessonInput', { nullable: true })
    editLessonInput: EditLessonInput,
  ) {
    return this.lessonService.editLesson(id, editLessonInput);
  }

  @Mutation((returns) => LessonType)
  async deleteLesson(@Args('id') id: string) {
    return this.lessonService.deleteLesson(id);
  }

  @Mutation((returns) => LessonType)
  async assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;

    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
