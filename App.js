import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import Header from "./src/components/Headers";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";
const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currenTime, setCurrentTime] = useState("PROMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);
  console.log(currenTime);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval= setInterval(()=>{
        setTime(time-1);
      },0.01)
    } else {
      clearInterval(interval);
    }
    if(time===0){
      setIsActive(false);
      setWorking((prev)=>!prev);
      setTime(isWorking?300:1500)
    }
    return () => clearInterval(interval)
  }, [isActive,time]);

  function handlesStartStop() {
    playSound();
    setIsActive(!isActive);
  }
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/burbuja.mp3")
    );
    await sound.playAsync();
  }
  return (
    <View style={[styles.container, { backgroundColor: colors[currenTime] }]}>
      <Text style={styles.text}>Pomodoro</Text>

      <Header
        currentTime={currenTime}
        setCurrentTime={setCurrentTime}
        setTime={setTime}
      />
      <Timer time={time} />

      <TouchableOpacity onPress={handlesStartStop} style={styles.button}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {isActive ? "STOP" : "START"}
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupe todo el contenido de la pantalla
    paddingTop: Platform.OS === "android" && 30,
    paddingHorizontal: 15,
  },

  text: {
    fontSize: 32,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#333333",
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
    alignItems: "center",
  },
});
