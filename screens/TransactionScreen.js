import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import * as Permissions from "expo-permissions"
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends Component {
  constructor() {
    super()
    this.state = {
      buttonState: "normal",
      hasCameraPerms: null,
      scanned: false,
      scannedBookID: "",
      scannedStudentID: "",
      bookOrSt: ""
    }
  }

  getCameraPerms = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      buttonState: "clicked",
      hasCameraPerms: status === "granted",
      scanned: false,
      bookOrSt: id
    })
  }

  handleBarcodeScanner = async ({ type, data }) => {
    const { bookOrSt } = this.state
    if (bookOrSt === 'bookID') {
      this.setState({
        scannedBookID: data,
        buttonState: "normal",
        scanned: true
      })
    }
    else if (bookOrSt === 'studentID') {
      this.setState({
        scannedStudentID: data,
        buttonState: "normal",
        scanned: true
      })

    }
  }

  render() {
    const { buttonState, hasCameraPerms, scanned, scannedData } = this.state

    if (buttonState === "clicked" && hasCameraPerms === false) {
      return (
        <Text>Permission Denied</Text>
      )
    }

    else if (buttonState === "clicked" && hasCameraPerms === true) {
      return (
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanner}
          style={StyleSheet.absoluteFillObject}></BarCodeScanner>
      )
    }

    else {

      return (
        <View style={styles.container}>
          <View>
            <Image source={require('../assets/booklogo.jpg')} style={{ width: 100, height: 100 }} />
            <Image source={require('../assets/Title.png')} style={{ width: 100, height: 100 }} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput placeholder='bookID' value = {this.state.scannedBookID} style={styles.inputBocks} />
            <TouchableOpacity style={styles.scanButton} onPress={() => { this.getCameraPerms("bookID") }}><Text style={styles.textStyle}>Click to scan</Text></TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput placeholder='studentID' value = {this.state.scannedStudentID} style={styles.inputBocks} />
            <TouchableOpacity style={styles.scanButton} onPress={() => { this.getCameraPerms("studentID") }}><Text style={styles.textStyle}>Click to scan</Text></TouchableOpacity>
          </View>
        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  buttonImage: {
    backgroundColor: "cyan",
    borderRadius: 20,
    width: 70,

  },

  textStyle: {
    textAlign: "center"
  },

  inputBocks: {
    width: 100,
    height: 50,
    borderWidth: 2,
    fontSize: 25
  },

  scanButton: {
    backgroundColor: "cyan",
    width: 50,
    borderWidth: 1
  }
})