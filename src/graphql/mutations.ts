// tslint:disable
// this is an auto generated file. This will be overwritten

export const addPlanType = `mutation AddPlanType($input: AddPlanTypeInput) {
  addPlanType(input: $input) {
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
export const addPlan = `mutation AddPlan($input: AddPlanInput) {
  addPlan(input: $input) {
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
export const addIntegrationType = `mutation AddIntegrationType($input: AddIntegrationTypeInput) {
  addIntegrationType(input: $input) {
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
export const addIntegration = `mutation AddIntegration($input: AddIntegrationInput) {
  addIntegration(input: $input) {
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
export const addForm = `mutation AddForm($input: AddFormInput!) {
  addForm(input: $input) {
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
    accountId
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
export const addFormVersion = `mutation AddFormVersion($input: AddFormVersionInput) {
  addFormVersion(input: $input) {
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
    accountId
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
export const updatePlanType = `mutation UpdatePlanType($input: UpdatePlanTypeInput) {
  updatePlanType(input: $input) {
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
export const updatePlan = `mutation UpdatePlan($input: UpdatePlanInput) {
  updatePlan(input: $input) {
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
export const updateAccount = `mutation UpdateAccount($input: UpdateAccountInput) {
  updateAccount(input: $input) {
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
export const updateAccountPlan = `mutation UpdateAccountPlan($input: AddPlanInput) {
  updateAccountPlan(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput) {
  updateUser(input: $input) {
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
export const updateIntegrationType = `mutation UpdateIntegrationType($input: UpdateIntegrationTypeInput) {
  updateIntegrationType(input: $input) {
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
export const updateIntegration = `mutation UpdateIntegration($input: UpdateIntegrationInput) {
  updateIntegration(input: $input) {
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
export const updateForm = `mutation UpdateForm($input: UpdateFormInput) {
  updateForm(input: $input) {
    id
    ownerId
    name
    description
    versionId
    formData {
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
      numForms
      numUsers
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
      formData
    }
    integrations {
      id
      integrationTypeId
      ownerId
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
      isDeleted
    }
    entries {
      id
      formId
      data
      createdAt
    }
  }
}
`;
export const deleteForm = `mutation DeleteForm($input: DeleteFormInput) {
  deleteForm(input: $input) {
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
      ownerId
      accountId
      email
      userGroup
      given_name
      family_name
    }
    accountId
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
export const deletePlanType = `mutation DeletePlanType($planTypeId: ID!) {
  deletePlanType(planTypeId: $planTypeId) {
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
export const deletePlan = `mutation DeletePlan($accountId: ID!, $planId: ID!) {
  deletePlan(accountId: $accountId, planId: $planId) {
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
export const deleteAccount = `mutation DeleteAccount($accountId: ID!) {
  deleteAccount(accountId: $accountId) {
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
export const deleteUser = `mutation DeleteUser($userId: ID!) {
  deleteUser(userId: $userId) {
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
export const deleteIntegrationType = `mutation DeleteIntegrationType($integrationTypeId: ID!) {
  deleteIntegrationType(integrationTypeId: $integrationTypeId) {
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
export const deleteIntegration = `mutation DeleteIntegration($integrationId: ID!) {
  deleteIntegration(integrationId: $integrationId) {
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
export const addFormEntry = `mutation AddFormEntry($input: AddFormEntryInput!) {
  addFormEntry(input: $input) {
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
