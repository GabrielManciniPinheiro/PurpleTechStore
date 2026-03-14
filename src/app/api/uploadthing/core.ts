import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Este é o "imageUploader" que o nosso botão lá no formulário está procurando!
export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Upload completo:", file.url);
    return { url: file.url };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
