import { recoverPassword } from "../../api/authApi.js";
import { useForm } from "../../core/forms/form.js";

useForm({
    selector: '#recoverForm',
    modalId: 'recoverModal',
    sendRequest: (data, options) => recoverPassword(data, options),
});