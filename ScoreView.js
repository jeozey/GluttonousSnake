/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule ScoreView
 * @flow
 * @user jeozey@gmail.com 594485991@qq.com
 */
'use strict';
import React, {
	Component
}
from 'react';
import {
	StyleSheet,
	Text,
	AlertIOS,
	TouchableOpacity,
	ScrollView,
	View,
}
from 'react-native';

var DataRepository = require('./DataRepository');
var repository = new DataRepository();
class ScoreView extends React.Component {
	bestScore : number;
	type : number;
	constructor(props) {
		super(props);

		this.state = {
			scoreDatas : [],
			scoreRank : -1,
			loading : true
		};
		this.type = 1;
		this.bestScoreOnLine = -1;
	}
	
	getUserScore(){
		repository.getBastScoreOnLine()
		.then((result) => {
			if (result) {
				console.log('result.bestScoreOnLine:' + result.bestScoreOnLine);
				this.bestScoreOnLine = result.bestScoreOnLine;
			}
		})
		.catch ((error) => {
			console.error(error);
		})
			.done();
			
			
			var user = this.props.user;
		console.log('user:' + user);
		//AlertIOS.alert(user);
		if (user) {
			/*
					var url = "https://api.leancloud.cn/1.1/classes/Scores?limit=1";

			var where = encodeURI('{"user":"'+user+'"}');
			url = url + "&where=" + where;

		console.log(url);
		fetch(url, {
			method : 'GET',
			headers : {
				'X-LC-Id' : 'FALjU3neKxoOTOBtDPwoeKw4-gzGzoHsz',
				'X-LC-Key' : 'sQaOK9Mc8YwJKLNLwuetvTM0',
				'Content-Type' : 'application/json',
			}
		}).then((response) => response.json())
		.then(
			(responseData) => {
			console.log(responseData);
			var tmp = responseData.results;
			this.setState({
							scoreRank : tmp.length
						});
			this.setState({
				scoreDatas : tmp,
				loading : false
			});
			}).done();
			*/
			
			var where = "cql=select score from Scores where user='" + user + "' limit 1";

			var url = "https://api.leancloud.cn/1.1/cloudQuery?" + where;

			console.log(url);
			fetch(url, {
				method : 'GET',
				headers : {
					'X-LC-Id' : 'FALjU3neKxoOTOBtDPwoeKw4-gzGzoHsz',
					'X-LC-Key' : 'sQaOK9Mc8YwJKLNLwuetvTM0',

				}
			}).then((response) => response.json())
			.then(
				(responseData) => {
				console.log(responseData);
				if (responseData.results.length == 1) {
					var score = responseData.results[0].score;
					console.log('score:' + score);
					
					let where = encodeURI("cql=select count(*) from Scores where score>" + score);

					let url = "https://api.leancloud.cn/1.1/cloudQuery?" + where;
					fetch(url, {
						method : 'GET',
						headers : {
							'X-LC-Id' : 'FALjU3neKxoOTOBtDPwoeKw4-gzGzoHsz',
							'X-LC-Key' : 'sQaOK9Mc8YwJKLNLwuetvTM0',

						}
					}).then((response) => response.json())
					.then(
						(responseData) => {
						console.log(responseData);
						repository.updateScoreRank(responseData.count + 1);
						this.setState({
							scoreRank : responseData.count + 1
						});

					}).done();
				}

			}).done();
		}
	}

