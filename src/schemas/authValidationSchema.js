import * as yup from 'yup'

export const loginValidationSchema = yup.object({
    email: yup.string().required('Ingrese su correo electrónico').email('Ingrese un correo electrónico válido'),
    password: yup.string().required('Ingrese su contraseña')
})

export const registroValidationSchema = yup.object({
    name: yup.string().required('Por favor ingrese su nombre completo'),
    email: yup.string().required('El correo es requerido').email('Ingrese un correo electrónico válido'),
    password: yup.string().required('Ingrese una contraseña').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    password_confirm:  yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required('Por favor confirme su contraseña')
})