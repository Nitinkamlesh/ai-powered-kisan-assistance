import { useState, useEffect } from "react";

export default function ImageUploader({ onImageSelect }) {
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Only allow image files
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    // Pass file to parent
    onImageSelect(file);
  };

  // prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <label className="block text-lg font-semibold mb-2">
        Upload Potato Leaf Image
      </label>

      <input type="file" accept="image/*" onChange={handleFile} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-4 rounded-lg shadow-lg w-64"
        />
      )}
    </div>
  );
}
