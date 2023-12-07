<script setup>
import {computed, onMounted, reactive, ref} from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { maxLength, minLength, required } from '@vuelidate/validators'
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { Device } from '@capacitor/device';
import imgLogin from '@/assets/login.png'
import router from "@/router";

const authStore = useAuthStore()
onMounted( () => {
  Device.getId().then( (device) => {
    form.deviceId = device.identifier
  })
})

const form = reactive({
  username: 'edopranata',
  password: 'passwordd',
  deviceId: null
})

const requiredLenght = ref(8)

const rules = computed(() => ({
  username: { required, minLength: minLength(requiredLenght.value)},
  password: { required, minLength: minLength(requiredLenght.value)},
  deviceId: { required },
}))

const v$ = useVuelidate(rules, form)

const handleLogin = () => {
  if(!v$.value.$error){
    authStore.login(form).then(() => {
      router.push({name: 'admin.index'})
    })
  }
}

</script>

<template>
  <v-container class="fill-height">
    <v-snackbar
      v-model="authStore.snackBar.status"
    >
      {{ authStore.snackBar.text }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click.stop="authStore.closeSnackBar()"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-responsive class="align-center text-center fill-height">
      <v-row align="center">
        <v-col cols="12" lg="4" offset-lg="4" md="6" offset-md="3" sm="8" offset-sm="2">
          <v-card variant="flat" class="py-10" align="left">
            <v-img :src="imgLogin" />
            <form @submit.prevent="handleLogin">
              <v-text-field
                v-model="form.username"
                :error-messages="v$.username.$errors.map(e => e.$message)"
                label="Username"
                required
                @input="v$.username.$touch"
                @blur="v$.username.$touch"
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                :error-messages="v$.password.$errors.map(e => e.$message)"
                label="Password"
                type="password"
                required
                @input="v$.password.$touch"
                @blur="v$.password.$touch"
              ></v-text-field>

              <div class="d-flex justify-space-between pt-10">
                <v-btn
                  @click="router.push('/')"
                >
                  Back
                </v-btn>

                <v-btn
                  type="submit"
                  @click="v$.$validate"
                >
                  submit
                </v-btn>
              </div>
            </form>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>

</template>

