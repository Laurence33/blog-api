import { Image } from "../models/image.model";

export async function getImageById(id: string) {
  const image = await Image.findById(id);
  return image;
}
export async function getImageUrls(arr: string[]) {
  const imageArray: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    const image = await Image.findById(arr[0]);
    imageArray.push(image);
  }
  return imageArray.map(
    (image) => `http://localhost:3000/api/images/${image.filename}`
  );
}

export async function deleteImageById(id: string) {
  return Image.findByIdAndDelete(id);
}
