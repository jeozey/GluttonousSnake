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
 * @providesModule MainScreen
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
	Modal,
	TextInput,
	Platform,
	AlertIOS,
	ToastAndroid,
	TouchableOpacity,
	View,
	TouchableHighlight,
	Dimensions,
}
from 'react-native';

var ScoreView = require('./ScoreView');

var TimerMixin = require('react-timer-mixin');
var Animated = require('Animated');
var GameBoard = require('./GameBoard');
var TouchableBounce = require('TouchableBounce');
var DataRepository = require('./DataRepository');

var BOARD_PADDING = 2;
var CELL_MARGIN = 3;
var CELL_SIZE = Dimensions.get('window').width/24-7;

var Button = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },

  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles._button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});


class Cell extends React.Component {
  render() {
    return <View style={styles.cell} />;
  }
}

class Board extends React.Component {
  render() {
    return (
      <View style={styles.board}>
        <View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
        <View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
        <View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
        <View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		 <View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
        <View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
        <View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
        <View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
		<View style={styles.row}><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/><Cell/></View>
        {this.props.children}
      </View>
    );
  }
}

class Tile extends React.Component {
  state: any;
  flg : number;
  static _getPosition(index): number {
    return BOARD_PADDING + (index * (CELL_SIZE + CELL_MARGIN * 2) + CELL_MARGIN);
  }

  constructor(props: {}) {
    super(props);

    var tile = this.props.tile;
    this.flg = 0;
    this.state = {
      opacity: new Animated.Value(0),
      top: Tile._getPosition(tile.toRow()),
      left: Tile._getPosition(tile.toColumn()),
    };
  }


  calculateOffset(): {top: number; left: number; opacity: number} {
    var tile = this.props.tile;

    var offset = {
      top: this.state.top,
      left: this.state.left,
      
    };

  
    return offset;
  }

  render() {
    var tile = this.props.tile;

	
	var s = 'tile' + tile.value;
	if(tile.value==8){
		if(this.flg++%2==0){
			//console.log('here...');
			s = 'tile' + tile.value+'_';
		}
	}
    var tileStyles = [
      styles.tile,
      styles[s],
      this.calculateOffset(),
    ];

	
    var textStyles = [
      styles.value,
      tile.value > 4 && styles.whiteText,     
    ];

    return (
      <View style={tileStyles}>
        <Text style={textStyles}></Text>
      </View>
    );
  }
}

var repository = new DataRepository();
class GameEndOverlay extends React.Component {
  render() {
    var board = this.props.board;

    if (!board.hasWon() && !board.hasLost()) {
      return <View/>;
    }

    var message = board.hasWon() ?
      '好样的!' : '游戏结束';
	

    return (
      <View style={styles.overlay}>
        <Text style={styles.overlayMessage}>{message}</Text>
        <TouchableBounce onPress={this.props.onRestart} style={styles.tryAgain}>
          <Text style={styles.tryAgainText}>再试一次</Text>
        </TouchableBounce>
		<TouchableBounce onPress={this.props.onPostScore} style={styles.tryAgain}>
          <Text style={styles.tryAgainText}>上传分数</Text>
        </TouchableBounce>
      </View>
    );
  }
}


class MainScreen extends React.Component {
  direction : number;
  userName : char;
  objectId : char;
  startX : number;
  startY : number;
  state : any;
  flg : boolean;
  myData : DataRepository;

  checkMoving() {

  	console.log('checkMoving...this.direction:' + this.direction);
  	if (this.state.board.hasLost() || this.state.board.hasWon()) {
  		console.log('您已经输了');

  		console.log('board.score:' + this.state.board.score);
  		console.log('this.state.bestScore:' + this.state.bestScore);
  		if (this.state.board.score > this.state.bestScore) {
  			console.log('bool:' + this.state.board.score > this.state.bestScore);
  			repository.setBestScore(this.state.board.score);
  			this.setState({
  				bestScore : this.state.board.score
  			});

  		}
  		this.direction = -1;
  		return;
  	}

  	//direction left 0|right 2|top 1|down 3
  	if (this.direction != -1) {
  		this.setState({
  			board : this.state.board.move(this.direction)
  		});
		//this.timer && clearTimeout(this.timer);
  	}else{
		console.log('here.....');
		//this.timer = setTimeout(() => {this.setState({msg : ''});},500);		
	}

  }

