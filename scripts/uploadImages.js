import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env.local") });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Track uploaded files
const uploadResults = [];

async function uploadFile(filePath) {
  let stats;
  try {
    // Get relative path from public directory
    const relativePath = path
      .relative(path.join(process.cwd(), "public"), filePath)
      .replace(/\\/g, "/");

    // Get file stats to check size
    stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    console.log(`Uploading: ${relativePath} (${fileSizeInMB.toFixed(2)} MB)...`);

    // Skip files larger than 10MB
    if (fileSizeInBytes > 10 * 1024 * 1024) {
      console.log(`  - Skipping: File is too large (${fileSizeInMB.toFixed(2)} MB)`);
      return null;
    }

    const uploadOptions = {
      folder: "personal-website",
      public_id: relativePath
        .replace(/\.[^/.]+$/, "")
        .replace(/^images\//, ""),
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: "auto",
      quality: "auto:good"  // Always use good quality with compression
    };

    const result = await cloudinary.uploader.upload(filePath, uploadOptions);

    console.log(`✓ Uploaded: ${result.secure_url} (${(result.bytes / (1024 * 1024)).toFixed(2)} MB)`);
    uploadResults.push({
      originalPath: relativePath,
      cloudinaryUrl: result.secure_url
    });

    return result;
  } catch (error) {
    console.error(`Error uploading ${filePath}:`, error.message);
    if (stats && error.message.includes("File size too large")) {
      console.error(`  - File is too large (${(stats.size / (1024 * 1024)).toFixed(2)} MB). Please compress it manually.`);
      console.error(`  - Try running: convert "${filePath}" -resize 50% -quality 85% "${filePath}_compressed.jpg"`);
      console.error(`  - Then: mv "${filePath}_compressed.jpg" "${filePath}"`);
    }
    return null;
  }
}

async function processDirectory(directory) {
  const items = fs.readdirSync(directory, { withFileTypes: true });
  const uploads = [];

  for (const item of items) {
    const fullPath = path.join(directory, item.name);

    if (item.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(fullPath);
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item.name)) {
      // Only process image files
      uploads.push(uploadFile(fullPath));
    }
  }

  // Wait for all uploads in this directory to complete
  await Promise.all(uploads);
}

async function main() {
  try {
    const imagesDir = path.join(process.cwd(), "public/images");
    console.log("Starting upload of images to Cloudinary...");

    await processDirectory(imagesDir);

    // Save upload results to a JSON file
    const resultsPath = path.join(
      process.cwd(),
      "scripts",
      "upload-results.json"
    );
    fs.writeFileSync(resultsPath, JSON.stringify(uploadResults, null, 2));

    console.log("\n✅ All images uploaded successfully!");
    console.log(`Results saved to: ${resultsPath}`);
    console.log("\nNext steps:");
    console.log(
      "1. Review the uploaded images in your Cloudinary Media Library"
    );
    console.log("2. Update your code to use the new Cloudinary URLs");
    console.log("3. Consider removing the local images after verification");
  } catch (error) {
    console.error("Upload failed:", error);
    process.exit(1);
  }
}

// Run the upload
main();
