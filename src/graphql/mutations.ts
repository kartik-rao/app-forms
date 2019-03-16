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
export const addForm = `mutation AddForm($input: AddFormInput) {
  addForm(input: $input) {
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
export const updateForm = `mutation UpdateForm($input: UpdateFormInput) {
  updateForm(input: $input) {
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
export const deleteForm = `mutation DeleteForm($id: ID!) {
  deleteForm(id: $id) {
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
