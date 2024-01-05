import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const filetype = value?.split(".").pop();

  if (filetype && value !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image src={value} fill alt="uploaded image" />
        <button
          onClick={() => {
            onChange("");
          }}
          className="absolute top-0 right-0 text-white bg-rose-500 rounded-full p-[0.1rem] hover:bg-rose-500/90 shadow-sm "
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
