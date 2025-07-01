export function getImageUrl(originalPath: string, options = {}) {
  if (originalPath.startsWith('http')) return originalPath;
  
  const pathWithoutPublic = originalPath.startsWith('/')
    ? originalPath.substring(1)
    : originalPath.replace('public/', '');
  
  const transformations = Object.entries(options)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');
  
  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const transformationSegment = transformations ? `/${transformations}` : '';
  
  return `${baseUrl}${transformationSegment}/v1/personal-website/${pathWithoutPublic}`;
}
