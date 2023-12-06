<script setup>

import imgLogin from '@/assets/login.png'
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import {maxLength, minLength, required} from '@vuelidate/validators'
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore()
const { errors } = storeToRefs(useAuthStore())

import { Device } from '@capacitor/device';
const logDeviceInfo = async () => {
  const info = await Device.getId()

  console.log(info);
};

const initialState = {
  username: '',
  password: '',
}

const state = reactive({
  ...initialState,
})

const rules = {
  username: { required, minLength: minLength(8), maxLength: maxLength(20) },
  password: { required,minLength: minLength(8) },
}

const v$ = useVuelidate(rules, state)

function clear () {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}

const handleLogin = () => {
  logDeviceInfo()
  console.log('auth ' + state )
  if(!v$.value.$error){
    authStore.login(state).then(() => {
      router.push({name: 'admin.index'})
    })
  }
  // authStore.login(initialState).then(() => {
  //   router.push({name: 'dashboard'})
  // })
}
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-row align="center">
        <v-col cols="12" lg="4" offset-lg="4" md="6" offset-md="3" sm="8" offset-sm="2">
          <v-card variant="flat" class="py-10" align="left">
            <v-img :src="imgLogin" />
            <form @submit.prevent="handleLogin">
              <v-text-field
                v-model="state.username"
                :error-messages="v$.username.$errors.map(e => e.$message)"
                label="Username"
                required
                @input="v$.username.$touch"
                @blur="v$.username.$touch"
              ></v-text-field>

              <v-text-field
                v-model="state.password"
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

