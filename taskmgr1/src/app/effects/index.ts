import { TaskListEffects } from './task-list.effects';
import { ProjectEffects } from './project.effects';
import { QuoteEffects } from './quote.effects';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { RouterEffects } from './router.effects';

@NgModule({
    imports: [EffectsModule.forRoot([QuoteEffects, AuthEffects, RouterEffects,
        ProjectEffects, TaskListEffects])],
})
export class AppEffectModule { }
