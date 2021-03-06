// From Angular Animations
import {
    trigger, 
    transition, 
    style, 
    query, 
    group, 
    animate, 
} from '@angular/animations';

export const slider = 
    trigger('routeAnimations', 
        [
        
        // Slide to right
        transition('home => projects', slideTo('right')),
        transition('projects => sandbox', slideTo('right')),
        transition('sandbox => contact', slideTo('right')),
        transition('sandbox => home', slideTo('right')),

        // Slide to left
        transition('contact => sandbox', slideTo('left')), 
        transition('sandbox => projects', slideTo('left')), 
        transition('projects => home', slideTo('left')), 
        transition('home => sandbox', slideTo('left')),
    ]);

function slideTo(direction) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute', 
                top: 0, 
                [direction]: 0, 
                width: '100%'
            })
        ], optional), 
        query(':enter', [
            style({ [direction]: '-100%'})
        ]), 
        group([
            query(':leave', [
                animate('1200ms ease', style({ [direction]: '100%'}))
            ], optional), 
            query(':enter', [
                animate('1200ms ease', style({ [direction]: '0%'}))
            ])
        ])
    ];
}