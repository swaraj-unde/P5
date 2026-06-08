import { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ProductImageUpload({ file, setFile, url, setUrl }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleRemove = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <Label className="text-zinc-200 font-medium">Upload Image</Label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="
          border border-zinc-800
          bg-zinc-900/40
          hover:bg-zinc-900
          transition
          cursor-pointer
          rounded-xl
          p-6
          flex flex-col items-center justify-center
          gap-3
          text-center
        "
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
        />

        {!file ? (
          <>
            <UploadCloudIcon className="h-8 w-8 text-zinc-400" />

            <div>
              <p className="text-sm text-zinc-300 font-medium">
                Drag & drop or click to upload
              </p>
              <p className="text-xs text-zinc-500 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </>
        ) : (
          <div className="w-full flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <FileIcon className="h-5 w-5 text-zinc-400" />
              <p className="text-sm text-zinc-200 truncate max-w-[180px]">
                {file.name}
              </p>
            </div>

            
            <Button
              onClick={handleRemove}
              type="button"
              className="h-8 w-8 p-0 bg-zinc-800 hover:bg-zinc-700"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
