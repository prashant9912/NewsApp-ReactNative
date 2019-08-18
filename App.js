import React, { Component, Fragment } from 'react'
import {RefreshControl, Image,ActivityIndicator, Text, StyleSheet, View, ScrollView, SafeAreaView, StatusBar, Button, Vibration } from 'react-native'
import moment from 'moment';

// import console = require('console');


export default class App extends Component {
  DURATION = 500;

  state = {
    loading: false,
    button:true

  };

  a = 10;
  list = <Text>Called</Text>
  li = [1, 3, 4, 5, 6, 7, 9];
  api = "aba172d4d085412593c7d881bdd1e5db"
  uri = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey="
  articles= []
  
  butt = () => {
    // Vibration.vibrate(this.DURATION);

this.setState({
  loading:true,
  button:false
})

  fetch(this.uri+this.api).then(e=>e.json())
  .then(e=>{
    this.articles= e.articles
    console.log(this.articles)
    this.setState({
      loading:false,

    })
  
  })

}

news = (e)=>{
  des= e.description

time = moment(e.publishedAt).fromNow()

return (
  <View style={{ width:"90%", height:150,borderRadius:10,borderColor:"rgba(1,1,1,0.2)",borderWidth:1,marginBottom:20,overflow:"hidden"}}>
  <View style={{position:"absolute",width:"70%",height:"100%",left:0,padding:10}}>
  <Text style={{fontSize:16,fontWeight:"600"}}>{e.title}</Text>
      <Text style={{fontSize:14,fontWeight:"300",maxHeight:50}}>{(des)}</Text>
      <Text style={{fontSize:13,fontWeight:"400",marginTop:10}}>{(time)}</Text>
  </View>
      
      <View style={{position:"absolute",width:"30%",height:"100%",right:0}}>
      <Image
style={{width:"100%", height:"100%"}}
source={{uri: e.urlToImage}}
/>
      </View>
  </View>
)

  
}


  render() {
    return (
      <Fragment><StatusBar barStyle="dark-content" backgroundColor="white" /><SafeAreaView>

        <ScrollView 
         refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this.butt}
          />
        }>

          <View style={{ alignItems: "center", backgroundColor: "" }}>

            <Text style={{ textAlign: "center", fontSize: 40, fontWeight: "bold", paddingTop: 30,  paddingBottom: 30 }}>🗞 News</Text>


           

            {this.state.loading==true?<ActivityIndicator size="large" color="red" />: null    }
            {this.state.button?
            <View style={{ backgroundColor: "#841584", borderRadius: 5, marginTop: 10 }}>
              <Button
                onPress={this.butt}
                title="Click Me"
                color="white"
              />
            </View>
            :null
            }


            {this.articles.map((e)=>{
                  return this.news(e)
            })}



          </View>
          
        </ScrollView>

     

      </SafeAreaView></Fragment>
    )
  }
}

const styles = StyleSheet.create({})
