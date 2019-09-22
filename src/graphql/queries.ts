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
      versionActivatedDate
      accountId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
      redirectNotStarted
      redirectHasEnded
    }
  }
}
`;
export const getUser = `query GetUser($userId: ID!) {
  getUser(userId: $userId) {
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
    versionActivatedDate
    version {
      id
      accountId
      formId
      ownerId
      createdAt
      displayName
      notes
      formData
    }
    ownedBy {
      id
      email
      userGroup
      given_name
      family_name
    }
    accountId
    account {
      id
      name
      createdAt
      updatedAt
      active
    }
    createdAt
    updatedAt
    startDate
    endDate
    isPaused
    isDeleted
    redirectNotStarted
    redirectHasEnded
    versions {
      id
      ownedBy {given_name family_name email}
      createdAt
      displayName
      notes
    }
  }
}
`;
export const getFormVersion = `query GetFormVersion($versionId: String!) {
  getFormVersion(versionId: $versionId) {
    id
    accountId
    formId
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
    createdAt
    displayName
    notes
    formData
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
      versionActivatedDate
      accountId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
      redirectNotStarted
      redirectHasEnded
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
      versionActivatedDate
      accountId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
      redirectNotStarted
      redirectHasEnded
    }
    data
    createdAt
  }
}
`;
export const listAccounts = `query ListAccounts(
  $offsetLimit: OffsetLimit
  $filter: AccountFilterInput
  $sort: AccountSortInput
) {
  listAccounts(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
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
      versionActivatedDate
      accountId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
      redirectNotStarted
      redirectHasEnded
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $offsetLimit: OffsetLimit
  $filter: UserFilterInput
  $sort: UserSortInput
) {
  listUsers(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
    id
    ownerId
    ownedBy {
      id
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
    }
    email
    userGroup
    given_name
    family_name
    phone_number
    createdAt
    updatedAt
    isDeleted
  }
}
`;
export const listPlans = `query ListPlans(
  $offsetLimit: OffsetLimit
  $filter: PlanFilterInput
  $sort: PlanSortInput
) {
  listPlans(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
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
export const listPlanTypes = `query ListPlanTypes(
  $offsetLimit: OffsetLimit
  $filter: PlanTypeFilterInput
  $sort: PlanTypeSortInput
) {
  listPlanTypes(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
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
export const listForms = `query ListForms(
  $offsetLimit: OffsetLimit
  $filter: FormFilterInput
  $sort: FormSortInput
) {
  listForms(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
    id
    ownerId
    name
    description
    versionId
    versionActivatedDate
    version {
      id
      createdAt
      displayName
    }
    ownedBy {
      id
      email
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
    redirectNotStarted
    redirectHasEnded
  }
}
`;
export const listFormVersions = `query ListFormVersions(
  $offsetLimit: OffsetLimit
  $filter: FormVersionFilterInput
  $sort: FormVersionSortInput
) {
  listFormVersions(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
    id
    accountId
    formId
    ownerId
    ownedBy {
      id
      email
      userGroup
      given_name
      family_name
    }
    createdAt
    displayName
    notes
    formData
  }
}
`;
export const listIntegrationTypes = `query ListIntegrationTypes(
  $offsetLimit: OffsetLimit
  $filter: IntegrationTypeFilterInput
  $sort: IntegrationTypeSortInput
) {
  listIntegrationTypes(
    offsetLimit: $offsetLimit
    filter: $filter
    sort: $sort
  ) {
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
  $sort: IntegrationSortInput
) {
  listIntegrations(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
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
      versionActivatedDate
      accountId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
      redirectNotStarted
      redirectHasEnded
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
      versionActivatedDate
      accountId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
      redirectNotStarted
      redirectHasEnded
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
      versionActivatedDate
      accountId
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
      redirectNotStarted
      redirectHasEnded
    }
    data
    createdAt
  }
}
`;
