import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Constants from "expo-constants";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios"; 

//import { jsonFieldsChecklist } from "../assets/jsonFieldsChecklist.json"
//import { data } from "../assets/data.json"

export default function LoginScreen({ navigation }) {
  //const jsonFieldsChecklist = require("../assets/checklistApiRetorno.json");
  //const [fieldsArea, setFieldsArea] = useState();
  //const data = require('../assets/data.json');
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const {
    handleSubmit,
    control,
    register,

    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 0;
      });
  }, [isFocused]);

  const onSubmit = (data) => {
    let fieldsArea;
    let caminho_ws;
    let datasend_login = {
      data: {
        attributes : {
          usuario_mobile: {
            nome: "vagneradm",//data.username,
            senha: "123"//data.password
          }
        }
      }
    }
    axios.post("https://trcmobile.com.br/login/ws/api_login_alojamento.php", datasend_login)
    .then((r)=> {
      ///console.log("resposta do login:", r.data.data)
      caminho_ws = r.data.data.attributes.caminho_ws;
      //console.log("caminho_ws", caminho_ws)
      let authorized = r.data.data.attributes.OK!=="N";
      //console.log("authorized", authorized);
      if(authorized) {
        let datasend_checklist = {
          data: {
            attributes : {
              usuario_mobile: {
                nome: "vagneradm",
                senha: "123",
                codigo_obra: "29"
              },
              codigo_checklist: ""
            }
          }
        }
        //console.log("datasend_checklist", datasend_checklist);
        axios.post("https://app.trcmobile.com.br/ws/api_checklist_alojamento.php", datasend_checklist)
        .then((r)=> {
          //console.log("r", r);
          fieldsArea = r.data.data.grupo_checklist[0];
          //console.log("resposta dos checklists", fieldsArea)
          if(fieldsArea) {
            WizardStore.update((s) => {
              s.progress = 10;
              s.caminho_ws = caminho_ws;//r.data.data.attributes.caminho_ws
              s.username = "vagneradm";//data.username;
              s.password = "123";//data.password;
              s.fieldsArea = r.data.data.grupo_checklist;
              s.fieldsAlojas = r.data.data.alojamentos;
              //console.log("fieldsAlojas", r.data.data.alojamentos);
            });
            navigation.navigate("SelectObra");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        
      } else {
        console.log("Usuário ou senha errado")
      }
    })
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.getRawState().progress}
        color={MD3Colors.primary60}
      />
      <View style={{ paddingHorizontal: 16 }}>
        
        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              //required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Usuário"
                placeholder="Digite seu nome de usuário"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          {errors.username && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              Campo obrigatório.
            </Text>
          )}
        </View>

        <View style={[styles.formEntry]}>
          <Controller
            control={control}
            rules={{
              //required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Senha"
                placeholder="Digite sua senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                //keyboardType="numeric"
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              Campo obrigatório.
            </Text>
          )}
        </View>

        <Button
          onPress={handleSubmit(onSubmit)}
          mode="outlined"
          style={styles.button}
        >
          ENTRAR
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  formEntry: {
    margin: 8,
  },
  container: {
    flex: 1,
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
});
