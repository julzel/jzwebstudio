export interface ResumeProfile {
  network?: string;
  url?: string;
  username?: string;
}

export interface ResumeLocation {
  region?: string;
  availability?: string;
  timezone?: string;
}

export interface ResumeBasics {
  name?: string;
  label?: string;
  summary?: string;
  email?: string;
  location?: ResumeLocation;
  profiles?: ResumeProfile[];
}

export interface ResumeSkills {
  frontend?: string[];
  backend?: string[];
  apis_data?: string[];
  testing?: string[];
  devops_infra?: string[];
  tooling?: string[];
  practices?: string[];
}

export interface ResumeData {
  basics?: ResumeBasics;
  skills?: ResumeSkills;
}
