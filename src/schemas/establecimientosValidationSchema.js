import * as yup from 'yup'


 const establecimientosValidationSchema = yup.object({
    nombre: yup.string().required('El nombre es obligatorio').min(5, 'El nombre debe tener al menos 5 caracteres'),
    descripcion: yup.string().required('ingrese una descripcion').min(10, 'La descripcion debe tener al menos 10 caracteres'),
    direccion: yup.string().required('ingrese una dirección'),
    telefono: yup.number().typeError('El telefono de ser numerico'),
    email: yup.string().email('Ingrese un email válido'),
    website: yup.string().url('Ingrese una URL válida'),
    horario_apertura: yup.string().required('ingrese un horario de apertura'),
    horario_cierre: yup.string().required('ingrese un horario de cierre'),
    latitud: yup.number().required('Por favor seleccione la ubicacion en el mapa'),
    longitud: yup.number().required('Por favor seleccione la ubicacion en el mapa'),
    categoria_id: yup.number().required('Seleccione una categoria').min(1, 'Seleccione una categoria'),
    terminos_condiciones: yup.boolean().oneOf([true], 'Debe aceptar los términos y condiciones').required('Debe aceptar los términos y condiciones'),
})

export default establecimientosValidationSchema