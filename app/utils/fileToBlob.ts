export function fileToBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () =>
      resolve(new Blob([new Uint8Array(reader.result as ArrayBuffer)], { type: file.type }));
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
