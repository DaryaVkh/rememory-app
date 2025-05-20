import { SelectOption } from '../../common/interfaces';

export const SETTINGS_MODAL_PERIOD_OPTIONS: SelectOption<number>[] = [
    {
        value: 14,
        label: 'раз в две недели',
    },
    {
        value: 7,
        label: 'раз в неделю',
    },
    {
        value: 5,
        label: 'раз в 5 дней',
    },
    {
        value: 3,
        label: 'раз в 3 дня',
    },
    {
        value: 1,
        label: 'раз в день',
    },
    {
        value: 0,
        label: 'никогда',
    },
];
