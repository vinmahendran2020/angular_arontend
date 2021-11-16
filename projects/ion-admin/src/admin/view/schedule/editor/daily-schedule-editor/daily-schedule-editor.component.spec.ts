// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ScheduleEditorComponent } from './daily-schedule-editor.component';

// import { filter, take, toArray } from 'rxjs/operators';

// describe('ScheduleEditorComponent', () => {
//   let component: ScheduleEditorComponent;
//   let fixture: ComponentFixture<ScheduleEditorComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ScheduleEditorComponent],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ScheduleEditorComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should return recurrence hh:mm', () => {
//     component.schedule = {
//       scheduleType: 'Netting',
//       startTime: '5:00AM',
//       endTime: '9:00PM',
//       timezone: 'US/Hawaii',
//       hours: 2,
//       minutes: 40,
//       status: 'ACTIVE',
//     };

//     component.ngOnInit();

//     expect(component.startTime).toBe('5:00AM');
//     expect(component.endTime).toBe('9:00PM');
//     expect(component.timezone).toBe('US/Hawaii');
//     expect(component.hours).toBe('2');
//     expect(component.minutes).toBe('40');
//     expect(component.recurrence).toBe('hh:mm');
//   });

//   it('should return recurrence hh:mm', () => {
//     component.schedule = {
//       scheduleType: 'Netting',
//       startTime: '5:00AM',
//       endTime: '9:00PM',
//       timezone: 'US/Hawaii',
//       hours: 0,
//       minutes: 0,
//       status: 'ACTIVE',
//     };

//     component.ngOnInit();

//     expect(component.startTime).toBe('5:00AM');
//     expect(component.endTime).toBe('9:00PM');
//     expect(component.timezone).toBe('US/Hawaii');
//     expect(component.hours).toBe('');
//     expect(component.minutes).toBe('');
//     expect(component.recurrence).toBe('00:00');
//   });

//   it('should return parseInt', () => {
//     const twenty = component.parseInt('20', 10, (v) => v === 20);
//     const thirty = component.parseInt('thirty', 30, (v) => v === 30);
//     const fourty = component.parseInt('50', 40, (v) => v < 40);

//     expect(twenty).toBe(20);
//     expect(thirty).toBe(30);
//     expect(fourty).toBe(40);
//   });

//   it('should return onSubmit 00:00', (done) => {
//     spyOn(component.submit, 'emit');

//     component.schedule = {
//       scheduleType: 'Netting',
//       startTime: '5:00AM',
//       endTime: '9:00PM',
//       timezone: 'US/Hawaii',
//       hours: 0,
//       minutes: 0,
//       status: 'ACTIVE',
//     };

//     component.ngOnInit();
//     component.onSubmit();

//     setTimeout(() => {
//       expect(component.submit.emit).toHaveBeenCalled();
//       done();
//     }, 200);
//   });

//   it('should return onSubmit hh:mm', (done) => {
//     spyOn(component.submit, 'emit');

//     component.schedule = {
//       scheduleType: 'Netting',
//       startTime: '5:00AM',
//       endTime: '9:00PM',
//       timezone: 'US/Hawaii',
//       hours: 2,
//       minutes: 30,
//       status: 'ACTIVE',
//     };

//     component.ngOnInit();
//     component.onSubmit();

//     setTimeout(() => {
//       expect(component.submit.emit).toHaveBeenCalled();
//       done();
//     }, 200);
//   });
// });
