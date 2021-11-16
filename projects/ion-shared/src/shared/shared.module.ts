import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { AlertModule } from '@dtcc-uif/alert';
import { CheckboxModule } from '@dtcc-uif/checkbox';
import { DatagridModule } from '@dtcc-uif/datagrid';
import { FooterModule } from '@dtcc-uif/footer';
import { FormModule } from '@dtcc-uif/form';
import { HeaderModule } from '@dtcc-uif/header';
import { LeftMenuModule } from '@dtcc-uif/leftmenu';
import { LoaderModule } from '@dtcc-uif/loader';
import { DtccModalModule } from '@dtcc-uif/modals';
import { MultiselectModule } from '@dtcc-uif/multiselect';
import { PanelModule } from '@dtcc-uif/panel';
import { RadiobuttonModule } from '@dtcc-uif/radiobutton';
import { SelectModule } from '@dtcc-uif/select';
import { SlideoutModule } from '@dtcc-uif/slideout';
import { TextareaModule } from '@dtcc-uif/textarea';
import { TextboxModule } from '@dtcc-uif/textbox';

import { DatepickerModule } from '@dtcc-uif/datepicker';
import { MessageBoxModule } from '@dtcc-uif/messagebox';

import { ToasterModule } from '@dtcc-uif/toaster';
import { VerticalWizardModule } from '@dtcc-uif/vertical-wizard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AgGridModule.withComponents([]),

    ButtonsModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),

    AlertModule,
    CheckboxModule,
    DatagridModule,
    FooterModule,
    FormModule,
    HeaderModule,
    LeftMenuModule,
    LoaderModule,
    DtccModalModule,
    MultiselectModule,
    PanelModule,
    RadiobuttonModule,
    SelectModule,
    SlideoutModule,
    TextareaModule,
    TextboxModule,
    TooltipModule,

    DatepickerModule,
    MessageBoxModule,
    ToasterModule,
    VerticalWizardModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AgGridModule,

    ButtonsModule,
    ProgressbarModule,
    TooltipModule,
    AccordionModule,
    TabsModule,
    PopoverModule,

    AlertModule,
    CheckboxModule,
    DatagridModule,
    FooterModule,
    FormModule,
    HeaderModule,
    LeftMenuModule,
    LoaderModule,
    DtccModalModule,
    MultiselectModule,
    PanelModule,
    RadiobuttonModule,
    SelectModule,
    SlideoutModule,
    TextareaModule,
    TextboxModule,

    DatepickerModule,
    MessageBoxModule,
    ToasterModule,
    VerticalWizardModule,
  ]
})
export class IonSharedModule {}