  constructor(props) {
  	super(props);
  	console.log('constructor...:' + this.props.pnav);
  	this.state = {
  		board : new GameBoard(),
  		count : 1,
  		msg : '',
  		bestScore : 0,
  		animationType : 'none',
  		modalVisible : false,
  		transparent : true,
  	};

  	this.direction = -1;
  	this.startX = 0;
  	this.startY = 0;
  	this.flg = true;
  	this.currentScore = 0;

  }

  fetchData() {

  	repository.getBastScore()
  	.then((result) => {
  		if (result) {
  			console.log('result.bestScore:' + result.bestScore);
			if(result.bestScore===0){
				this._showMsg('上下左右滑动控制,黑色为蛇,红色为食');
			}
  			this.setState({
  				bestScore : result.bestScore
  			});
  		}
  	})
  	.catch ((error) => {
  		console.error(error);
  	})
  		.done();

  	repository.getUserName()
  	.then((result) => {
  		if (result) {
  			console.log('result.userName:' + result.userName);
  			this.userName = result.userName;
  		}
  	})
  	.catch ((error) => {
  		console.error(error);
  	})
  		.done();

  	repository.getScoreObjId()
  	.then((result) => {
  		if (result) {
  			console.log('result.objectId:' + result.objectId);
  			this.objectId = result.objectId;
  		}
  	})
  	.catch ((error) => {
  		console.error(error);
  	})
  		.done();

  }

  componentDidMount() {
  	this.fetchData();
  }

  componentDidUpdate() {
  	console.log('componentDidUpdate');
  	setTimeout(
  		() => {
  		this.checkMoving();

  	},
  		200);
  }

  restartGame() {
  	console.log('restartGame');
  	this.flg = true;
  	this.setState({
  		board : new GameBoard()
  	});
  	this.direction = -1;
  }


