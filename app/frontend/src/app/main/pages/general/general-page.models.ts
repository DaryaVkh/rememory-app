import { AngularEditorConfig } from '@kolkov/angular-editor';

export enum QuestionStatus {
    UNANSWERED = 'Unanswered',
    PARTLY_ANSWERED = 'PartlyAnswered',
    ANSWERED = 'Answered',
}

export const ANGULAR_EDITOR_CONFIG_DEFAULT: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '5rem',
    placeholder: 'Пишите свой ответ здесь...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    toolbarHiddenButtons: [
        [
            'insertVideo',
            'insertImage',
            'justifyLeft',
            'justifyRight',
            'justifyCenter',
            'justifyFull',
            'customClasses',
            'link',
            'unlink',
        ],
    ],
    customClasses: [],
};
