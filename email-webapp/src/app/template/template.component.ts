// templates.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-templates',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  templates: any[] = [];
  showForm = false;
  form: FormGroup;
  isEdit = false;
  currentTemplateId: string | null = null;
  private apiUrl = 'http://localhost:3000/api';


  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      subject: [''],
      body: ['']
    });
  }

  ngOnInit(): void {
    this.fetchTemplates();
  }

  fetchTemplates() {
    this.http.get(`${this.apiUrl}/templates`).subscribe((data: any) => {
      this.templates = data;
    });
  }

  addTemplate() {
    this.isEdit = false;
    this.currentTemplateId = null;
    this.form.reset();
    this.showForm = true;
  }

  editTemplate(template: any) {
    this.isEdit = true;
    this.currentTemplateId = template.id;
    this.form.setValue({
      name: template.name,
      subject: template.subject,
      body: template.body
    });
    this.showForm = true;
  }

  deleteTemplate(id: string) {
    this.http.delete(`${this.apiUrl}/templates`, { body: { id } }).subscribe(() => {
      this.fetchTemplates();
    });
  }

  saveTemplate() {
    const formData = this.form.value;
    if (this.isEdit && this.currentTemplateId) {
      const updatedTemplate = { id: this.currentTemplateId, ...formData };
      this.http.put(`${this.apiUrl}/templates`, updatedTemplate).subscribe(() => {
        this.fetchTemplates();
        this.showForm = false;
      });
    } else {
      this.http.post(`${this.apiUrl}/templates`, formData).subscribe(() => {
        this.fetchTemplates();
        this.showForm = false;
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.form.reset();
  }
}