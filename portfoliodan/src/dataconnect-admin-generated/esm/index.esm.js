import { validateAdminArgs } from 'firebase-admin/data-connect';

export const connectorConfig = {
  connector: 'gemini-test',
  serviceId: 'portfolio-danilo-novais-service',
  location: 'southamerica-west1',
};

export function createUser(dcOrVarsOrOptions, varsOrOptions, options) {
  const {
    dc: dcInstance,
    vars: inputVars,
    options: inputOpts,
  } = validateAdminArgs(
    connectorConfig,
    dcOrVarsOrOptions,
    varsOrOptions,
    options,
    true,
    true
  );
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateUser', inputVars, inputOpts);
}

export function getProjectsByUser(dcOrVarsOrOptions, varsOrOptions, options) {
  const {
    dc: dcInstance,
    vars: inputVars,
    options: inputOpts,
  } = validateAdminArgs(
    connectorConfig,
    dcOrVarsOrOptions,
    varsOrOptions,
    options,
    true,
    true
  );
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetProjectsByUser', inputVars, inputOpts);
}

export function createProject(dcOrVarsOrOptions, varsOrOptions, options) {
  const {
    dc: dcInstance,
    vars: inputVars,
    options: inputOpts,
  } = validateAdminArgs(
    connectorConfig,
    dcOrVarsOrOptions,
    varsOrOptions,
    options,
    true,
    true
  );
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateProject', inputVars, inputOpts);
}

export function deleteProject(dcOrVarsOrOptions, varsOrOptions, options) {
  const {
    dc: dcInstance,
    vars: inputVars,
    options: inputOpts,
  } = validateAdminArgs(
    connectorConfig,
    dcOrVarsOrOptions,
    varsOrOptions,
    options,
    true,
    true
  );
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteProject', inputVars, inputOpts);
}