  gotoScoresView() {
  	console.log('constructor...:' + this.props.pnav);
  	const pnav = this.props.pnav;
  	//const { pnav } = this.props;
  	//或者写成 const pnav = this.props.pnav;
  	//为什么这里可以取得 props.pnav?请看上文:
  	//<Component {...route.params} pnav={pnav} />
  	//这里传递了pnav作为props
  	if (pnav) {
  		pnav.push({
  			name : 'ScoreView',
  			component : ScoreView,
  			pnav : pnav,
  			params : {
  				user : this.userName,
  			}
  		})
  	}
  }
  checkUserName() {
  	this.setState({
  		modalVisible : true
  	});
  }
  postUserScore() {
  	var url = "https://api.leancloud.cn/1.1/classes/Scores";
  	console.log(url);
  	fetch(url, {
  		method : 'POST',
  		headers : {
  			'X-LC-Id' : 'FALjU3neKxoOTOBtDPwoeKw4-gzGzoHsz',
  			'X-LC-Key' : 'sQaOK9Mc8YwJKLNLwuetvTM0',
  			'Content-Type' : 'application/json',
  		},
  		body : JSON.stringify({
  			user : this.userName,
  			score : this.state.bestScore,
  		})
  	}).then((response) => response.json())
  	.then(
  		(responseData) => {
  		console.log(responseData);
  		var tmp = responseData.results;
  		if (responseData) {
  			this.objectId = responseData.objectId;
  			console.log('this.objectId:' + this.objectId);
  			repository.updateScoreObjId(this.objectId);
  			repository.setBestScoreOnLine(this.state.bestScore);
  			this._showMsg('上传排名成功');
			this.gotoScoresView();
  		} else {
  			this._showMsg('很抱歉,上传失败');
  		}
  		this.setState({
  			modalVisible : false
  		});

  	}).done();
  }
  _showMsg(msg){
	  if(Platform.OS === 'android'){
		  ToastAndroid.show(msg, ToastAndroid.SHORT);
	  }else{
		  AlertIOS.alert(msg);
	  }
  }
  postScore() {
  	if (!this.userName) {
  		this.checkUserName();
  		return;
  	}
  	if (!this.objectId) {
  		this.postUserScore();
  	} else {
  		var where = encodeURI("cql=update Scores set score=" + this.state.bestScore + " where objectId='" + this.objectId + "'");

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
  			if (responseData && responseData.results.length > 0) {
  				this._showMsg('更新分数成功');
  				repository.setBestScoreOnLine(this.state.bestScore);
				this.gotoScoresView();
  				this.setState({
  					modalVisible : false
  				});
  			}
  		}).done();

  	}

  }
  handleTouchStart(event : Object) {
  	console.log('touch start');
  	if (this.state.board.hasWon()) {
  		return;
  	}

  	this.startX = event.nativeEvent.pageX;
  	this.startY = event.nativeEvent.pageY;
  }

  handleTouchEnd(event : Object) {
  	console.log('touch end');
  	if (this.state.board.hasWon()) {
  		return;
  	}

  	var deltaX = event.nativeEvent.pageX - this.startX;
  	var deltaY = event.nativeEvent.pageY - this.startY;

  	var oldDirection = this.direction;

  	if (Math.abs(deltaX) > 1 * Math.abs(deltaY) && Math.abs(deltaX) > 10) {
  		this.direction = deltaX > 0 ? 2 : 0;
  	} else if (Math.abs(deltaY) > 1 * Math.abs(deltaX) && Math.abs(deltaY) > 10) {
  		this.direction = deltaY > 0 ? 3 : 1;
  	}

  	if (oldDirection == 0 || oldDirection == 2) {
  		if (this.direction == 0 || this.direction == 2) {
  			this.direction = oldDirection;
  		}
  	} else if (oldDirection == 1 || oldDirection == 3) {
  		if (this.direction == 1 || this.direction == 3) {
  			this.direction = oldDirection;
  		}
  	}
  	console.log('touch end direction:' + this.direction);

  	if (this.flg && this.direction != -1) {
  		this.flg = false;
  		this.setState({
  			board : this.state.board.move(this.direction)
  		});
  	}

  }
  _setModalVisible(visible) {
  	this.setState({
  		modalVisible : visible
  	});
  }

  _setAnimationType(type) {
  	this.setState({
  		animationType : type
  	});
  }

  _toggleTransparent() {
  	this.setState({
  		transparent : !this.state.transparent
  	});
  }

  _setUserName() {
  	if (this.userName) {
  		var user = this.userName.trim();
  		console.log('user:' + user);
  		if (user.length == 0 || user.length > 8) {
  			this._showMsg('大名长度不正确');
  			return;
  		} else {

  			var where = encodeURI("{\"user\":\"" + user + "\"}");
  			var url = "https://api.leancloud.cn/1.1/classes/Scores?where=" + where;
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
  				if (responseData.results.length > 0) {
  					this._showMsg('大名已被占用,请换大名!');
					this.userName = "";
  				} else {
  					this.userName = user;
  					repository.updateUserName(this.userName);
  					this.postScore();
  				}

  			}).done();

  		}
  	}
  }

  render() {
	//console.log('render...');
	//this.state.board.tiles.forEach(function (tile) {
	//	if(tile.value>0)
	//	console.log('ll:'+tile.value+'-'+tile.row+'-'+tile.column);
	//});
    var tiles = this.state.board.tiles
      .filter((tile) => tile.value)
      .map((tile) => <Tile ref={tile.id} key={tile.id} tile={tile} />);
	  
	 var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20,width:200}
      : null;
    var activeButtonStyle = {
      backgroundColor: '#ddd'
    };


    return (
	 
	 <View
        style={styles.container}>
			<Modal
			  animationType={this.state.animationType}
			  transparent={this.state.transparent}
			  visible={this.state.modalVisible}
			  onRequestClose={() => {this._setModalVisible(false)}}
			  >
			  <View style={[styles.setNameView, modalBackgroundStyle]}>
				<View style={[styles.innerContainer, innerContainerTransparentStyle]}>
				  <Text style={{fontSize:16}}>请输入您的大名:</Text>
					<TextInput autoFocus={true} maxLength={8}
					style={{width:150,height:50, borderColor: 'gray', borderWidth: 1}}
					onChangeText={(userName) => this.userName = userName}
					
				  />
				  <View style={{flexDirection:'row'}}>
				  <Button
					onPress={this._setUserName.bind(this, false)}
					>
					确定
				  </Button>
				  <Button
					onPress={this._setModalVisible.bind(this, false)}
					>
					取消
				  </Button>
				  </View>
				</View>
			  </View>
			</Modal>
		
		  <View style={{flexDirection: 'row',marginTop:20,justifyContent : 'center',alignItems : 'center',}}>
		      <View style={styles.logo}>
		      <Text style={{ color: '#ffffff',fontSize: 25,}}>贪</Text>
			  </View>
			    <View style={{flexDirection: 'column'}}>
					<View style={styles.fenshu}>
						<Text style={styles.scoreView}>当前分数</Text>
						<Text style={{ color: '#ffffff',fontSize: 20}}>{this.state.board.score}</Text>
					</View>
					<TouchableOpacity onPress={this.gotoScoresView.bind(this)}>
					  <View style={styles.buttonView}>
						<Text style={styles.button_}>排行榜</Text>
					  </View>
					</TouchableOpacity>
			    </View>
				<View style={{flexDirection: 'column'}}>
				    <View style={styles.fenshu}>
						<Text style={styles.scoreView}>最高分数</Text>
						<Text style={{ color: '#ffffff',fontSize: 20,}}>{this.state.bestScore}</Text>
					</View>
					<TouchableOpacity onPress={this.restartGame.bind(this)}>
					  <View style={styles.buttonView}>
						<Text style={styles.button_}>新游戏</Text>
					  </View>
					</TouchableOpacity>
			    </View>
		  </View>
		  <View
			style={styles.container}
			onTouchStart={(event) => this.handleTouchStart(event)}
			onTouchEnd={(event) => this.handleTouchEnd(event)}>
			<Board>
			  {tiles}
			</Board>
			
			
		  </View>
		  <GameEndOverlay board={this.state.board} bestScore={this.state.bestScore} onRestart={() => this.restartGame()} onPostScore={()=>this.postScore()} />
	  </View>
    );
  }
}

