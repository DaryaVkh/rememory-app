import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { QuestionStatus } from '../app/main/pages/general/general-page.models';

export interface HttpOptions {
    headers?: AppHttpHeaders;
    observe?: 'body' | 'response' | 'events';
    context?: HttpContext;
    params?:
        | HttpParams
        | {
              [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
          };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}

export type AppHttpHeaders =
    | HttpHeaders
    | {
          [header: string]: string | string[];
      };

export interface TokensDto {
    accessToken: string;
    refreshToken: string;
}

export interface QuestionDto {
    id: string;
    title: string;
    userId: string;
    answer?: string;
    categoryId: string;
    status: QuestionStatus;
}

export interface QuestionsDto {
    questions: QuestionDto[];
}

export interface AnswerRequestDto {
    answer: string;
    newStatus?: QuestionStatus;
}

export interface CreateGlobalQuestionRequestDto {
    title: string;
    categoryId?: string;
}

export interface AddQuestionRequestDto {
    userId: string;
    title: string;
}

export interface GlobalQuestionDto {
    id: string;
    title: string;
    categoryId: string;
}

export interface UserDto {
    id: string;
    email: string;
    name?: string;
    photoUrl?: string;
    roles: string[];
}

export interface CategoryDto {
    id: string;
    name: string;
}

export interface GlobalQuestionsDto {
    globalQuestions: GlobalQuestionDto[];
}

export interface GetGlobalQuestionsRequestDto {
    userId?: string;
    categoryIds?: string[];
}

export interface CategoryDto {
    id: string;
    name: string;
}

export interface CategoriesDto {
    categories: CategoryDto[];
}

export interface NotificationSettingsDto {
    email?: string;
    telegramName?: string;
    periodInDays: number;
}

export interface AddressSettingsDto {
    region?: string;
    district?: string;
    town?: string;
    street?: string;
    house?: string;
    building?: string;
    flat?: number;
}
