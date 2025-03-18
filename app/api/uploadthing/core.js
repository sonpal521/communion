import { createUploadthing } from "uploadthing/next";

const f = createUploadthing(); // No TypeScript generics needed


const auth = async (req) => {
  return { id: "fakeId" }; // Replace with actual authentication logic
};

// Define UploadThing file routes
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      // Authenticate user
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(" Upload complete for userId:", metadata.userId);
      console.log(" File URL:", file.ufsUrl);

      return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
    }),
};
