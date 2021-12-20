import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './input/create-lesson.input';
import { EditLessonInput } from './input/edit-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ id });
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students: [],
    });

    return this.lessonRepository.save(lesson);
  }

  async editLesson(
    id: string,
    editLessonInput: EditLessonInput,
  ): Promise<Lesson> {
    const { name, startDate, endDate } = editLessonInput;
    const lesson = await this.getLesson(id);

    lesson.name = name;
    lesson.startDate = startDate;
    lesson.endDate = endDate;

    return this.lessonRepository.save(lesson);
  }

  async deleteLesson(id: string): Promise<Lesson> {
    const lesson = await this.getLesson(id);
    const result = await this.lessonRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return lesson;
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
