import { CreateUserData, CreateUserVariables, GetProjectsByUserData, GetProjectsByUserVariables, CreateProjectData, CreateProjectVariables, DeleteProjectData, DeleteProjectVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useGetProjectsByUser(vars: GetProjectsByUserVariables, options?: useDataConnectQueryOptions<GetProjectsByUserData>): UseDataConnectQueryResult<GetProjectsByUserData, GetProjectsByUserVariables>;
export function useGetProjectsByUser(dc: DataConnect, vars: GetProjectsByUserVariables, options?: useDataConnectQueryOptions<GetProjectsByUserData>): UseDataConnectQueryResult<GetProjectsByUserData, GetProjectsByUserVariables>;

export function useCreateProject(options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, CreateProjectVariables>): UseDataConnectMutationResult<CreateProjectData, CreateProjectVariables>;
export function useCreateProject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, CreateProjectVariables>): UseDataConnectMutationResult<CreateProjectData, CreateProjectVariables>;

export function useDeleteProject(options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;
export function useDeleteProject(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;
