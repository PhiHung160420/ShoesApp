import { CONSTANST } from "../constants";

export const createFormData = photo => {
  const data = new FormData();

  data.append('photo', {
    name: photo.filename,
    type: photo.mime,
    uri: CONSTANST.isIOS ? photo.sourceURL.replace('file://', '') : photo.sourceURL,
  });

  return data;
};