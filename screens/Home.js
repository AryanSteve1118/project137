import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],      
      url: " http://3ed9-2405-201-3014-f085-a061-16d2-3e22-2c12.ngrok.io",
    };
  }

  componentDidMount() {
    this.getPlanets();
    // console.log(this.state.listData);
  }

  getPlanets = () => {
    const { url } = this.state;
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        var r = response.data.data;
        console.log("in resp " + r);
        return this.setState({
          listData: r,
        });
      })
      .catch((error) => {
        Alert.alert(error.message, "error");
      });
  };

  renderItem = ({ item, index }) => {
    // return(     
    //     <Text>{item.name}</Text>
    // )
    <ListItem
     key={index}
     title={`Planet : ${item.name}`}
    //   title={item.name}
       subtitle={`Distance from earth : ${item.distance_from_earth}`}
     titleStyle={styles.title}
      containerStyle={styles.listContainer}
      bottomDivider
    //   chevron
      onPress={() =>
        this.props.navigation.navigate("Details", { planet_name: item.name })
      }
    />
};

  keyExtractor = (item, index) => index.toString();

  render() {
    const { listData } = this.state;

    if (listData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>Planets World</Text>
        </View>
        <View style={styles.lowerContainer}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.listData}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc988",
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#132743",
  },
  lowerContainer: {
    flex: 0.9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainerText: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d7385e",
  },
  listContainer: {
    backgroundColor: "#eeecda",
  },
});
