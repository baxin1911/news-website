import axios from "axios"
import { saveAvatarImage } from "./imageService.js";
import { avatarsDir } from "../utils/pathsUtils.js";

export const downloadGoogleAvatar = async (url) => {

    try {

        const response = await axios.get(url, { responseType: 'arraybuffer' });
        await saveAvatarImage(response.data, avatarsDir);

    } catch (err) {

        console.log(err);
    }
}