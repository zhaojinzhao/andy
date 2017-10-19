var ShopCar = {
	title: '',
	// 获取商品列表数据
	getGoods() {
		var sGoods = getCookie('cart');
		if(typeof sGoods === 'undefined') {
			var aGoods = [];
		} else {
			var aGoods = JSON.parse(sGoods);
		}
		return aGoods;
	},
	// 设置商品的数量
	setGoodsNum(type, id, num) {
		var aGoods = this.getGoods();

		aGoods.forEach(function (v) {
			if(v.id === id) {
				switch(type) {
					case 'increment':
						v.num++;
						break;
					case 'decrement':
						v.num--;
						break;
					case 'custom':
						v.num = num;
						break;
				}
			}
		});

		// 写入到cookie中
		setCookie({
			name: 'cart',
			value: JSON.stringify(aGoods),
			expires: 7
		});

		// 重新渲染页面
		this.buildUI();
	},

	// 删除商品
	deleteGoods(deleteIds) {
		var aGoods = this.getGoods();
		for(var i = 0; i < aGoods.length; i++) {
			for(var j = 0; j < deleteIds.length; j++) {
				if(aGoods[i].id === deleteIds[j]) {
					aGoods.splice(i, 1);
				}
			}
		}
		// 写入到cookie中
		setCookie({
			name: 'cart',
			value: JSON.stringify(aGoods),
			expires: 7
		});

		// 重新渲染页面
		this.buildUI();
	},

	// 更改商品的状态
	modifyGoodsStatus(ids, status) {
		var aGoods = this.getGoods();
		for(var i = 0; i < aGoods.length; i++) {
			for(var j = 0; j < ids.length; j++) {
				if(aGoods[i].id === ids[j]) {
					aGoods[i].checked = status;
				}
			}
		}
		// 写入到cookie中
		setCookie({
			name: 'cart',
			value: JSON.stringify(aGoods),
			expires: 7
		});

		// 重新渲染页面
		this.buildUI();
	},
	// 渲染页面
	buildUI() {
		var aGoods = this.getGoods();

		var sHtml = '';

		var totalPrice = 0;
		aGoods.forEach(function (v, k) {
			sHtml += `
				<tr>
					<td>
						<input type="checkbox" class="checked-goods" data-id="${v.id}" `;
			sHtml += v.checked ? 'checked' : '';
			sHtml +=`>
					</td>
					<td>
						<div class="media">
						 	<div class="media-left media-middle">
						    	<a href="javascript:;">
						    		<img class="media-object" src="${v.image}" width ="80">
						    	</a>
							</div>
							<div class="media-body" style="width: 400px;">
								<h4 class="media-heading">${v.title}</h4>
							</div>
						</div>
					</td>
					<td>
						￥${v.price}
					</td>
					<td>
						<div class="input-group">
						    <div class="input-group-addon increment-goods" data-id="${v.id}">+</div>
						    	<input type="text" class="form-control custom-goods" value="${v.num}"  data-id="${v.id}">
						    <div class="input-group-addon decrement-goods" data-id="${v.id}">-</div>
						</div>
					</td>
					<td>
						￥${v.price * v.num}
					</td>
					<td>
						<a href="javascript:;" class="btn btn-danger delete-goods" data-id="${v.id}">删除</a>
					</td>
				</tr>
			`;

			if(v.checked) {
				totalPrice += v.price * v.num;
			}
		});

		// 显示到页面中
		if(!this.title) {
			this.title = $('#shopcar').html();
		}
		$('#shopcar').html(this.title + sHtml);

		$('#totalPrice').html(totalPrice);
	}
};

(function ($) {
	$(function () {
		// 渲染页面
		ShopCar.buildUI();

		// 给增量按钮添加功能
		$('#shopcar').on('click', '.increment-goods', function () {
			var iId = Number($(this).data('id'));

			ShopCar.setGoodsNum('increment', iId);
		});

		$('#shopcar').on('click', '.decrement-goods', function () {
			var iId = Number($(this).data('id'));

			ShopCar.setGoodsNum('decrement', iId);
		});

		$('#shopcar').on('change', '.custom-goods', function () {
			var iId = Number($(this).data('id'));
			
			ShopCar.setGoodsNum('custom', iId, $(this).val());
		});

		$('#shopcar').on('click', '.delete-goods', function () {
			var iId = Number($(this).data('id'));
			
			ShopCar.deleteGoods([iId]);
		});

		$('#shopcar').on('click', '.checked-goods', function () {
			var iId = Number($(this).data('id'));
			ShopCar.modifyGoodsStatus([iId], $(this).prop('checked'));


			// 修改全选按钮的状态
			var bTotalBtn = true;
			var bDisabledBtn = true;
			$('#shopcar .checked-goods').each(function (k ,v) {
				if(v.checked) {
					bDisabledBtn = false;
				} else {
					bTotalBtn = false;
				}
			});
			$('#totalChecked').prop('checked', bTotalBtn);
			$('#deleteChecked').attr('disabled', bDisabledBtn);
		});

		$('#totalChecked').click(function () {
			var ids = [];
			$('#shopcar .checked-goods').each(function (k ,v) {
				ids.push(Number($(v).data('id')));
			});
			ShopCar.modifyGoodsStatus(ids, $(this).prop('checked'));
		});

		$('#deleteChecked').click(function () {
			var ids = [];
			$('#shopcar .checked-goods:checked').each(function (k ,v) {
				ids.push(Number($(v).data('id')));
			});

			ShopCar.deleteGoods(ids);
		});
	});
})(jQuery);