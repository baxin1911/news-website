import { useForm } from "../../core/forms/form.js";
import { resetPassword } from "../../api/authApi.js";

useForm({
    selector: '#resetForm',
    sendRequest: (data, options) => resetPassword(data, options),
});