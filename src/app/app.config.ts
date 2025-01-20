import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { routes } from './app.routes';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  UserOutline,
  DownOutline,
  DeleteOutline,
  EditOutline,
} from '@ant-design/icons-angular/icons';

const icons = [UserOutline, DownOutline, DeleteOutline, EditOutline];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(NzModalModule),
    importProvidersFrom(NzIconModule.forRoot(icons)),

    { provide: NZ_I18N, useValue: en_US },
  ],
};
