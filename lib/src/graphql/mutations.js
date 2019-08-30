// tslint:disable
// this is an auto generated file. This will be overwritten
export const addPlanType = `mutation AddPlanType($input: AddPlanTypeInput) {
  addPlanType(input: $input) {
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
export const addPlan = `mutation AddPlan($input: AddPlanInput) {
  addPlan(input: $input) {
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
export const addAccount = `mutation AddAccount($input: AddAccountInput) {
  addAccount(input: $input) {
    id
    name
    addresses {
      nextToken
    }
    website
    taxId
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
    createdAt
    updatedAt
    users {
      nextToken
    }
    forms {
      nextToken
    }
  }
}
`;
export const addUser = `mutation AddUser($input: AddUserInput) {
  addUser(input: $input) {
    id
    owner
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
export const addIntegrationType = `mutation AddIntegrationType($input: AddIntegrationTypeInput) {
  addIntegrationType(input: $input) {
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
export const addIntegration = `mutation AddIntegration($input: AddIntegrationInput) {
  addIntegration(input: $input) {
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
export const addForm = `mutation AddForm($form: AddFormInput!, $notes: String!) {
  addForm(form: $form, notes: $notes) {
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
      owner
      accountId
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
  }
}
`;
export const addFormVersion = `mutation AddFormVersion($version: AddFormVersionInput) {
  addFormVersion(version: $version) {
    id
    owner
    ownedBy {
      id
      email
      group
      given_name
      family_name
    }
    createdAt
    notes
    formData
  }
}
`;
export const updatePlanType = `mutation UpdatePlanType($input: UpdatePlanTypeInput) {
  updatePlanType(input: $input) {
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
export const updatePlan = `mutation UpdatePlan($input: UpdatePlanInput) {
  updatePlan(input: $input) {
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
export const updateAccount = `mutation UpdateAccount($input: UpdateAccountInput) {
  updateAccount(input: $input) {
    id
    name
    addresses {
      nextToken
    }
    website
    taxId
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
    createdAt
    updatedAt
    users {
      nextToken
    }
    forms {
      nextToken
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput) {
  updateUser(input: $input) {
    id
    owner
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
export const updateIntegrationType = `mutation UpdateIntegrationType($input: UpdateIntegrationTypeInput) {
  updateIntegrationType(input: $input) {
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
export const updateIntegration = `mutation UpdateIntegration($input: UpdateIntegrationInput) {
  updateIntegration(input: $input) {
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
export const updateForm = `mutation UpdateForm($input: UpdateFormInput) {
  updateForm(input: $input) {
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
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    startsAt
    endsAt
    isPaused
    versions {
      nextToken
    }
    integrations {
      nextToken
    }
    entries {
      nextToken
    }
  }
}
`;
export const deletePlanType = `mutation DeletePlanType($id: ID!) {
  deletePlanType(id: $id) {
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
export const deletePlan = `mutation DeletePlan($id: ID!) {
  deletePlan(id: $id) {
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
export const deleteAccount = `mutation DeleteAccount($id: ID!) {
  deleteAccount(id: $id) {
    id
    name
    addresses {
      nextToken
    }
    website
    taxId
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
    createdAt
    updatedAt
    users {
      nextToken
    }
    forms {
      nextToken
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    owner
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
export const deleteIntegrationType = `mutation DeleteIntegrationType($id: ID!) {
  deleteIntegrationType(id: $id) {
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
export const deleteIntegration = `mutation DeleteIntegration($id: ID!) {
  deleteIntegration(id: $id) {
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
export const deleteForm = `mutation DeleteForm($id: ID!) {
  deleteForm(id: $id) {
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
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    startsAt
    endsAt
    isPaused
    versions {
      nextToken
    }
    integrations {
      nextToken
    }
    entries {
      nextToken
    }
  }
}
`;
export const addFormEntry = `mutation AddFormEntry($input: AddFormEntryInput!) {
  addFormEntry(input: $input) {
    id
    type
    meta
    createdAt
  }
}
`;
export const testPipeline = `mutation TestPipeline {
  testPipeline
}
`;
export const attachPlan = `mutation AttachPlan($input: AddPlanInput) {
  attachPlan(input: $input) {
    id
    name
    addresses {
      nextToken
    }
    website
    taxId
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
    createdAt
    updatedAt
    users {
      nextToken
    }
    forms {
      nextToken
    }
  }
}
`;
//# sourceMappingURL=mutations.js.map