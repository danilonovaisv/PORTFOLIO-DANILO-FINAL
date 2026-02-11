/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var OAuthGrantType = /* @__PURE__ */ ((OAuthGrantType2) => {
  OAuthGrantType2["CLIENT_CREDENTIALS"] = "client_credentials";
  OAuthGrantType2["AUTHORIZATION_CODE"] = "authorization_code";
  OAuthGrantType2["IMPLICIT"] = "implicit";
  OAuthGrantType2["PASSWORD"] = "password";
  return OAuthGrantType2;
})(OAuthGrantType || {});
function getOAuthGrantTypeFromFlow(flow) {
  if (flow.clientCredentials) {
    return "client_credentials" /* CLIENT_CREDENTIALS */;
  }
  if (flow.authorizationCode) {
    return "authorization_code" /* AUTHORIZATION_CODE */;
  }
  if (flow.implicit) {
    return "implicit" /* IMPLICIT */;
  }
  if (flow.password) {
    return "password" /* PASSWORD */;
  }
  return void 0;
}
export {
  OAuthGrantType,
  getOAuthGrantTypeFromFlow
};
