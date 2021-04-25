import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useState } from "react";
import { Alert, Image, Platform, StyleSheet, Text, View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { SvgFromUri } from "react-native-svg";
import DataTimePicker, { Event } from "@react-native-community/datetimepicker";

import waterdrop from "../assets/waterdrop.png";
import Button from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { format, isBefore } from "date-fns";
import { TouchableOpacity } from "react-native-gesture-handler";
import { loadPlant, PlantProps, savePlant } from "../libs/storage";

interface Params {
  plant: PlantProps;
}

const PlantSave = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == "ios");

  const route = useRoute();
  const navigation = useNavigation();

  const { plant } = route.params as Params;

  const handleChangeTime = (event: Event, dateTime: Date | undefined) => {
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Escolha uma hora no futuro ⏰");
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  };

  const handleDateTimePickerForAndroid = () => {
    setShowDatePicker((oldState) => !oldState);
  };

  const handleSave = async () => {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subtitle:
          "Fique tranquilo que sempre vamos lembrar você de cuidar da sua platinha com muito cuidado.",
        buttonTitle: "Muito obrigado",
        icon: "hug",
        nextScreen: "MyPlants",
      });
    } catch (error) {
      Alert.alert("Não foi possivel salvar. 😢");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>
      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterdrop} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>
        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>
        {showDatePicker && (
          <DataTimePicker
            value={selectedDateTime}
            mode="time"
            display="default"
            onChange={handleChangeTime}
          />
        )}
        {Platform.OS === "android" && (
          <TouchableOpacity
            onPress={handleDateTimePickerForAndroid}
            style={styles.dataTimePickerButton}
          >
            <Text style={styles.dataTimePickerText}>{`Mudar ${format(
              selectedDateTime,
              "HH:mm"
            )}`}</Text>
          </TouchableOpacity>
        )}
        <Button title="Cadastrar planta" onPress={() => handleSave()} />
      </View>
    </View>
  );
};

export default PlantSave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: "relative",
    bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: "justify",
  },
  dataTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  dataTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
  alertLabel: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
});