	getDataFromServer(type) {
		

		var url = "https://api.leancloud.cn/1.1/classes/Scores?limit=10&order=-score";
		if (type == 2) {
			var d = new Date();
			var d0 = (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + (d.getDate());
			var d1 = (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + (d.getDate() + 1);
			var where = encodeURI('{"createdAt":{"$gte":{"__type":"Date","iso":"' + d0 + 'T00:00:00.000Z"},"$lt":{"__type":"Date","iso":"' + d0 + 'T00:00:00.000Z"}}}');
			url = url + "&where=" + where;
		}
		console.log(url);
		fetch(url, {
			method : 'GET',
			headers : {
				'X-LC-Id' : 'FALjU3neKxoOTOBtDPwoeKw4-gzGzoHsz',
				'X-LC-Key' : 'sQaOK9Mc8YwJKLNLwuetvTM0',
				'Content-Type' : 'application/json',
			}
		}).then((response) => response.json())
		.then(
			(responseData) => {
			console.log(responseData);
			var tmp = responseData.results;
			this.setState({
				scoreDatas : tmp,
				loading : false
			});
			//today
			if (type == 1) {
				repository.updateTodayScores(JSON.stringify(responseData));
			}

		}).done();

		
		
	}
	back() {
		this.props.pnav.pop();
	}
	fetchData(type) {
		this.getUserScore();
		console.log('fetchData:' + type);
		repository.getTodayScores()
		.then((data) => {
			if (data) {
				console.log('result.getTodayScores:' + data.results);
				this.setState({
					scoreDatas : data.results
				});
			} else {
				this.getDataFromServer(type);
			}
		})
		.catch ((error) => {
			console.error(error);
			this.getDataFromServer(type);
		})
			.done();

	}

	componentDidMount() {
		this.fetchData(this.type);
	}
	
render() {
	  var i = 1;

	  var content = <View style={{ justifyContent: 'center',
      alignItems: 'center',marginTop:100}}><Text>加载中...</Text></View>
	  if(!this.state.loading){
		  content = <View style={{flex:1}}>
                    <ScrollView style={styles.lists}>
									<View style={{flexDirection: 'row',marginTop:20,marginBottom:10,borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth,marginLeft:8}}>
										<Text style={{fontSize:16,position: 'relative', left: 5, color:'#AE7D52'}}>排名</Text>
										<Text style={{fontSize:16,position: 'relative', left: 80, color:'#AE7D52'}}>姓名</Text>
										<Text style={{fontSize:16,position: 'absolute', right: 10,  color:'#AE7D52'}}>分数</Text>  
									</View>
                        {
							
                            this.state.scoreDatas.map((data)=>{
                                return (
                                    <View key={data.objectId} style={{flexDirection: 'row',marginTop:10,marginBottom:10,borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth,marginLeft:8}}>
										<Text style={{fontSize:16,position: 'relative', left: 5, }}>{i++}</Text>
										<Text style={{fontSize:16,position: 'relative', left: 100,}}>{data.user}</Text>
										<Text style={{fontSize:16,position: 'absolute', right: 10,}}>{data.score}</Text>
									</View>
                                );
                            })
                        }
                        <View style={{height:20}}/>
                    </ScrollView>
                </View>
	  }
	  
	  var myScoreView = <View/>;
	  
		  myScoreView = <Text>您的最高得分:{this.bestScoreOnLine}   当前排第 {this.state.scoreRank} 名</Text>;
	  
	  return (
	 
	 <View
        style={styles.container}>
		  <View style={{flexDirection: 'column',marginTop:5,borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth,marginLeft:8}}>
			    <View style={{flexDirection: 'row',}}>					
					<TouchableOpacity style={{}}>
					  <View style={styles.checked}>
						<Text style={styles.button_}>总排行</Text>
					  </View>
					</TouchableOpacity>		    			   
					
					
					<TouchableOpacity onPress={this.back.bind(this)} style={{position: 'absolute', right: 10}}>
					  <View style={styles.buttonView}>
						<Text style={styles.button_}>完成</Text>
					  </View>
					</TouchableOpacity>
			    </View>
				{myScoreView}
		  </View>
		  {content}
		  
	  </View>
    );
  
}}


var styles = StyleSheet.create({
		container : {
			flex : 1,
			backgroundColor : '#ffffff',
		},
		checked : {
			backgroundColor : '#20A089',
			marginTop : 20,
			borderRadius : 5,
			padding : 5,
			margin : 2,
			justifyContent : 'center',
			alignItems : 'center',
		},
		logo : {
			backgroundColor : '#8f7761',
			borderRadius : 5,

			justifyContent : 'center',
			alignItems : 'center',
		},
		button_ : {
			color : '#ffffff',
			fontSize : 20,
			fontWeight : '500'
		},
		buttonView : {
			backgroundColor : '#887761',
			marginTop : 20,
			borderRadius : 5,
			padding : 5,
			margin : 2,
			justifyContent : 'center',
			alignItems : 'center',
		},
		fenshu : {
			flexDirection : 'column',
			backgroundColor : '#88f761',
			borderRadius : 5,
			padding : 5,
			margin : 5,
			justifyContent : 'center',
			alignItems : 'center',
		},
		lists : {
			marginTop : 0,
		},

	});

module.exports = ScoreView;