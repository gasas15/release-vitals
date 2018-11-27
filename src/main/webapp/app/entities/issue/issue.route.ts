import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Issue } from 'app/shared/model/issue.model';
import { IssueService } from './issue.service';
import { IssueComponent } from './issue.component';
import { IssueDetailComponent } from './issue-detail.component';
import { IssueUpdateComponent } from './issue-update.component';
import { IssueDeletePopupComponent } from './issue-delete-dialog.component';
import { IIssue } from 'app/shared/model/issue.model';

@Injectable({ providedIn: 'root' })
export class IssueResolve implements Resolve<IIssue> {
    constructor(private service: IssueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((issue: HttpResponse<Issue>) => issue.body));
        }
        return of(new Issue());
    }
}

export const issueRoute: Routes = [
    {
        path: 'issue',
        component: IssueComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'releaseVitalsApp.issue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'issue/:id/view',
        component: IssueDetailComponent,
        resolve: {
            issue: IssueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'releaseVitalsApp.issue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'issue/new',
        component: IssueUpdateComponent,
        resolve: {
            issue: IssueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'releaseVitalsApp.issue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'issue/:id/edit',
        component: IssueUpdateComponent,
        resolve: {
            issue: IssueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'releaseVitalsApp.issue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const issuePopupRoute: Routes = [
    {
        path: 'issue/:id/delete',
        component: IssueDeletePopupComponent,
        resolve: {
            issue: IssueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'releaseVitalsApp.issue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
