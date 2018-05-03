import { trigger, state, style, transition, animate } from '@angular/animations';

export const itemAnim = trigger('item', [
    state('out', style({ 'border-left-width': '3px' })),
    state('hover', style({ 'border-left-width': '6px' })),
    transition('out=>hover', animate('.1s ease-in')),
    transition('hover=>out', animate('.1s ease-out'))
]);
