import { generateReactHelpers } from "@uploadthing/react";

// Since JavaScript doesn't support TypeScript types, we remove the type declaration
export const { useUploadThing, uploadFiles } = generateReactHelpers();
