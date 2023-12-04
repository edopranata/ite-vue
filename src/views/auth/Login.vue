<script setup>

import imgLogin from '@/assets/login.png'
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import {maxValue, minValue, required} from '@vuelidate/validators'
import router from "@/router";

const initialState = {
  username: '',
  password: '',
}

const state = reactive({
  ...initialState,
})

const rules = {
  username: { required, minValue: minValue(8), maxValue: maxValue(20) },
  password: { required,minValue: minValue(8) },
}

const v$ = useVuelidate(rules, state)

function clear () {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="360" :src="imgLogin" />
      <v-row align="center">
        <v-col md="6" cols="12" offset-md="3">
          <v-card variant="flat" class="py-10" height="300" align="left">
            <form>
              <v-text-field
                v-model="state.username"
                :error-messages="v$.username.$errors.map(e => e.$message)"
                :counter="20"
                label="Userame"
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

              <div class="d-flex justify-md-space-between">
                <v-btn
                  @click="router.back()"
                >
                  Back
                </v-btn>

                <v-btn
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

