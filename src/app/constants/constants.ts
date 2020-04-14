import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

// Animation trigger metadata for popup.
export const ANIMATION_RIGHT_DIALOG: AnimationTriggerMetadata = trigger('EnterLeave', [
  state('flyIn', style({ transform: 'translateX(0)' })),
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('0.3s ease-in')
  ]),
  transition(':leave', [
    animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
  ])
]);
