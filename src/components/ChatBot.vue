<script setup>

import { ref, onMounted, watch } from 'vue';
import { enviarMensaje } from '@/services/chatbotService';
import { useStorage } from '@vueuse/core'
import useUserStore from '@/stores/userStore';

const cargando = ref(false);
const mensaje = ref('');
const userStore = useUserStore();

const props = defineProps({
    campos: {
        type: Object,
        default: {}
    }
})

const emit = defineEmits(['respuestaChatbot'])

const toggleChat = () => {

    const chat = document.querySelector('#chat')
    if (chat) {
        chat.classList.toggle('chat-hidden')
    }

}

const historialChat = useStorage('historialChat', [{
    role: 'assistant',
    content: 'Hola, soy tu asistente virtual. ¿En qué puedo ayudarte hoy?'
}])




const enviar = async () => {

    if (mensaje.value.trim() === '') return;

    cargando.value = true;
    historialChat.value.push({
        role: 'user',
        content: mensaje.value
    })



    const resultado = await enviarMensaje({ mensajes: historialChat.value, campos: props.campos })

    const respuestaJson = JSON.parse(resultado.respuesta)
    historialChat.value.push({
        role: 'assistant',
        content: respuestaJson.mensaje
    })


    console.log(respuestaJson);


    mensaje.value = '';

    if (respuestaJson.campos) {
        emit('respuestaChatbot', respuestaJson.campos)

    }
    cargando.value = false;




}


</script>


<template>
    <section class=" position-fixed py-5 end-0 bottom-0 me-3 " id="chat-container">
        <div id="chat" class="chat-hidden">

            <div class="row d-flex justify-content-center">
                <div class="col-12">

                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center p-3"
                            style="border-top: 4px solid #ffa900;">
                            <h5 class="mb-0">Asistente de Chatbot</h5>
                            <div class="d-flex flex-row align-items-center d-none">
                                <span class="badge bg-warning me-3">20</span>
                                <i class="fas fa-minus me-3 text-muted fa-xs"></i>
                                <i class="fas fa-comments me-3 text-muted fa-xs"></i>
                                <i class="fas fa-times text-muted fa-xs"></i>
                            </div>
                        </div>
                        <div class="card-body overflow-y-auto" data-mdb-perfect-scrollbar-init
                            style="position: relative; height: 400px" id="chat-messages">

                            <div v-for="(msj, index) in historialChat" :key="index" class="mb-3">
                                <div v-if="msj.role == 'assistant'" class="d-flex justify-content-between">
                                    <p class="small mb-1">Asistente</p>
                                    <p class="small mb-1 text-muted d-none">23 Jan 2:00 pm</p>
                                </div>
                                <div v-if="msj.role == 'assistant'" class="d-flex flex-row justify-content-start">
                                    <img src="@/assets/img/chatbot.webp" alt="avatar 1"
                                        style="width: 45px; height: 100%;">
                                    <div>
                                        <p class="small p-2 ms-3 mb-3 rounded-3 bg-body-tertiary">
                                            {{ msj.content }}
                                        </p>
                                    </div>
                                </div>

                                <div v-if="msj.role == 'user'" class="d-flex justify-content-end">
                                    <p class="small mb-1 text-muted d-none">23 Jan 2:05 pm</p>
                                    <p class="small mb-1">{{ userStore.usuario.name }}</p>
                                </div>

                                <div v-if="msj.role == 'user'" class="d-flex flex-row justify-content-end mb-4 pt-1">
                                    <div>
                                        <p class="small p-2 me-3 mb-3 text-white rounded-3 bg-primary">
                                            {{ msj.content }}
                                        </p>
                                    </div>
                                    <img src="@/assets/img/user.png" alt="avatar 1" style="width: 45px; height: 100%;">
                                </div>
                            </div>





                            <div v-if="cargando">
                                <div class="d-flex justify-content-between">
                                    <p class="small mb-1">Asistente</p>
                                    <p class="small mb-1 text-muted d-none">23 Jan 2:00 pm</p>
                                </div>
                                <div class="d-flex flex-row justify-content-start">
                                    <img src="@/assets/img/chatbot.webp" alt="avatar 1"
                                        style="width: 45px; height: 100%;">
                                    <div class="w-100">
                                        <p class="small p-2 ms-3 mb-3 rounded-3 bg-body-tertiary placeholder-glow ">
                                            <span class="tipyng"></span>
                                            <span class="tipyng"></span>
                                            <span class="tipyng"></span>
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                            <div class="input-group mb-0">
                                <input v-model="mensaje" type="text" class="form-control" placeholder="Tu mensaje"
                                    aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button @click="enviar" data-mdb-button-init data-mdb-ripple-init
                                    class="btn btn-warning " type="button" id="button-addon2"
                                    style="padding-top: .55rem;">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>


        <div class="d-flex justify-content-end align-items-center mt-2">
            <div class="  text-center bg-warning p-3 rounded-circle shadow" id="chat-btn" @click="toggleChat">
                <i class="fas fa-comments fa-2x " id="chat-btn"></i>
            </div>
        </div>

    </section>


</template>

<style scoped>
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideOutDown {
    from {
        opacity: 1;
        transform: translateY(0);
    }

    to {
        opacity: 0;
        transform: translateY(30px);
    }
}

#chat-container {
    z-index: 10;
    width: 350px;
}

#chat {
    animation: slideInUp 0.4s ease-out;
    transition: all 0.3s ease-in-out;
}

#chat.chat-hidden {
    pointer-events: none;
    animation: slideOutDown 0.4s ease-out forwards;
}

#chat-btn {
    cursor: pointer;
    width: 70px;
}

#chat-btn i {
    color: #1e3a5f;
}

#chat-btn:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
}

.tipyng::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #6c757d;
    margin-left: 5px;
    animation: blink 1s infinite;
}

.tipyng:nth-child(2)::after {
    animation-delay: 0.2s;
}

.tipyng:nth-child(3)::after {
    animation-delay: 0.4s;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    /* // Agrega más etapas para un efecto de parpadeo más suave */
    25% {
        opacity: 0.75;
    }

    /* agrega pequeños saltos de arriba  hacia abajo*/

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-3px);
    }


}
</style>