/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type AddPlanTypeInput = {
  name: string,
  cost: number,
  billingTerm: string,
  active: boolean,
};

export type AddPlanInput = {
  accountId: string,
  planTypeId: string,
  endDate?: string | null,
  active?: boolean | null,
};

export type AddAccountInput = {
  name: string,
};

export type AddUserInput = {
  email: string,
  group: string,
  accountId: string,
  given_name: string,
  family_name: string,
  phone_number?: string | null,
};

export type AddIntegrationTypeInput = {
  name: string,
  active?: boolean | null,
};

export type AddIntegrationInput = {
  integrationTypeId: string,
  accountId: string,
  formId: string,
  active?: boolean | null,
  authType?: string | null,
  auth?: string | null,
  target?: string | null,
  method?: string | null,
};

export type AddFormInput = {
  name: string,
  desc?: string | null,
  content: string,
  layout?: string | null,
  formLayoutOptions?: string | null,
  stopSubmit?: boolean | null,
  submitTarget?: string | null,
  successRedirect?: string | null,
  errorRedirect?: string | null,
};

export type UpdatePlanTypeInput = {
  id: string,
  name: string,
  cost: number,
  billingTerm: string,
  active: boolean,
};

export type UpdatePlanInput = {
  id: string,
  endDate?: string | null,
  active: boolean,
};

export type UpdateAccountInput = {
  id: string,
  name?: string | null,
  planId?: string | null,
};

export type UpdateUserInput = {
  id: string,
  data: UpdateUserInputData,
};

export type UpdateUserInputData = {
  group: string,
  given_name: string,
  family_name: string,
  phone_number?: string | null,
};

export type UpdateIntegrationTypeInput = {
  id: string,
  name: string,
  active?: boolean | null,
};

export type UpdateIntegrationInput = {
  id: string,
  active?: boolean | null,
  authType?: string | null,
  auth?: string | null,
  target?: string | null,
  method?: string | null,
};

export type UpdateFormInput = {
  id?: string | null,
  name?: string | null,
  desc?: string | null,
  content: string,
  layout?: string | null,
  formLayoutOptions?: string | null,
  stopSubmit?: boolean | null,
  submitTarget?: string | null,
  successRedirect?: string | null,
  errorRedirect?: string | null,
};

export type AddFormEntryInput = {
  data: string,
};

export type AddPlanTypeMutationVariables = {
  input?: AddPlanTypeInput | null,
};

export type AddPlanTypeMutation = {
  addPlanType:  {
    __typename: "PlanType",
    id: string,
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    name: string,
    cost: number,
    active: boolean,
    billingTerm: string,
    createdAt: string | null,
    updatedAt: string | null,
  },
};

export type AddPlanMutationVariables = {
  input?: AddPlanInput | null,
};

