// tslint:disable
// this is an auto generated file. This will be overwritten

export const getAccount = `query GetAccount($accountId: ID!) {
  getAccount(accountId: $accountId) {
    id
    name
    addresses {
      items {name addressee addressType street city state country}
    }
    website
    taxId
    owner
    ownedBy {
      id
      email
      group
      given_name
      family_name
      phone_number
    }
    plan {
      id
      planType {id name}
      startDate
      endDate
      active
      lastBillDate
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    users {
      items {id email given_name family_name group createdAt}
    }
    forms {
      items {id name createdAt desc versionId startsAt endsAt isPaused owner ownedBy {given_name family_name email}}
    }
  }
}
`;
export const listAccounts = `query {
  listAccounts {
      id
      name
      ownedBy {id email given_name family_name}
      createdAt
      updatedAt
  }
}`;

export const getUser = `query GetUser($userId: ID!) {
  getUser(userId: $userId) {
    id
    owner
    accountId
    account {
      id
      name
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
export const listUsers = `query ListUsers() {
  listUsers() {
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
  }
}`;

export const listAccountUsers = `query ListAccountUsers(
  $accountId: String!
) {
  listAccountUsers(
    accountId: $accountId
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
  }
}`;

export const listAccountUsersActive = `query ListAccountUsersActive(
  $accountId: String!
) {
  listAccountUsersActive(
    accountId: $accountId
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
  }
}
`;
export const listAccountUsersInGroup = `query ListAccountUsersInGroup(
  $accountId: String!
  $group: String!


) {
  listAccountUsersInGroup(
    accountId: $accountId
    group: $group


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
export const listPlans = `query ListPlans() {
  listPlans() {
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
  }
}
`;
export const listAccountPlans = `query ListAccountPlans(
  $accountId: String!


) {
  listAccountPlans(
    accountId: $accountId


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
export const listPlanTypes = `query {
  listPlanTypes {
    id
    name
    cost
    active
    billingTerm
    createdAt
    updatedAt
  }
}`;

export const getForm = `query GetForm($formId: String!) {
  getForm(formId: $formId) {
    id
    owner
    name
    desc
    versionId
    formData {
      id
      owner
      createdAt
      notes
      formData
    }
    ownedBy {
      id
      email
      group
      given_name
      family_name
    }
    accountId
    createdAt
    updatedAt
    startsAt
    endsAt
    isPaused
    versions {
      items {id ownedBy {id email group given_name family_name} createdAt notes}
    }
    integrations {
      items {id integrationType active}
    }
  }
}`;

export const listForms = `query ListForms() {
  listForms() {
    items {
      id
      owner
      name
      desc
      versionId
      formData {id ownedBy {id email group given_name family_name} createdAt notes}
      account {id name}
      createdAt
      updatedAt
      startsAt
      endsAt
      isPaused
    }
  }
}
`;
export const listAccountForms = `query ListAccountForms(
  $accountId: String!


) {
  listAccountForms(
    accountId: $accountId


  ) {
    items {
      id
      owner
      name
      desc
      versionId
      formData {id ownedBy {id email group given_name family_name} createdAt notes}
      accountId
      createdAt
      updatedAt
      startsAt
      endsAt
      isPaused
    }
  }
}
`;
export const listAccountFormsActive = `query ListAccountFormsActive(
  $accountId: String!
  $active: String!


) {
  listAccountFormsActive(
    accountId: $accountId
    active: $active


  ) {
    items {
      id
      owner
      name
      desc
      versionId
      accountId
      createdAt
      updatedAt
      startsAt
      endsAt
      isPaused
    }
  }
}
`;
export const listAccountFormsByUser = `query ListAccountFormsByUser(
  $accountId: String!
  $userId: String!


) {
  listAccountFormsByUser(
    accountId: $accountId
    userId: $userId


  ) {
    items {
      id
      owner
      name
      desc
      versionId
      accountId
      createdAt
      updatedAt
      startsAt
      endsAt
      isPaused
    }
  }
}
`;
export const listAccountFormsByUserActive = `query ListAccountFormsByUserActive(
  $accountId: String!
  $userId: String!
  $active: String!


) {
  listAccountFormsByUserActive(
    accountId: $accountId
    userId: $userId
    active: $active


  ) {
    items {
      id
      owner
      name
      desc
      versionId
      accountId
      createdAt
      updatedAt
      startsAt
      endsAt
      isPaused
    }
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
export const listIntegrationTypes = `query ListIntegrationTypes() {
  listIntegrationTypes() {
    items {
      id
      owner
      planTypeId
      name
      active
      createdAt
      updatedAt
    }
  }
}
`;
export const listIntegrationTypesByPlanType = `query ListIntegrationTypesByPlanType(
  $planTypeId: String!


) {
  listIntegrationTypesByPlanType(
    planTypeId: $planTypeId


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
  }
}
`;
export const listIntegrationTypesByPlanTypeActive = `query ListIntegrationTypesByPlanTypeActive(
  $planTypeId: String!
  $active: String!


) {
  listIntegrationTypesByPlanTypeActive(
    planTypeId: $planTypeId
    active: $active


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
      name
      desc
      versionId
      accountId
      createdAt
      updatedAt
      startsAt
      endsAt
      isPaused
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
export const listIntegrations = `query ListIntegrations() {
  listIntegrations() {
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
  }
}
`;
export const listAccountIntegrations = `query ListAccountIntegrations(
  $accountId: String!


) {
  listAccountIntegrations(
    accountId: $accountId


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
  }
}
`;
export const listAccountFormIntegrations = `query ListAccountFormIntegrations(
  $accountId: String!
  $formId: String!


) {
  listAccountFormIntegrations(
    accountId: $accountId
    formId: $formId


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
  }
}
`;
export const listAccountFormIntegrationsActive = `query ListAccountFormIntegrationsActive(
  $accountId: String!
  $formId: String!
  $active: String!


) {
  listAccountFormIntegrationsActive(
    accountId: $accountId
    formId: $formId
    active: $active


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
export const listFormEntries = `query ListFormEntries($formId: String!) {
  listFormEntries(formId: $formId) {
    items {
      id
      type
      meta
      createdAt
    }
  }
}
`;
export const listFormEntriesByTime = `query ListFormEntriesByTime($formId: String!, $timestampPrefix: String!) {
  listFormEntriesByTime(formId: $formId, timestampPrefix: $timestampPrefix) {
    items {
      id
      type
      meta
      createdAt
    }
  }
}
`;
