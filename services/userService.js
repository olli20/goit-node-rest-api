import { ImageService } from "./imageService.js";

export const updateAvatarService = async (userData, user, file) => {
  if (file) {
    // user.avatar = file.path.replace('public', '');
    user.avatar = await ImageService.saveImage(
      file,
      {
        maxFileSize: 2,
        width: 200,
        height: 200,
      },
      "images",
      "users",
      user.id
    );
  }

  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });

  return user.save();
};
