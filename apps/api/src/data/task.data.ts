const task = ({
  id,
  status,
  entityId = 'urn:vcloud:entity:vmware:containerRegistry:2899d7c8-1428-4e8f-973f-a73b665c82f0',
  errorMessage,
  resultContent,
}: {
  id: string;
  status: 'success' | 'error';
  entityId?: string;
  errorMessage?: string;
  resultContent?: string;
}) => {
  return {
    id,
    otherAttributes: {},
    link: [
      {
        otherAttributes: {},
        href: 'https://atl1-vcd-static-129-119.eng.vmware.com/api/task/657b9acb-2642-493a-8155-a37fb507c5df',
        id: null,
        type: 'application/vnd.vmware.vcloud.task+xml',
        name: 'task',
        rel: 'edit',
        model: null,
        vCloudExtension: [],
      },
    ],
    href: 'https://atl1-vcd-static-129-119.eng.vmware.com/api/task/657b9acb-2642-493a-8155-a37fb507c5df',
    type: 'application/vnd.vmware.vcloud.task+json',
    operationKey: null,
    description: null,
    tasks: null,
    name: 'task',
    owner: {
      otherAttributes: {},
      href: '',
      id: entityId,
      type: 'application/json',
      name: 'entity',
      vCloudExtension: [],
    },
    error:
      status === 'success'
        ? ''
        : {
            otherAttributes: {},
            tenantError: {
              otherAttributes: {},
              message: errorMessage ? errorMessage : `${id} Time out.`,
              majorErrorCode: 500,
              minorErrorCode: 'TIMEDOUT',
              vendorSpecificErrorCode: null,
              vCloudExtension: [],
            },
            stackTrace: 'com.vmware.vcloud.api.presentation.service.TimedoutException: Timed out.',
            message: errorMessage ? errorMessage : `${id} Time out.`,
            majorErrorCode: 408,
            minorErrorCode: 'TIMEDOUT',
            vendorSpecificErrorCode: null,
            vCloudExtension: [],
          },
    user: {
      otherAttributes: {},
      href: 'https://atl1-vcd-static-129-119.eng.vmware.com/api/admin/user/c7cbc996-f9a3-46f9-b270-1819bea434f9',
      id: 'urn:vcloud:user:c7cbc996-f9a3-46f9-b270-1819bea434f9',
      type: 'application/vnd.vmware.admin.user+xml',
      name: 'admin',
      vCloudExtension: [],
    },
    organization: {
      otherAttributes: {},
      href: 'https://atl1-vcd-static-129-119.eng.vmware.com/api/org/a93c9db9-7471-3192-8d09-a8f7eeda85f9',
      id: 'urn:vcloud:org:a93c9db9-7471-3192-8d09-a8f7eeda85f9',
      type: 'application/vnd.vmware.vcloud.org+xml',
      name: 'System',
      vCloudExtension: [],
    },
    progress: null,
    params: null,
    details: status === 'success' ? 'OK' : errorMessage ? errorMessage : `${id} Time out.`,
    vcTaskList: {
      otherAttributes: {},
      vcTask: [],
      vCloudExtension: [],
    },
    result: status === 'success' ? {resultContent, resultReference: null} : null,
    status,
    operation: `Invoked ${id}`,
    operationName: 'executeBehavior',
    serviceNamespace: 'com.vmware.vcloud',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    expiryTime: new Date().toISOString(),
    cancelRequested: false,
    vCloudExtension: [],
  };
};

export {task};
