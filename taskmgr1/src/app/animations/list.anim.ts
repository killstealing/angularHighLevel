import {
    trigger, state, transition, style,
    animate, keyframes, group, query, stagger
} from '@angular/animations';

export const listAnimation = trigger('listAnim', [
    transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger(100, [
            animate('1s', style({ opacity: 1 }))
        ]), { optional: true }),
        query(':leave', style({ opacity: 1, 'background-color': 'red' }), { optional: true }),
        query(':leave', stagger(100, [
            animate('1s', style({ opacity: 0 }))
        ]), { optional: true }),
        // query(':leave', animate('3s', style({ opacity: 0, 'background-color': 'red' })), { optional: true }),
    ]),
]);
