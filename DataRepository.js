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
 * @providesModule DataRepository
 * @flow
 * @user jeozey@gmail.com 594485991@qq.com
 */
'use strict';

import React, { 
  AsyncStorage,
} from 'react-native';

function DataRepository() { // Singleton pattern
  if (typeof DataRepository.instance === 'object') {
    return DataRepository.instance;
  }

  DataRepository.instance = this;
}
var BEST_SCORE = 'BEST_SCORE';
var BEST_SCORE_ONLINE = 'BEST_SCORE_ONLINE';
var ALL_SCORES = 'ALL_SCORES';
var TODAY_SCORES = 'TODAY_SCORES';
var USER_NAME = 'USER_NAME';
var SCORE_RANK = 'SCORE_RANK';
var SCORE_OBJID = 'SCORE_OBJID';

DataRepository.prototype._getStorage = function(key: string) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (error, result) => {
      var retDataRepository = JSON.parse(result);
      if (error) {
        console.error(error);
        resolve(null);
      } else {
        resolve(retDataRepository);
      }
    });
  });
};

DataRepository.prototype._saveStorage = function(key: string) {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, (error, result) => {
      var retDataRepository = JSON.parse(result);
      if (error) {
        console.error(error);
        resolve(null);
      } else {
        resolve(retDataRepository);
      }
    });
  });
};


DataRepository.prototype.getBastScore = function() {
  return this._getStorage(BEST_SCORE);
};

DataRepository.prototype.setBestScore = function(bestScore) {
	console.log(JSON.stringify({'bestScore':bestScore}));
  AsyncStorage.setItem(BEST_SCORE, JSON.stringify({'bestScore':bestScore}));
};

DataRepository.prototype.getBastScoreOnLine = function() {
  return this._getStorage(BEST_SCORE_ONLINE);
};

DataRepository.prototype.setBestScoreOnLine = function(bestScoreOnLine) {
	console.log(JSON.stringify({'bestScoreOnLine':bestScoreOnLine}));
  AsyncStorage.setItem(BEST_SCORE_ONLINE, JSON.stringify({'bestScoreOnLine':bestScoreOnLine}));
};

DataRepository.prototype.getScoreObjId = function() {
  return this._getStorage(SCORE_OBJID);
};

DataRepository.prototype.updateScoreObjId = function(objectId) {
	console.log(JSON.stringify({'objectId':objectId}));
  AsyncStorage.setItem(SCORE_OBJID, JSON.stringify({'objectId':objectId}));
};

DataRepository.prototype.getUserName = function() {
  return this._getStorage(USER_NAME);
};

DataRepository.prototype.updateUserName = function(userName) {
	console.log(JSON.stringify({'userName':userName}));
  AsyncStorage.setItem(USER_NAME, JSON.stringify({'userName':userName}));
};

DataRepository.prototype.getAllScores = function() {
  return this._getStorage(TODAY_SCORES);
};

DataRepository.prototype.updateScoreRank = function(scoreRank) {
	console.log(JSON.stringify({'scoreRank':scoreRank}));
  AsyncStorage.setItem(SCORE_RANK, JSON.stringify({'scoreRank':scoreRank}));
};

DataRepository.prototype.getScoreRank = function() {
  return this._getStorage(SCORE_RANK);
};

DataRepository.prototype.updateAllScores = function() {
  return this._getStorage(ALL_SCORES);
};

DataRepository.prototype.getTodayScores = function() {
  return this._getStorage(TODAY_SCORES);
};

DataRepository.prototype.updateTodayScores = function() {
  return this._getStorage(TODAY_SCORES);
};


module.exports = DataRepository;