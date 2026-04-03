/**
 * Resizes an image to a maximum dimension while maintaining aspect ratio.
 * This reduces the payload size for AI vision APIs and speeds up analysis.
 * @param {File} file - The original image file.
 * @param {number} maxDimension - The maximum width or height in pixels.
 * @returns {Promise<string>} - A promise that resolves to the resized image as a base64 string.
 */
export async function resizeImage(file, maxDimension = 1024) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height *= maxDimension / width;
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width *= maxDimension / height;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to quality-optimized JPEG to further reduce size
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}
