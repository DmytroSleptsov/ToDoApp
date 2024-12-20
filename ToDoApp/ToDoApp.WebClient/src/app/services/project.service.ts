import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Project } from "../models/project.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.apiUrl}/project`);
    }

    getProject(id: number): Observable<Project> {
        return this.http.get<Project>(`${this.apiUrl}/project/${id}`);
    }

    createProject(project: Project): Observable<Project> {
        return this.http.post<Project>(`${this.apiUrl}/project`, project);
    }

    updateProject(id: number, project: Project): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/project/${id}`, project);
    }

    deleteProject(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/project/${id}`);
    }
}