export type AddPlanMutation = {
  addPlan:  {
    __typename: "Plan",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      name: string,
      website: string | null,
      taxId: string | null,
      owner: string,
      planId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    planTypeId: string,
    startDate: string,
    endDate: string | null,
    active: boolean | null,
    lastBillDate: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    planType:  {
      __typename: "PlanType",
      id: string,
      owner: string,
      name: string,
      cost: number,
      active: boolean,
      billingTerm: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
  },
};

export type AddAccountMutationVariables = {
  input?: AddAccountInput | null,
};

export type AddAccountMutation = {
  addAccount:  {
    __typename: "Account",
    id: string,
    name: string,
    addresses:  {
      __typename: "PaginatedAddress",
      nextToken: string | null,
    } | null,
    website: string | null,
    taxId: string | null,
    owner: string,
    planId: string | null,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
    users:  {
      __typename: "PaginatedUser",
      nextToken: string | null,
    } | null,
    forms:  {
      __typename: "PaginatedForm",
      nextToken: string | null,
    } | null,
    plan:  {
      __typename: "Plan",
      id: string,
      accountId: string,
      owner: string,
      planTypeId: string,
      startDate: string,
      endDate: string | null,
      active: boolean | null,
      lastBillDate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
  },
};

export type AddUserMutationVariables = {
  input?: AddUserInput | null,
};

export type AddUserMutation = {
  addUser:  {
    __typename: "User",
    id: string,
    owner: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      name: string,
      website: string | null,
      taxId: string | null,
      owner: string,
      planId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    email: string,
    group: string,
    given_name: string,
    family_name: string,
    phone_number: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    isDeleted: boolean | null,
  },
};

export type AddIntegrationTypeMutationVariables = {
  input?: AddIntegrationTypeInput | null,
};

export type AddIntegrationTypeMutation = {
  addIntegrationType:  {
    __typename: "IntegrationType",
    id: string,
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    planTypeId: string,
    planType:  {
      __typename: "PlanType",
      id: string,
      owner: string,
      name: string,
      cost: number,
      active: boolean,
      billingTerm: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    name: string,
    active: boolean,
    createdAt: string | null,
    updatedAt: string | null,
  },
};

export type AddIntegrationMutationVariables = {
  input?: AddIntegrationInput | null,
};

export type AddIntegrationMutation = {
  addIntegration:  {
    __typename: "Integration",
    id: string,
    integrationTypeId: string,
    integrationType:  {
      __typename: "IntegrationType",
      id: string,
      owner: string,
      planTypeId: string,
      name: string,
      active: boolean,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    owner: string,
    accountId: string,
    formId: string,
    form:  {
      __typename: "Form",
      id: string,
      owner: string,
      accountId: string,
      exid: string | null,
      desc: string | null,
      name: string,
      tenant: string | null,
      status: string | null,
      content: string,
      layout: string | null,
      formLayoutOptions: string | null,
      stopSubmit: boolean | null,
      submitTarget: string | null,
      successRedirect: string | null,
      errorRedirect: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    active: boolean,
    authType: string | null,
    auth: string | null,
    target: string | null,
    method: string | null,
    lastExecuted: string | null,
    lastExecutionResult: boolean | null,
    lastExecutionResultMessage: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  },
};

export type AddFormMutationVariables = {
  input?: AddFormInput | null,
};

export type AddFormMutation = {
  addForm:  {
    __typename: "Form",
    id: string,
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      name: string,
      website: string | null,
      taxId: string | null,
      owner: string,
      planId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    exid: string | null,
    desc: string | null,
    name: string,
    tenant: string | null,
    status: string | null,
    content: string,
    layout: string | null,
    formLayoutOptions: string | null,
    stopSubmit: boolean | null,
    submitTarget: string | null,
    successRedirect: string | null,
    errorRedirect: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    entries:  {
      __typename: "PaginatedFormEntries",
      nextToken: string | null,
    } | null,
  },
};

export type UpdatePlanTypeMutationVariables = {
  input?: UpdatePlanTypeInput | null,
};

export type UpdatePlanTypeMutation = {
  updatePlanType:  {
    __typename: "PlanType",
    id: string,
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    name: string,
    cost: number,
    active: boolean,
    billingTerm: string,
    createdAt: string | null,
    updatedAt: string | null,
  },
};

export type UpdatePlanMutationVariables = {
  input?: UpdatePlanInput | null,
};

export type UpdatePlanMutation = {
  updatePlan:  {
    __typename: "Plan",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      name: string,
      website: string | null,
      taxId: string | null,
      owner: string,
      planId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    planTypeId: string,
    startDate: string,
    endDate: string | null,
    active: boolean | null,
    lastBillDate: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    planType:  {
      __typename: "PlanType",
      id: string,
      owner: string,
      name: string,
      cost: number,
      active: boolean,
      billingTerm: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
  },
};

export type UpdateAccountMutationVariables = {
  input?: UpdateAccountInput | null,
};

export type UpdateAccountMutation = {
  updateAccount:  {
    __typename: "Account",
    id: string,
    name: string,
    addresses:  {
      __typename: "PaginatedAddress",
      nextToken: string | null,
    } | null,
    website: string | null,
    taxId: string | null,
    owner: string,
    planId: string | null,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
    users:  {
      __typename: "PaginatedUser",
      nextToken: string | null,
    } | null,
    forms:  {
      __typename: "PaginatedForm",
      nextToken: string | null,
    } | null,
    plan:  {
      __typename: "Plan",
      id: string,
      accountId: string,
      owner: string,
      planTypeId: string,
      startDate: string,
      endDate: string | null,
      active: boolean | null,
      lastBillDate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
  },
};

export type UpdateUserMutationVariables = {
  input?: UpdateUserInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    owner: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      name: string,
      website: string | null,
      taxId: string | null,
      owner: string,
      planId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    email: string,
    group: string,
    given_name: string,
    family_name: string,
    phone_number: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    isDeleted: boolean | null,
  },
};

export type UpdateIntegrationTypeMutationVariables = {
  input?: UpdateIntegrationTypeInput | null,
};

export type UpdateIntegrationTypeMutation = {
  updateIntegrationType:  {
    __typename: "IntegrationType",
    id: string,
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    planTypeId: string,
    planType:  {
      __typename: "PlanType",
      id: string,
      owner: string,
      name: string,
      cost: number,
      active: boolean,
      billingTerm: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    name: string,
    active: boolean,
    createdAt: string | null,
    updatedAt: string | null,
  },
};

export type UpdateIntegrationMutationVariables = {
  input?: UpdateIntegrationInput | null,
};

export type UpdateIntegrationMutation = {
  updateIntegration:  {
    __typename: "Integration",
    id: string,
    integrationTypeId: string,
    integrationType:  {
      __typename: "IntegrationType",
      id: string,
      owner: string,
      planTypeId: string,
      name: string,
      active: boolean,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    owner: string,
    accountId: string,
    formId: string,
    form:  {
      __typename: "Form",
      id: string,
      owner: string,
      accountId: string,
      exid: string | null,
      desc: string | null,
      name: string,
      tenant: string | null,
      status: string | null,
      content: string,
      layout: string | null,
      formLayoutOptions: string | null,
      stopSubmit: boolean | null,
      submitTarget: string | null,
      successRedirect: string | null,
      errorRedirect: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    active: boolean,
    authType: string | null,
    auth: string | null,
    target: string | null,
    method: string | null,
    lastExecuted: string | null,
    lastExecutionResult: boolean | null,
    lastExecutionResultMessage: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  },
};

export type UpdateFormMutationVariables = {
  input?: UpdateFormInput | null,
};

export type UpdateFormMutation = {
  updateForm:  {
    __typename: "Form",
    id: string,
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      name: string,
      website: string | null,
      taxId: string | null,
      owner: string,
      planId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    exid: string | null,
    desc: string | null,
    name: string,
    tenant: string | null,
    status: string | null,
    content: string,
    layout: string | null,
    formLayoutOptions: string | null,
    stopSubmit: boolean | null,
    submitTarget: string | null,
    successRedirect: string | null,
    errorRedirect: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    entries:  {
      __typename: "PaginatedFormEntries",
      nextToken: string | null,
    } | null,
  },
};

export type DeletePlanTypeMutationVariables = {
  id: string,
};

export type DeletePlanTypeMutation = {
  deletePlanType:  {
    __typename: "PlanType",
    id: string,
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    name: string,
    cost: number,
    active: boolean,
    billingTerm: string,
    createdAt: string | null,
    updatedAt: string | null,
  },
};

export type DeletePlanMutationVariables = {
  id: string,
};

export type DeletePlanMutation = {
  deletePlan:  {
    __typename: "Plan",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      name: string,
      website: string | null,
      taxId: string | null,
      owner: string,
      planId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    planTypeId: string,
    startDate: string,
    endDate: string | null,
    active: boolean | null,
    lastBillDate: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    planType:  {
      __typename: "PlanType",
      id: string,
      owner: string,
      name: string,
      cost: number,
      active: boolean,
      billingTerm: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
  },
};

export type DeleteAccountMutationVariables = {
  id: string,
};

export type DeleteAccountMutation = {
  deleteAccount:  {
    __typename: "Account",
    id: string,
    name: string,
    addresses:  {
      __typename: "PaginatedAddress",
      nextToken: string | null,
    } | null,
    website: string | null,
    taxId: string | null,
    owner: string,
    planId: string | null,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
    users:  {
      __typename: "PaginatedUser",
      nextToken: string | null,
    } | null,
    forms:  {
      __typename: "PaginatedForm",
      nextToken: string | null,
    } | null,
    plan:  {
      __typename: "Plan",
      id: string,
      accountId: string,
      owner: string,
      planTypeId: string,
      startDate: string,
      endDate: string | null,
      active: boolean | null,
      lastBillDate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
  },
};

export type DeleteUserMutationVariables = {
  id: string,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    owner: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      name: string,
      website: string | null,
      taxId: string | null,
      owner: string,
      planId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    email: string,
    group: string,
    given_name: string,
    family_name: string,
    phone_number: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    isDeleted: boolean | null,
  },
};

export type DeleteIntegrationTypeMutationVariables = {
  id: string,
};

export type DeleteIntegrationTypeMutation = {
  deleteIntegrationType:  {
    __typename: "IntegrationType",
    id: string,
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    planTypeId: string,
    planType:  {
      __typename: "PlanType",
      id: string,
      owner: string,
      name: string,
      cost: number,
      active: boolean,
      billingTerm: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    name: string,
    active: boolean,
    createdAt: string | null,
    updatedAt: string | null,
  },
};

export type DeleteIntegrationMutationVariables = {
  id: string,
};

export type DeleteIntegrationMutation = {
  deleteIntegration:  {
    __typename: "Integration",
    id: string,
    integrationTypeId: string,
    integrationType:  {
      __typename: "IntegrationType",
      id: string,
      owner: string,
      planTypeId: string,
      name: string,
      active: boolean,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    owner: string,
    accountId: string,
    formId: string,
    form:  {
      __typename: "Form",
      id: string,
      owner: string,
      accountId: string,
      exid: string | null,
      desc: string | null,
      name: string,
      tenant: string | null,
      status: string | null,
      content: string,
      layout: string | null,
      formLayoutOptions: string | null,
      stopSubmit: boolean | null,
      submitTarget: string | null,
      successRedirect: string | null,
      errorRedirect: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    active: boolean,
    authType: string | null,
    auth: string | null,
    target: string | null,
    method: string | null,
    lastExecuted: string | null,
    lastExecutionResult: boolean | null,
    lastExecutionResultMessage: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  },
};

export type DeleteFormMutationVariables = {
  id: string,
};

export type DeleteFormMutation = {
  deleteForm:  {
    __typename: "Form",
    id: string,
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      name: string,
      website: string | null,
      taxId: string | null,
      owner: string,
      planId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    exid: string | null,
    desc: string | null,
    name: string,
    tenant: string | null,
    status: string | null,
    content: string,
    layout: string | null,
    formLayoutOptions: string | null,
    stopSubmit: boolean | null,
    submitTarget: string | null,
    successRedirect: string | null,
    errorRedirect: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    entries:  {
      __typename: "PaginatedFormEntries",
      nextToken: string | null,
    } | null,
  },
};

export type AddFormEntryMutationVariables = {
  input: AddFormEntryInput,
};

export type AddFormEntryMutation = {
  addFormEntry:  {
    __typename: "FormEntry",
    id: string,
    type: string,
    meta: string,
    createdAt: string,
  },
};

export type TestPipelineMutation = {
  testPipeline: string | null,
};

export type AttachPlanMutationVariables = {
  input?: AddPlanInput | null,
};

export type AttachPlanMutation = {
  attachPlan:  {
    __typename: "Account",
    id: string,
    name: string,
    addresses:  {
      __typename: "PaginatedAddress",
      nextToken: string | null,
    } | null,
    website: string | null,
    taxId: string | null,
    owner: string,
    planId: string | null,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
    users:  {
      __typename: "PaginatedUser",
      nextToken: string | null,
    } | null,
    forms:  {
      __typename: "PaginatedForm",
      nextToken: string | null,
    } | null,
    plan:  {
      __typename: "Plan",
      id: string,
      accountId: string,
      owner: string,
      planTypeId: string,
      startDate: string,
      endDate: string | null,
      active: boolean | null,
      lastBillDate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
  } | null,
};

export type GetAccountQueryVariables = {
  accountId: string,
};

export type GetAccountQuery = {
  getAccount:  {
    __typename: "Account",
    id: string,
    name: string,
    addresses:  {
      __typename: "PaginatedAddress",
      nextToken: string | null,
    } | null,
    website: string | null,
    taxId: string | null,
    owner: string,
    planId: string | null,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
    users:  {
      __typename: "PaginatedUser",
      nextToken: string | null,
    } | null,
    forms:  {
      __typename: "PaginatedForm",
      nextToken: string | null,
    } | null,
    plan:  {
      __typename: "Plan",
      id: string,
      accountId: string,
      owner: string,
      planTypeId: string,
      startDate: string,
      endDate: string | null,
      active: boolean | null,
      lastBillDate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
  } | null,
};

export type ListAllAccountsQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllAccountsQuery = {
  listAllAccounts:  {
    __typename: "PaginatedAccount",
    items:  Array< {
      __typename: "Account",
      id: string,
      name: string,
      website: string | null,
      taxId: string | null,
      owner: string,
      planId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type GetUserQueryVariables = {
  userId: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    owner: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      name: string,
      website: string | null,
      taxId: string | null,
      owner: string,
      planId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    email: string,
    group: string,
    given_name: string,
    family_name: string,
    phone_number: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    isDeleted: boolean | null,
  } | null,
};

export type ListAllUsersQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllUsersQuery = {
  listAllUsers:  {
    __typename: "PaginatedUser",
    items:  Array< {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllAccountUsersQueryVariables = {
  accountId: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllAccountUsersQuery = {
  listAllAccountUsers:  {
    __typename: "PaginatedUser",
    items:  Array< {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllAccountUsersActiveQueryVariables = {
  accountId: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllAccountUsersActiveQuery = {
  listAllAccountUsersActive:  {
    __typename: "PaginatedUser",
    items:  Array< {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAccountUsersInGroupQueryVariables = {
  accountId: string,
  group: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAccountUsersInGroupQuery = {
  listAccountUsersInGroup:  {
    __typename: "PaginatedUser",
    items:  Array< {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    } > | null,
    nextToken: string | null,
  },
};

export type GetPlanQueryVariables = {
  planId: string,
};

export type GetPlanQuery = {
  getPlan:  {
    __typename: "Plan",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      name: string,
      website: string | null,
      taxId: string | null,
      owner: string,
      planId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    planTypeId: string,
    startDate: string,
    endDate: string | null,
    active: boolean | null,
    lastBillDate: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    planType:  {
      __typename: "PlanType",
      id: string,
      owner: string,
      name: string,
      cost: number,
      active: boolean,
      billingTerm: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
  } | null,
};

export type ListAllPlansQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllPlansQuery = {
  listAllPlans:  {
    __typename: "PaginatedPlan",
    items:  Array< {
      __typename: "Plan",
      id: string,
      accountId: string,
      owner: string,
      planTypeId: string,
      startDate: string,
      endDate: string | null,
      active: boolean | null,
      lastBillDate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllAccountPlansQueryVariables = {
  accountId: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllAccountPlansQuery = {
  listAllAccountPlans:  {
    __typename: "PaginatedPlan",
    items:  Array< {
      __typename: "Plan",
      id: string,
      accountId: string,
      owner: string,
      planTypeId: string,
      startDate: string,
      endDate: string | null,
      active: boolean | null,
      lastBillDate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type GetActiveAccountPlanQueryVariables = {
  accountId: string,
};

export type GetActiveAccountPlanQuery = {
  getActiveAccountPlan:  {
    __typename: "PaginatedPlan",
    items:  Array< {
      __typename: "Plan",
      id: string,
      accountId: string,
      owner: string,
      planTypeId: string,
      startDate: string,
      endDate: string | null,
      active: boolean | null,
      lastBillDate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type GetPlanTypeQueryVariables = {
  planTypeId: string,
};

export type GetPlanTypeQuery = {
  getPlanType:  {
    __typename: "PlanType",
    id: string,
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    name: string,
    cost: number,
    active: boolean,
    billingTerm: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type ListAllPlanTypesQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllPlanTypesQuery = {
  listAllPlanTypes:  {
    __typename: "PaginatedPlanType",
    items:  Array< {
      __typename: "PlanType",
      id: string,
      owner: string,
      name: string,
      cost: number,
      active: boolean,
      billingTerm: string,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllActivePlanTypesQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllActivePlanTypesQuery = {
  listAllActivePlanTypes:  {
    __typename: "PaginatedPlanType",
    items:  Array< {
      __typename: "PlanType",
      id: string,
      owner: string,
      name: string,
      cost: number,
      active: boolean,
      billingTerm: string,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type GetFormQueryVariables = {
  formId: string,
};

export type GetFormQuery = {
  getForm:  {
    __typename: "Form",
    id: string,
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      name: string,
      website: string | null,
      taxId: string | null,
      owner: string,
      planId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    exid: string | null,
    desc: string | null,
    name: string,
    tenant: string | null,
    status: string | null,
    content: string,
    layout: string | null,
    formLayoutOptions: string | null,
    stopSubmit: boolean | null,
    submitTarget: string | null,
    successRedirect: string | null,
    errorRedirect: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    entries:  {
      __typename: "PaginatedFormEntries",
      nextToken: string | null,
    } | null,
  },
};

export type ListAllFormsQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllFormsQuery = {
  listAllForms:  {
    __typename: "PaginatedForm",
    items:  Array< {
      __typename: "Form",
      id: string,
      owner: string,
      accountId: string,
      exid: string | null,
      desc: string | null,
      name: string,
      tenant: string | null,
      status: string | null,
      content: string,
      layout: string | null,
      formLayoutOptions: string | null,
      stopSubmit: boolean | null,
      submitTarget: string | null,
      successRedirect: string | null,
      errorRedirect: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllAccountFormsQueryVariables = {
  accountId: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllAccountFormsQuery = {
  listAllAccountForms:  {
    __typename: "PaginatedForm",
    items:  Array< {
      __typename: "Form",
      id: string,
      owner: string,
      accountId: string,
      exid: string | null,
      desc: string | null,
      name: string,
      tenant: string | null,
      status: string | null,
      content: string,
      layout: string | null,
      formLayoutOptions: string | null,
      stopSubmit: boolean | null,
      submitTarget: string | null,
      successRedirect: string | null,
      errorRedirect: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllAccountFormsActiveQueryVariables = {
  accountId: string,
  active: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllAccountFormsActiveQuery = {
  listAllAccountFormsActive:  {
    __typename: "PaginatedForm",
    items:  Array< {
      __typename: "Form",
      id: string,
      owner: string,
      accountId: string,
      exid: string | null,
      desc: string | null,
      name: string,
      tenant: string | null,
      status: string | null,
      content: string,
      layout: string | null,
      formLayoutOptions: string | null,
      stopSubmit: boolean | null,
      submitTarget: string | null,
      successRedirect: string | null,
      errorRedirect: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllAccountFormsByUserQueryVariables = {
  accountId: string,
  userId: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllAccountFormsByUserQuery = {
  listAllAccountFormsByUser:  {
    __typename: "PaginatedForm",
    items:  Array< {
      __typename: "Form",
      id: string,
      owner: string,
      accountId: string,
      exid: string | null,
      desc: string | null,
      name: string,
      tenant: string | null,
      status: string | null,
      content: string,
      layout: string | null,
      formLayoutOptions: string | null,
      stopSubmit: boolean | null,
      submitTarget: string | null,
      successRedirect: string | null,
      errorRedirect: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllAccountFormsByUserActiveQueryVariables = {
  accountId: string,
  userId: string,
  active: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllAccountFormsByUserActiveQuery = {
  listAllAccountFormsByUserActive:  {
    __typename: "PaginatedForm",
    items:  Array< {
      __typename: "Form",
      id: string,
      owner: string,
      accountId: string,
      exid: string | null,
      desc: string | null,
      name: string,
      tenant: string | null,
      status: string | null,
      content: string,
      layout: string | null,
      formLayoutOptions: string | null,
      stopSubmit: boolean | null,
      submitTarget: string | null,
      successRedirect: string | null,
      errorRedirect: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type GetIntegrationTypeQueryVariables = {
  integrationTypeId: string,
};

export type GetIntegrationTypeQuery = {
  getIntegrationType:  {
    __typename: "IntegrationType",
    id: string,
    owner: string,
    ownedBy:  {
      __typename: "User",
      id: string,
      owner: string,
      accountId: string,
      email: string,
      group: string,
      given_name: string,
      family_name: string,
      phone_number: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      isDeleted: boolean | null,
    },
    planTypeId: string,
    planType:  {
      __typename: "PlanType",
      id: string,
      owner: string,
      name: string,
      cost: number,
      active: boolean,
      billingTerm: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    name: string,
    active: boolean,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type ListAllIntegrationTypesQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllIntegrationTypesQuery = {
  listAllIntegrationTypes:  {
    __typename: "PaginatedIntegrationType",
    items:  Array< {
      __typename: "IntegrationType",
      id: string,
      owner: string,
      planTypeId: string,
      name: string,
      active: boolean,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllIntegrationTypesByPlanTypeQueryVariables = {
  planTypeId: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllIntegrationTypesByPlanTypeQuery = {
  listAllIntegrationTypesByPlanType:  {
    __typename: "PaginatedIntegrationType",
    items:  Array< {
      __typename: "IntegrationType",
      id: string,
      owner: string,
      planTypeId: string,
      name: string,
      active: boolean,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllIntegrationTypesByPlanTypeActiveQueryVariables = {
  planTypeId: string,
  active: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllIntegrationTypesByPlanTypeActiveQuery = {
  listAllIntegrationTypesByPlanTypeActive:  {
    __typename: "PaginatedIntegrationType",
    items:  Array< {
      __typename: "IntegrationType",
      id: string,
      owner: string,
      planTypeId: string,
      name: string,
      active: boolean,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type GetIntegrationQueryVariables = {
  integrationId: string,
};

export type GetIntegrationQuery = {
  getIntegration:  {
    __typename: "Integration",
    id: string,
    integrationTypeId: string,
    integrationType:  {
      __typename: "IntegrationType",
      id: string,
      owner: string,
      planTypeId: string,
      name: string,
      active: boolean,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    owner: string,
    accountId: string,
    formId: string,
    form:  {
      __typename: "Form",
      id: string,
      owner: string,
      accountId: string,
      exid: string | null,
      desc: string | null,
      name: string,
      tenant: string | null,
      status: string | null,
      content: string,
      layout: string | null,
      formLayoutOptions: string | null,
      stopSubmit: boolean | null,
      submitTarget: string | null,
      successRedirect: string | null,
      errorRedirect: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    active: boolean,
    authType: string | null,
    auth: string | null,
    target: string | null,
    method: string | null,
    lastExecuted: string | null,
    lastExecutionResult: boolean | null,
    lastExecutionResultMessage: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type ListAllIntegrationsQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllIntegrationsQuery = {
  listAllIntegrations:  {
    __typename: "PaginatedIntegration",
    items:  Array< {
      __typename: "Integration",
      id: string,
      integrationTypeId: string,
      owner: string,
      accountId: string,
      formId: string,
      active: boolean,
      authType: string | null,
      auth: string | null,
      target: string | null,
      method: string | null,
      lastExecuted: string | null,
      lastExecutionResult: boolean | null,
      lastExecutionResultMessage: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllAccountIntegrationsQueryVariables = {
  accountId: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllAccountIntegrationsQuery = {
  listAllAccountIntegrations:  {
    __typename: "PaginatedIntegration",
    items:  Array< {
      __typename: "Integration",
      id: string,
      integrationTypeId: string,
      owner: string,
      accountId: string,
      formId: string,
      active: boolean,
      authType: string | null,
      auth: string | null,
      target: string | null,
      method: string | null,
      lastExecuted: string | null,
      lastExecutionResult: boolean | null,
      lastExecutionResultMessage: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllAccountFormIntegrationsQueryVariables = {
  accountId: string,
  formId: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllAccountFormIntegrationsQuery = {
  listAllAccountFormIntegrations:  {
    __typename: "PaginatedIntegration",
    items:  Array< {
      __typename: "Integration",
      id: string,
      integrationTypeId: string,
      owner: string,
      accountId: string,
      formId: string,
      active: boolean,
      authType: string | null,
      auth: string | null,
      target: string | null,
      method: string | null,
      lastExecuted: string | null,
      lastExecutionResult: boolean | null,
      lastExecutionResultMessage: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllAccountFormIntegrationsActiveQueryVariables = {
  accountId: string,
  formId: string,
  active: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllAccountFormIntegrationsActiveQuery = {
  listAllAccountFormIntegrationsActive:  {
    __typename: "PaginatedIntegration",
    items:  Array< {
      __typename: "Integration",
      id: string,
      integrationTypeId: string,
      owner: string,
      accountId: string,
      formId: string,
      active: boolean,
      authType: string | null,
      auth: string | null,
      target: string | null,
      method: string | null,
      lastExecuted: string | null,
      lastExecutionResult: boolean | null,
      lastExecutionResultMessage: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } > | null,
    nextToken: string | null,
  },
};

export type GetFormEntryQueryVariables = {
  formEntryId: string,
};

export type GetFormEntryQuery = {
  getFormEntry:  {
    __typename: "FormEntry",
    id: string,
    type: string,
    meta: string,
    createdAt: string,
  } | null,
};

export type ListAllFormEntriesQueryVariables = {
  formId: string,
};

export type ListAllFormEntriesQuery = {
  listAllFormEntries:  {
    __typename: "PaginatedFormEntries",
    items:  Array< {
      __typename: "FormEntry",
      id: string,
      type: string,
      meta: string,
      createdAt: string,
    } > | null,
    nextToken: string | null,
  },
};

export type ListAllFormEntriesByTimeQueryVariables = {
  formId: string,
  timestampPrefix: string,
};

export type ListAllFormEntriesByTimeQuery = {
  listAllFormEntriesByTime:  {
    __typename: "PaginatedFormEntries",
    items:  Array< {
      __typename: "FormEntry",
      id: string,
      type: string,
      meta: string,
      createdAt: string,
    } > | null,
    nextToken: string | null,
  },
};
