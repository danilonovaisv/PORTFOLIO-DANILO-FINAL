import {
  queryRef,
  executeQuery,
  validateArgsWithOptions,
  mutationRef,
  executeMutation,
  validateArgs,
} from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'gemini-test',
  service: 'portfolio-danilo-novais-service',
  location: 'southamerica-west1',
};
export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true
  );
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
};
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true
  );
  return executeMutation(createUserRef(dcInstance, inputVars));
}

export const getProjectsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true
  );
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProjectsByUser', inputVars);
};
getProjectsByUserRef.operationName = 'GetProjectsByUser';

export function getProjectsByUser(dcOrVars, varsOrOptions, options) {
  const {
    dc: dcInstance,
    vars: inputVars,
    options: inputOpts,
  } = validateArgsWithOptions(
    connectorConfig,
    dcOrVars,
    varsOrOptions,
    options,
    true,
    true
  );
  return executeQuery(
    getProjectsByUserRef(dcInstance, inputVars),
    inputOpts && inputOpts.fetchPolicy
  );
}

export const createProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true
  );
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProject', inputVars);
};
createProjectRef.operationName = 'CreateProject';

export function createProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true
  );
  return executeMutation(createProjectRef(dcInstance, inputVars));
}

export const deleteProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true
  );
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProject', inputVars);
};
deleteProjectRef.operationName = 'DeleteProject';

export function deleteProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true
  );
  return executeMutation(deleteProjectRef(dcInstance, inputVars));
}
