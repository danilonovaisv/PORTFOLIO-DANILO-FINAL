import {
  ConnectorConfig,
  DataConnect,
  OperationOptions,
  ExecuteOperationResponse,
} from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;

export interface CreateProjectData {
  project_insert: Project_Key;
}

export interface CreateProjectVariables {
  title: string;
  description: string;
  client?: string | null;
  link?: string | null;
  role?: string | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  email: string;
  name: string;
  password: string;
}

export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}

export interface DeleteProjectVariables {
  id: UUIDString;
}

export interface GetProjectsByUserData {
  projects: ({
    id: UUIDString;
    title: string;
    description: string;
  } & Project_Key)[];
}

export interface GetProjectsByUserVariables {
  userId: UUIDString;
}

export interface Image_Key {
  id: UUIDString;
  __typename?: 'Image_Key';
}

export interface ProjectSkill_Key {
  projectId: UUIDString;
  skillId: UUIDString;
  __typename?: 'ProjectSkill_Key';
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface Skill_Key {
  id: UUIDString;
  __typename?: 'Skill_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

/** Generated Node Admin SDK operation action function for the 'CreateUser' Mutation. Allow users to execute without passing in DataConnect. */
export function createUser(
  dc: DataConnect,
  vars: CreateUserVariables,
  options?: OperationOptions
): Promise<ExecuteOperationResponse<CreateUserData>>;
/** Generated Node Admin SDK operation action function for the 'CreateUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function createUser(
  vars: CreateUserVariables,
  options?: OperationOptions
): Promise<ExecuteOperationResponse<CreateUserData>>;

/** Generated Node Admin SDK operation action function for the 'GetProjectsByUser' Query. Allow users to execute without passing in DataConnect. */
export function getProjectsByUser(
  dc: DataConnect,
  vars: GetProjectsByUserVariables,
  options?: OperationOptions
): Promise<ExecuteOperationResponse<GetProjectsByUserData>>;
/** Generated Node Admin SDK operation action function for the 'GetProjectsByUser' Query. Allow users to pass in custom DataConnect instances. */
export function getProjectsByUser(
  vars: GetProjectsByUserVariables,
  options?: OperationOptions
): Promise<ExecuteOperationResponse<GetProjectsByUserData>>;

/** Generated Node Admin SDK operation action function for the 'CreateProject' Mutation. Allow users to execute without passing in DataConnect. */
export function createProject(
  dc: DataConnect,
  vars: CreateProjectVariables,
  options?: OperationOptions
): Promise<ExecuteOperationResponse<CreateProjectData>>;
/** Generated Node Admin SDK operation action function for the 'CreateProject' Mutation. Allow users to pass in custom DataConnect instances. */
export function createProject(
  vars: CreateProjectVariables,
  options?: OperationOptions
): Promise<ExecuteOperationResponse<CreateProjectData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteProject' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteProject(
  dc: DataConnect,
  vars: DeleteProjectVariables,
  options?: OperationOptions
): Promise<ExecuteOperationResponse<DeleteProjectData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteProject' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteProject(
  vars: DeleteProjectVariables,
  options?: OperationOptions
): Promise<ExecuteOperationResponse<DeleteProjectData>>;
