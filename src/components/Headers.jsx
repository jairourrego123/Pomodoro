import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];
export default function Header({ currentTime, setCurrentTime, setTime }) {
  function handlesPress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  }

  return (
    <View style={styles.contenedor}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            handlesPress(index);
          }}
          style={[styles.itemStyle,currentTime !==index && {borderColor:"transparent"},]}
        >
          <Text style={{fontWeight:"bold"}}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: "row", // se acomode en una fila 
  },
  itemStyle: {
    width: "33%",
    borderWidth: 3,
    alignItems:"center",
    padding: 5,
    borderColor: "white",
    borderRadius:10,
    marginVertical:20,
  },
});
