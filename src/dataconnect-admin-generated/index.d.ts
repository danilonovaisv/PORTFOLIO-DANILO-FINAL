import { ConnectorConfig } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


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

