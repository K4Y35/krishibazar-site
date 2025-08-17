import apiUrls from "../config/apiUrls";


export const getImageUrl = (filename) => {
    if(filename){
      return `${apiUrls.base_url}/uploads/${filename}`;
    }
}