var styles = StyleSheet.create({
		container : {
			flex : 1,
			justifyContent : 'center',
			alignItems : 'center',
		},
		board : {
			padding : BOARD_PADDING,
			backgroundColor : '#BCBEB8',
			borderRadius : 5,
		},
		fenshu : {
			flexDirection : 'column',
			backgroundColor : '#8671A9', 
			borderRadius : 5,
			padding : 5,
			margin : 5,
			justifyContent : 'center',
			alignItems : 'center',
		},
		scoreView:{
			color: '#ffffff',fontSize: 20
		},
		cell : {
			width : CELL_SIZE,
			height : CELL_SIZE,
			borderRadius : 5,
			backgroundColor : '#DFECE5',
			margin : CELL_MARGIN,
		},
		row : {
			flexDirection : 'row',
		},
		tile : {
			position : 'absolute',
			width : CELL_SIZE,
			height : CELL_SIZE,
			backgroundColor : '#ddccbb',
			borderRadius : 5,
			flex : 1,
			justifyContent : 'center',
			alignItems : 'center',
		},
		value : {
			fontSize : 24,
			color : '#776666',
			fontFamily : 'Verdana',
			fontWeight : '500',
		},
		innerContainer : {
			borderRadius : 10,
			alignItems : 'center',
		},
		logo : {
			backgroundColor: '#1EA690',
			borderRadius: 40,
			width: 80,
			height: 80,
			justifyContent : 'center',
			alignItems : 'center',
		},
		button_ : {
			color : '#ffffff',
			fontSize : 20,
			fontWeight : '500'
		},
		buttonView : {
			backgroundColor : '#8D7633', 
			marginTop : 20,
			borderRadius : 5,
			margin : 2,
			justifyContent : 'center',
			alignItems : 'center',
		},
		
		
		setNameView : {
			position : 'absolute',
			top : 0,
			bottom : 0,
			left : 0,
			right : 0,
			backgroundColor : 'rgba(221, 221, 221, 0.5)',
			flex : 1,
			flexDirection : 'column',
			paddingTop:50,
			alignItems : 'center',
		},
		overlay : {
			position : 'absolute',
			top : 0,
			bottom : 0,
			left : 0,
			right : 0,
			backgroundColor : 'rgba(221, 221, 221, 0.5)',
			flex : 1,
			flexDirection : 'column',
			justifyContent : 'center',
			alignItems : 'center',
		},
		overlayMessage : {
			color:'#443D33',
			fontSize : 40,
			marginBottom : 20,
		},
		tryAgain : {
			backgroundColor : '#81B2D2',   
			borderRadius : 5,
			margin : 10,
			padding : 10
		},
		tryAgainText : {
			color : '#ffffff',
			fontSize : 20,
			marginTop : 5,
			fontWeight : '300',
		},
		
		tile2 : {
			backgroundColor : '#143E82',
		},
		tile4 : {
			backgroundColor : '#438EAE',
		},
		tile8 : {
			backgroundColor : '#ff0000',
		},
		tile8_ : {
			backgroundColor : '#BF553F',
		},
		_button : {
			borderRadius : 5,
			flex : 1,
			height : 44,
			alignSelf : 'stretch',
			justifyContent : 'center',
			overflow : 'hidden',
		},
		buttonText : {
			fontSize : 18,
			margin : 5,
			textAlign : 'center',
		},
		modalButton : {
			marginTop : 10,
		},

	});

module.exports = MainScreen;
