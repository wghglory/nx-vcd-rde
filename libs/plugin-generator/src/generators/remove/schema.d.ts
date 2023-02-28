/* Copyright (c) 2022 VMware, Inc. All rights reserved. -- VMware Confidential */
export interface RemoveGeneratorSchema {
   // Using projectName instead of name property to get the Nx Console drop-down listing all projects
   projectName: string;
   // TODO add forceRemove boolean flah like the Nx remove generator?
}
