import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AnswerRequestDto,
  CategoriesDto,
  CategoryDto,
  GetGlobalQuestionsRequestDto,
  GlobalQuestionDto,
  GlobalQuestionsDto,
  QuestionDto,
  QuestionsDto,
  TokensDto,
  UserDto,
} from './api.models';
import { GatewayClientService } from './gateway-client.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly gatewayClientService: GatewayClientService) {}

  login(idToken: string): Observable<TokensDto> {
    return this.gatewayClientService.login(idToken);
  }

  getNewQuestion(userId: string, globalQuestionIds: string[]): Observable<QuestionDto> {
    return this.gatewayClientService.get<QuestionDto>('/api/questions/new', {
      params: { userId, globalQuestionIds }
    });
  }

  getAllQuestionsForUser(userId: string): Observable<QuestionsDto> {
    return this.gatewayClientService.get<QuestionsDto>('/api/questions', {
      params: { userId }
    });
  }

  giveAnswer(questionId: string, answer: AnswerRequestDto): Observable<QuestionDto> {
    const content = JSON.stringify(answer);
    return this.gatewayClientService.patch<QuestionDto>(`/api/questions/${questionId}`, content);
  }

  createNewGlobalQuestion(title: string, categoryId?: string): Observable<GlobalQuestionDto> {
    const content = JSON.stringify({title, categoryId});
    return this.gatewayClientService.post<GlobalQuestionDto>('/api/questions/newGlobalQuestion', content);
  }

  createNewQuestion(userId: string, title: string): Observable<QuestionDto> {
    const content = JSON.stringify({userId, title});
    return this.gatewayClientService.post<QuestionDto>('/api/questions/new', content);
  }

  getCurrentUser(): Observable<UserDto> {
    return this.gatewayClientService.get<UserDto>('/api/users/current');
  }

  getGlobalQuestions(userId?: string, categoryIds?: string[]): Observable<GlobalQuestionsDto> {
    const params: GetGlobalQuestionsRequestDto = {userId, categoryIds};
    return this.gatewayClientService.get<GlobalQuestionsDto>('/api/questions/global', {
      params: { ...params }
    });
  }

  getAllCategories(): Observable<CategoriesDto> {
    return this.gatewayClientService.get<CategoriesDto>('/api/categories');
  }

  getCategory(categoryId: string): Observable<CategoryDto> {
    return this.gatewayClientService.get<CategoryDto>(`/api/categories/${categoryId}`);
  }
}
