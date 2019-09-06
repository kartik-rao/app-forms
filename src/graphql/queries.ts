// tslint:disable
// this is an auto generated file. This will be overwritten

export const getAccount = `query GetAccount($accountId: ID!) {
  getAccount(accountId: $accountId) {
    id
    name
    addresses {
      id
      name
      addressee
      addressType
      phone_number
      email
      street
      city
      state
      country
    }
    website
    taxId
    ownerId
    ownedBy {
      id
      ownerId
      accountId
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
    }
    plan {
      id
      accountId
      ownerId
      planTypeId
      startDate
      endDate
      active
      lastBillDate
      createdAt
      updatedAt
      isDeleted
    }
    planId
    createdAt
    updatedAt
    active
    numForms
    numUsers
    users {
      id
      ownerId
      accountId
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
    }
    forms {
      id
      ownedBy {email given_name family_name}
      name
      description
      versionId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
    }
  }
}
`;
export const getUser = `query GetUser($userId: ID!) {
  getUser(userId: $userId) {
    id
    ownerId
    accountId
    account {
      id
      name
      website
      taxId
      ownerId
      planId
      createdAt
      updatedAt
      active
      numForms
      numUsers
    }
    email
    userGroup
    given_name
    family_name
    phone_number
    createdAt
    updatedAt
    isDeleted
    numForms
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
      ownerId
      planId
      createdAt
      updatedAt
      active
      numForms
      numUsers
    }
    ownerId
    ownedBy {
      id
      ownerId
      accountId
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
      numForms
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
      ownerId
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
      isDeleted
    }
    isDeleted
  }
}
`;
export const getActiveAccountPlan = `query GetActiveAccountPlan($accountId: String!) {
  getActiveAccountPlan(accountId: $accountId) {
    id
    accountId
    account {
      id
      name
      website
      taxId
      ownerId
      planId
      createdAt
      updatedAt
      active
      numForms
      numUsers
    }
    ownerId
    ownedBy {
      id
      ownerId
      accountId
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
      numForms
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
      ownerId
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
      isDeleted
    }
    isDeleted
  }
}
`;
export const getPlanType = `query GetPlanType($planTypeId: String!) {
  getPlanType(planTypeId: $planTypeId) {
    id
    ownerId
    ownedBy {
      id
      ownerId
      accountId
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
      numForms
    }
    name
    cost
    active
    billingTerm
    createdAt
    updatedAt
    isDeleted
  }
}
`;
export const getForm = `query GetForm($formId: String!) {
  getForm(formId: $formId) {
    id
    ownerId
    name
    description
    versionId
    version {
      id
      formId
      ownerId
      createdAt
      notes
      formData
    }
    ownedBy {
      id
      ownerId
      email
      userGroup
      given_name
      family_name
    }
    accountId
    account {
      id
      name
    }
    createdAt
    updatedAt
    startDate
    endDate
    isPaused
    isDeleted
  }
}
`;
export const getIntegrationType = `query GetIntegrationType($integrationTypeId: String!) {
  getIntegrationType(integrationTypeId: $integrationTypeId) {
    id
    ownerId
    ownedBy {
      id
      ownerId
      accountId
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
      numForms
    }
    planTypeId
    planType {
      id
      ownerId
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
      isDeleted
    }
    name
    active
    createdAt
    updatedAt
  }
}
`;
export const getIntegration = `query GetIntegration($integrationId: String!) {
  getIntegration(integrationId: $integrationId) {
    id
    integrationTypeId
    integrationType {
      id
      ownerId
      planTypeId
      name
      active
      createdAt
      updatedAt
    }
    ownerId
    accountId
    formId
    form {
      id
      ownerId
      name
      description
      versionId
      accountId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
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
    isDeleted
  }
}
`;
export const getFormEntry = `query GetFormEntry($formEntryId: String!) {
  getFormEntry(formEntryId: $formEntryId) {
    id
    formId
    form {
      id
      ownerId
      name
      description
      versionId
      accountId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
    }
    data
    createdAt
  }
}
`;
export const listAccounts = `query ListAccounts($offsetLimit: OffsetLimit, $filter: AccountFilterInput) {
  listAccounts(offsetLimit: $offsetLimit, filter: $filter) {
    id
    name
    addresses {
      id
      name
      addressee
      addressType
      phone_number
      email
      street
      city
      state
      country
    }
    website
    taxId
    ownerId
    ownedBy {
      id
      ownerId
      accountId
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
      numForms
    }
    plan {
      id
      accountId
      ownerId
      planTypeId
      startDate
      endDate
      active
      lastBillDate
      createdAt
      updatedAt
      isDeleted
    }
    planId
    createdAt
    updatedAt
    active
    numForms
    numUsers
    users {
      id
      ownerId
      accountId
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
      numForms
    }
    forms {
      id
      ownerId
      name
      description
      versionId
      accountId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
    }
  }
}
`;
export const listUsers = `query ListUsers($offsetLimit: OffsetLimit, $filter: UserFilterInput) {
  listUsers(offsetLimit: $offsetLimit, filter: $filter) {
    id
    ownerId
    accountId
    account {
      id
      name
      website
      taxId
      ownerId
      planId
      createdAt
      updatedAt
      active
      numForms
      numUsers
    }
    email
    userGroup
    given_name
    family_name
    phone_number
    createdAt
    updatedAt
    isDeleted
    numForms
  }
}
`;
export const listPlans = `query ListPlans($offsetLimit: OffsetLimit, $filter: PlanFilterInput) {
  listPlans(offsetLimit: $offsetLimit, filter: $filter) {
    id
    accountId
    account {
      id
      name
      website
      taxId
      ownerId
      planId
      createdAt
      updatedAt
      active
      numForms
      numUsers
    }
    ownerId
    ownedBy {
      id
      ownerId
      accountId
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
      numForms
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
      ownerId
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
      isDeleted
    }
    isDeleted
  }
}
`;
export const listPlanTypes = `query ListPlanTypes($offsetLimit: OffsetLimit, $filter: PlanTypeFilterInput) {
  listPlanTypes(offsetLimit: $offsetLimit, filter: $filter) {
    id
    ownerId
    ownedBy {
      id
      ownerId
      accountId
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
      numForms
    }
    name
    cost
    active
    billingTerm
    createdAt
    updatedAt
    isDeleted
  }
}
`;
export const listForms = `query ListForms($offsetLimit: OffsetLimit, $filter: FormFilterInput) {
  listForms(offsetLimit: $offsetLimit, filter: $filter) {
    id
    ownerId
    name
    description
    versionId
    version {
      id
      formId
      ownerId
      createdAt
      notes
    }
    ownedBy {
      id
      accountId
      email
      userGroup
      given_name
      family_name
    }
    accountId
    account {
      id
      name
      planId
      active
      numForms
    }
    createdAt
    updatedAt
    startDate
    endDate
    isPaused
    isDeleted
    versions {
      id
      formId
      ownerId
      createdAt
      notes
    }
  }
}
`;
export const listIntegrationTypes = `query ListIntegrationTypes(
  $offsetLimit: OffsetLimit
  $filter: IntegrationTypeFilterInput
) {
  listIntegrationTypes(offsetLimit: $offsetLimit, filter: $filter) {
    id
    ownerId
    ownedBy {
      id
      ownerId
      accountId
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
      numForms
    }
    planTypeId
    planType {
      id
      ownerId
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
      isDeleted
    }
    name
    active
    createdAt
    updatedAt
  }
}
`;
export const listIntegrations = `query ListIntegrations(
  $offsetLimit: OffsetLimit
  $filter: IntegrationFilterInput
) {
  listIntegrations(offsetLimit: $offsetLimit, filter: $filter) {
    id
    integrationTypeId
    integrationType {
      id
      ownerId
      planTypeId
      name
      active
      createdAt
      updatedAt
    }
    ownerId
    accountId
    formId
    form {
      id
      ownerId
      name
      description
      versionId
      accountId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
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
    isDeleted
  }
}
`;
export const listFormEntries = `query ListFormEntries($offsetLimit: OffsetLimit, $formId: String!) {
  listFormEntries(offsetLimit: $offsetLimit, formId: $formId) {
    id
    formId
    form {
      id
      ownerId
      name
      description
      versionId
      accountId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
    }
    data
    createdAt
  }
}
`;
export const listFormEntriesByTime = `query ListFormEntriesByTime(
  $offsetLimit: OffsetLimit
  $formId: String!
  $timestampPrefix: String!
) {
  listFormEntriesByTime(
    offsetLimit: $offsetLimit
    formId: $formId
    timestampPrefix: $timestampPrefix
  ) {
    id
    formId
    form {
      id
      ownerId
      name
      description
      versionId
      accountId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
    }
    data
    createdAt
  }
}
`;
