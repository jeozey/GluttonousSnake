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
 * @providesModule MyLink
 * @flow
 * @user jeozey@gmail.com 594485991@qq.com
 */
'use strict';

function linkNode(_value) {
	/// <summary>
	/// 链表类的节点类
	/// </summary>

	this.Value = _value;
	this.next = null;
}

var MyLink = function () {
	/// <summary>
	/// 创建一个链表类
	/// </summary>
	this.root = new linkNode(null); //root永远是个空节点
	this.end = this.root;
}
MyLink.prototype = {
	count : 0,

	getHead : function () {
		return this.root.next;
	},
	addFirst : function (_value) {
		console.log('addFirst:' + _value.r + '@' + _value.c);
		/// <summary>
		/// 往链表的头部中加入一个节点
		/// </summary>
		/// <param name="_value" type="Object">
		/// value的值
		/// </param>
		/// <returns type="Object">
		/// 返回新增加的value的值
		/// </returns>

		var newNode = new linkNode(_value);

		var node = null;
		var i = this.root;
		while (Boolean(i = i.next)) {

			node = i;
			if (node && node.Value && node.Value.c === newNode.Value.c && node.Value.r === newNode.Value.r) {
				return false;
			}

		}

		var firstNode = this.root.next;
		this.root.next = newNode;
		if (firstNode !== null) {
			newNode.next = firstNode;
		}

		if (this.count == 0) {
			this.end = newNode;
		}
		this.count++;
		return true;
	},
	addLast : function (_value) {
		/// <summary>
		/// 往链表的尾部中加入一个节点
		/// </summary>
		/// <param name="_value" type="Object">
		/// value的值
		/// </param>
		/// <returns type="Object">
		/// 返回新增加的value的值
		/// </returns>

		var node = new linkNode(_value);
		if (this.count == 0)
			this.root.next = node;
		else
			this.end.next = node;
		this.end = node;
		this.count++;
		return _value;
	},
	removeLast : function () {
		/// <summary>
		/// 往链表的尾部中加入一个节点
		/// </summary>

		/// <param name="_value" type="Object">
		/// value的值
		/// </param>

		var i = this.root;
		var node = null;
		while (Boolean(i = i.next)) {
			if (i.next == this.end) {
				node = i;
				break;
			}
		}

		this.end = node;
		if (i)
			i.next = null;

		this.count--;
		return;
	}
};

module.exports = MyLink;
