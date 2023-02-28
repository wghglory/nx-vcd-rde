/* Copyright (c) 2022 VMware, Inc. All rights reserved. -- VMware Confidential */
export interface ServiceMfeGeneratorSchema {
   // The plugin name in dns format, i.e. some-plugin
   name: string;
   // The port for runninig the standalone plugin
   port: number;
}
