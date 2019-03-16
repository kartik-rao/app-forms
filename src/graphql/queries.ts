// tslint:disable
// this is an auto generated file. This will be overwritten

export const getAccount = `query GetAccount($accountId: ID!) {
  getAccount(accountId: $accountId) {
    id
    name
    addresses {
      nextToken
    }
    website
    taxId
    owner
    planId
    ownedBy {
      id
      owner
      accountId
      email
      group
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
    }
    createdAt
    updatedAt
    users {
      nextToken
    }
    forms {
      nextToken
    }
    plan {
      id
      accountId
      owner
      planTypeId
      startDate
      endDate
      active
      lastBillDate
      createdAt
      updatedAt
    }
  }
}
`;
export const listAllAccounts = `query ListAllAccounts($limit: Int, $nextToken: String) {
  listAllAccounts(limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      website
      taxId
      owner
      planId
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($userId: ID!) {
  getUser(userId: $userId) {
    id
    owner
    accountId
    account {
      id
      name
      website
      taxId
      owner
      planId
      createdAt
      updatedAt
    }
    email
    group
    given_name
    family_name
    phone_number
    createdAt
    updatedAt
    isDeleted
  }
}
`;
export const listAllUsers = `query ListAllUsers($limit: Int, $nextToken: String) {
  listAllUsers(limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      accountId
      email
      group
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
    }
    nextToken
  }
}
`;
export const listAllAccountUsers = `query ListAllAccountUsers(
  $accountId: String!
  $limit: Int
  $nextToken: String
) {
  listAllAccountUsers(
    accountId: $accountId
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      accountId
      email
      group
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
    }
    nextToken
  }
}
`;
export const listAllAccountUsersActive = `query ListAllAccountUsersActive(
  $accountId: String!
  $limit: Int
  $nextToken: String
) {
  listAllAccountUsersActive(
    accountId: $accountId
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      accountId
      email
      group
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
    }
    nextToken
  }
}
`;
export const listAccountUsersInGroup = `query ListAccountUsersInGroup(
  $accountId: String!
  $group: String!
  $limit: Int
  $nextToken: String
) {
  listAccountUsersInGroup(
    accountId: $accountId
    group: $group
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      accountId
      email
      group
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
    }
    nextToken
  }
}
`;
export const getPlan = `query GetPlan($planId: String!) {
  getPlan(planId: $planId) {
    id
    accountId
    account {
      id
      name
      website
      taxId
      owner
      planId
      createdAt
      updatedAt
    }
    owner
    ownedBy {
      id
      owner
      accountId
      email
      group
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
    }
    planTypeId
    startDate
    endDate
    active
    lastBillDate
    createdAt
    updatedAt
    planType {
      id
      owner
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
    }
  }
}
`;
export const listAllPlans = `query ListAllPlans($limit: Int, $nextToken: String) {
  listAllPlans(limit: $limit, nextToken: $nextToken) {
    items {
      id
      accountId
      owner
      planTypeId
      startDate
      endDate
      active
      lastBillDate
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const listAllAccountPlans = `query ListAllAccountPlans(
  $accountId: String!
  $limit: Int
  $nextToken: String
) {
  listAllAccountPlans(
    accountId: $accountId
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      accountId
      owner
      planTypeId
      startDate
      endDate
      active
      lastBillDate
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getActiveAccountPlan = `query GetActiveAccountPlan($accountId: String!) {
  getActiveAccountPlan(accountId: $accountId) {
    items {
      id
      accountId
      owner
      planTypeId
      startDate
      endDate
      active
      lastBillDate
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getPlanType = `query GetPlanType($planTypeId: String!) {
  getPlanType(planTypeId: $planTypeId) {
    id
    owner
    ownedBy {
      id
      owner
      accountId
      email
      group
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
    }
    name
    cost
    active
    billingTerm
    createdAt
    updatedAt
  }
}
`;
export const listAllPlanTypes = `query ListAllPlanTypes($limit: Int, $nextToken: String) {
  listAllPlanTypes(limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const listAllActivePlanTypes = `query ListAllActivePlanTypes($limit: Int, $nextToken: String) {
  listAllActivePlanTypes(limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getForm = `query GetForm($formId: String!) {
  getForm(formId: $formId) {
    id
    owner
    ownedBy {
      id
      owner
      accountId
      email
      group
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
    }
    accountId
    account {
      id
      name
      website
      taxId
      owner
      planId
      createdAt
      updatedAt
    }
    exid
    desc
    name
    tenant
    status
    content
    layout
    formLayoutOptions
    stopSubmit
    submitTarget
    successRedirect
    errorRedirect
    createdAt
    updatedAt
    entries {
      nextToken
    }
  }
}
`;
export const listAllForms = `query ListAllForms($limit: Int, $nextToken: String) {
  listAllForms(limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      accountId
      exid
      desc
      name
      tenant
      status
      content
      layout
      formLayoutOptions
      stopSubmit
      submitTarget
      successRedirect
      errorRedirect
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const listAllAccountForms = `query ListAllAccountForms(
  $accountId: String!
  $limit: Int
  $nextToken: String
) {
  listAllAccountForms(
    accountId: $accountId
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      accountId
      exid
      desc
      name
      tenant
      status
      content
      layout
      formLayoutOptions
      stopSubmit
      submitTarget
      successRedirect
      errorRedirect
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const listAllAccountFormsActive = `query ListAllAccountFormsActive(
  $accountId: String!
  $active: String!
  $limit: Int
  $nextToken: String
) {
  listAllAccountFormsActive(
    accountId: $accountId
    active: $active
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      accountId
      exid
      desc
      name
      tenant
      status
      content
      layout
      formLayoutOptions
      stopSubmit
      submitTarget
      successRedirect
      errorRedirect
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const listAllAccountFormsByUser = `query ListAllAccountFormsByUser(
  $accountId: String!
  $userId: String!
  $limit: Int
  $nextToken: String
) {
  listAllAccountFormsByUser(
    accountId: $accountId
    userId: $userId
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      accountId
      exid
      desc
      name
      tenant
      status
      content
      layout
      formLayoutOptions
      stopSubmit
      submitTarget
      successRedirect
      errorRedirect
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const listAllAccountFormsByUserActive = `query ListAllAccountFormsByUserActive(
  $accountId: String!
  $userId: String!
  $active: String!
  $limit: Int
  $nextToken: String
) {
  listAllAccountFormsByUserActive(
    accountId: $accountId
    userId: $userId
    active: $active
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      accountId
      exid
      desc
      name
      tenant
      status
      content
      layout
      formLayoutOptions
      stopSubmit
      submitTarget
      successRedirect
      errorRedirect
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getIntegrationType = `query GetIntegrationType($integrationTypeId: String!) {
  getIntegrationType(integrationTypeId: $integrationTypeId) {
    id
    owner
    ownedBy {
      id
      owner
      accountId
      email
      group
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
    }
    planTypeId
    planType {
      id
      owner
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
    }
    name
    active
    createdAt
    updatedAt
  }
}
`;
export const listAllIntegrationTypes = `query ListAllIntegrationTypes($limit: Int, $nextToken: String) {
  listAllIntegrationTypes(limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      planTypeId
      name
      active
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const listAllIntegrationTypesByPlanType = `query ListAllIntegrationTypesByPlanType(
  $planTypeId: String!
  $limit: Int
  $nextToken: String
) {
  listAllIntegrationTypesByPlanType(
    planTypeId: $planTypeId
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      planTypeId
      name
      active
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const listAllIntegrationTypesByPlanTypeActive = `query ListAllIntegrationTypesByPlanTypeActive(
  $planTypeId: String!
  $active: String!
  $limit: Int
  $nextToken: String
) {
  listAllIntegrationTypesByPlanTypeActive(
    planTypeId: $planTypeId
    active: $active
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      planTypeId
      name
      active
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getIntegration = `query GetIntegration($integrationId: String!) {
  getIntegration(integrationId: $integrationId) {
    id
    integrationTypeId
    integrationType {
      id
      owner
      planTypeId
      name
      active
      createdAt
      updatedAt
    }
    owner
    accountId
    formId
    form {
      id
      owner
      accountId
      exid
      desc
      name
      tenant
      status
      content
      layout
      formLayoutOptions
      stopSubmit
      submitTarget
      successRedirect
      errorRedirect
      createdAt
      updatedAt
    }
    active
    authType
    auth
    target
    method
    lastExecuted
    lastExecutionResult
    lastExecutionResultMessage
    createdAt
    updatedAt
  }
}
`;
export const listAllIntegrations = `query ListAllIntegrations($limit: Int, $nextToken: String) {
  listAllIntegrations(limit: $limit, nextToken: $nextToken) {
    items {
      id
      integrationTypeId
      owner
      accountId
      formId
      active
      authType
      auth
      target
      method
      lastExecuted
      lastExecutionResult
      lastExecutionResultMessage
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const listAllAccountIntegrations = `query ListAllAccountIntegrations(
  $accountId: String!
  $limit: Int
  $nextToken: String
) {
  listAllAccountIntegrations(
    accountId: $accountId
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      integrationTypeId
      owner
      accountId
      formId
      active
      authType
      auth
      target
      method
      lastExecuted
      lastExecutionResult
      lastExecutionResultMessage
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const listAllAccountFormIntegrations = `query ListAllAccountFormIntegrations(
  $accountId: String!
  $formId: String!
  $limit: Int
  $nextToken: String
) {
  listAllAccountFormIntegrations(
    accountId: $accountId
    formId: $formId
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      integrationTypeId
      owner
      accountId
      formId
      active
      authType
      auth
      target
      method
      lastExecuted
      lastExecutionResult
      lastExecutionResultMessage
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const listAllAccountFormIntegrationsActive = `query ListAllAccountFormIntegrationsActive(
  $accountId: String!
  $formId: String!
  $active: String!
  $limit: Int
  $nextToken: String
) {
  listAllAccountFormIntegrationsActive(
    accountId: $accountId
    formId: $formId
    active: $active
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      integrationTypeId
      owner
      accountId
      formId
      active
      authType
      auth
      target
      method
      lastExecuted
      lastExecutionResult
      lastExecutionResultMessage
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getFormEntry = `query GetFormEntry($formEntryId: String!) {
  getFormEntry(formEntryId: $formEntryId) {
    id
    type
    meta
    createdAt
  }
}
`;
export const listAllFormEntries = `query ListAllFormEntries($formId: String!) {
  listAllFormEntries(formId: $formId) {
    items {
      id
      type
      meta
      createdAt
    }
    nextToken
  }
}
`;
export const listAllFormEntriesByTime = `query ListAllFormEntriesByTime($formId: String!, $timestampPrefix: String!) {
  listAllFormEntriesByTime(formId: $formId, timestampPrefix: $timestampPrefix) {
    items {
      id
      type
      meta
      createdAt
    }
    nextToken
  }
}
`;
