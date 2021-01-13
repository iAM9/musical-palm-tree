import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutsModule } from './layouts';
import { CommonLayoutComponent } from './layouts/common-layout';
import { DashboardComponent } from './pages/dashboard';
import { GameComponent } from './pages/game/game/game.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },
        {
          path: 'app',
          component: CommonLayoutComponent,
          children: [
            { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
            { path: 'game', component: GameComponent, pathMatch: 'full' }
          ],
        },
        { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
        { path: 'pages', loadChildren: () => import('./pages/pages/pages.module').then(m => m.PagesModule) },
        { path: '**', redirectTo: '/pages/404' },
      ],
      { useHash: true },
    ),
    LayoutsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
