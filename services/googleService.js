import axios from "axios"
import { saveAvatarImage } from "./imageService.js";

export const downloadGoogleAvatar = async (url, userId) => {

    try {

        const response = await axios.get(url, { responseType: 'arraybuffer' });
        
        return await saveAvatarImage({
            buffer: response.data,
            userId
        });

    } catch (err) {

        console.log(err);
    }
}