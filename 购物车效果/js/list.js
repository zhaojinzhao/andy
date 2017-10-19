(function ($, window) {
	$(function () {
		$('.add-btn').click(function () {
			/*
				商品ID、商品名称、商品价格、图片地址、商品数量（1）、是否选中（true）
			*/

			var oGood = {
				id: Number($(this).data('id')),
				title: $(this).data('title'),
				price: $(this).data('price'),
				image: $(this).data('image'),
				num: 1,
				checked: true
			};


			// 仓库
			var sGoods = getCookie('cart');

			if(typeof sGoods === 'undefined') {
				var aGoods = [];
			} else {
				var aGoods = JSON.parse(sGoods);
			}

			// 如果bBool为true，说明商品没有出现过
			var bBool = aGoods.every(function (v, k) {
				if(v.id === oGood.id) {
					v.num++;
					return false;
				}
				return true;
			});

			if(bBool) {
				aGoods.push(oGood);
			}

			// 写入到cookie中
			setCookie({
				name: 'cart',
				value: JSON.stringify(aGoods),
				expires: 7
			});
		});
	});
})(jQuery, window);