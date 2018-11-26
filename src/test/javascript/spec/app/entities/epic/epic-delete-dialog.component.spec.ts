/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ReleaseVitalsTestModule } from '../../../test.module';
import { EpicDeleteDialogComponent } from 'app/entities/epic/epic-delete-dialog.component';
import { EpicService } from 'app/entities/epic/epic.service';

describe('Component Tests', () => {
    describe('Epic Management Delete Component', () => {
        let comp: EpicDeleteDialogComponent;
        let fixture: ComponentFixture<EpicDeleteDialogComponent>;
        let service: EpicService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReleaseVitalsTestModule],
                declarations: [EpicDeleteDialogComponent]
            })
                .overrideTemplate(EpicDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EpicDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EpicService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
