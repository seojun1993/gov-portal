jQuery(function($){
	// PC / Mobile 체크
/*		var Navegador_ = (window.navigator.userAgent || window.navigator.vendor || window.opera),
	 	Firfx = /Firefox/i.test(Navegador_),
	 	Mobile_ = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(Navegador_),
	 	FirfoxMobile = (Firfx && Mobile_);

	 	if (Mobile_ || FirfoxMobile) {
	 		console.log('MOBILE');
	 	}else{
	 		console.log('PC');
	 	}
	*/
	var filter = "win16|win32|win64|mac|macintel"; 
	var isPC = "";
	if ( navigator.platform ) { 
		if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) { 
			isPC="mo";
			}
		else {
			isPC="pc";
		}
	}

	window.onload = response_setting;
	window.onresize = response_setting;
	
	
	$(document).ready(function () {
		$('.menu-trigger').on('click', function (e) {
			e.preventDefault();
	
			$(this).toggleClass('active-menu');
			$('.top_menu_box').animate({
				width: 'toggle'
			});
	
			$('.top_menu_warp2').toggleClass('top_menu_warp2-mobile');
			$('body').toggleClass('no_scroll');
		});
	
		$('.btn-popup').click(function () {
			var $href = $(this).attr('href');
			layer_popup($href);
		});
		
		$('.btn_multi_toggle').on('click', function(){
			$(this).next('.multi_toggle_cont').toggle();
			$(this).text($(this).text() == '열기 ∨' ? '닫기 ∧' : '열기 ∨');
			$(this).attr('title', $(this).attr('title') == '열기' ? '닫기' : '열기');
		});

		$(".site_name a").on('click', function () {
			if ($('.site_name > .tab_go_site').length > 0) {
				$('.site_name > .tab_go_site').remove();
			} else {
				$('.site_name').append($('.tab_go_site').wrap('<div/>').parent().html());
			}

		});

	});
	
	(function ($) {
		var $fileBox = null;
		$(function () {
			init();
		})

		function init() {
			$fileBox = $('.input-file');
			fileLoad();
		}

		function fileLoad() {
			$.each($fileBox, function (idx) {
				var $this = $fileBox.eq(idx),
					$btnUpload = $this.find('[type="file"]'),
					$label = $this.find('.file-label');

				$btnUpload.change( function () {
					var $target = $(this),
						fileName = $target.val(),
						$fileText = $target.siblings('.file-name');
					$fileText.val(fileName);
				})

				$btnUpload.focusin(function (e) {
					e.type == 'focusin' ?
						$label.addClass('file-focus') : $label.removeClass('flie-focus');
				})
				
					$btnUpload.focusout(function (e) {
					e.type == 'focusin' ?
						$label.addClass('file-focus') : $label.removeClass('flie-focus');
				})
			})
		}
	})(jQuery);
	
	
	(function ($) {
		$.each(['show', 'hide', 'fadeOut', 'fadeIn'], function (i, ev) {
			var el = $.fn[ev];
			$.fn[ev] = function () {
				var result = el.apply(this, arguments);
				result.promise().done(function () {
					this.trigger(ev, [result]);
				})
				return result;
			};
		});
	})(jQuery);
	
	function response_setting() {
		if ($(window).width() > 720) { 
			$('.top_logo').attr('src', '/next/images/top_logo.png');
			$('.top_menu_warp .top_menu_util').insertAfter($('.top_menu_warp .tab_go_site:first'));
			$(' .top_menu_sns').insertAfter($('.top_menu_warp .top_menu_util:first'));
	
			$(' .top_menu_sub_bg').insertAfter($('#top_menu:first'));
	
	
			$('.footer_go_site_menu').insertAfter($('.footer_scroll_box:first'));
			$('.footer_mark_box').insertAfter($('.footer_text_box:first'));
	
			$('.top_menu_box').show();
			$('.site_name > .tab_go_site').remove();
		} else {
			$(".btn_top_sub_menu > a").on('click', function (e) {
				e.preventDefault();
			});
			
			$('.top_logo').attr('src', '/next/images/mobile/top_logo.png');
			$('.top_menu_warp .tab_go_site').insertAfter($('.top_menu_warp .top_menu_util:first'));
			$('.top_menu_warp .top_menu_sns').insertAfter($('.top_menu_warp2:first'));
	
	
			$(' .top_menu_sub_bg').insertAfter($('.top_search_box:first'));
	
			$(' .footer_scroll_box').insertAfter($('.footer_go_site_menu:first'));
			$(' .footer_mark_box').insertAfter($('address:first'));
	
			$('.top_menu_box').hide();
		}
		/*if(isPc=="pc"){}
		else {
			$(".btn_top_sub_menu > a").on('click', function (e) {
				e.preventDefault();
			});
		}*/
	
		//if (now_page == "") {
			//console.log('메인');
		//}
	}
	
	
	function layer_popup(el) {
		var $el = $(el);
		var isDim = $el.prev().hasClass('dimBg');
	
		//console.log($el);
	
		isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();
		$('body').css('overflow', 'hidden');
		$('.dim-layer').css('overflow', 'scroll');
	
		var $elWidth = ~~($el.outerWidth()),
			$elHeight = ~~($el.outerHeight()),
			docWidth = $(document).width(),
			docHeight = $(document).height();
	
		if ($(window).width() > 720) {
			if ($elHeight < docHeight || $elWidth < docWidth) {
				$el.css({
					marginTop: -$elHeight / 2,
					marginLeft: -$elWidth / 2
				})
			} else {
				$el.css({
					top: 0,
					left: 0
				});
			}
		}
	
		$el.find('.btn-layerClose').click(function () {
			isDim ? $('.dim-layer').fadeOut() : $el.fadeOut();
			$('body').css('overflow', 'auto');
			$('.dim-layer').css('overflow', 'none');
			return false;
		});
	
		$('.layer .dimBg').click(function () {
			$('.dim-layer').fadeOut();
			return false;
		});
	
	}
	
	
});// end jQuery

//페이지 이동
function doPage(pageUrl){
	var checkObj = false;
	var divListObjName = "";
	var divPagingObjName = "";
	//alert(pageUrl);
	
    // 업무안내·자료 > 기록관리 자료실 > 표준·지침·매뉴얼> 공공표준인경우는 예외
    // 폐지된 공공표준과 원내표준은 별도 처리
    
    if(pageUrl.indexOf("standardCondition.do")>= 0 && pageUrl.indexOf("glSeCd=05") >= 0) {
    	checkObj = true;
    	divListObjName   = "#divDataList";
    	divPagingObjName = "#divDataListPaging";
    }
 	else if(pageUrl.indexOf("standardCondition05.do")>= 0) {
 		checkObj = true;
 		if(pageUrl.indexOf("gl_se_cd=05") > 0) {
 			divListObjName   = "#divDataList05";
    		divPagingObjName = "#divDataList05Paging";
 		} else {
 			divListObjName   = "#divDataList06";
    		divPagingObjName = "#divDataList06Paging";
 		}
 	}
 	else if(pageUrl.indexOf("movieList.do")> 0) {
 		location.href= pageUrl;
 		return false;
 	}
 	
 
 	if(checkObj) {	
	 		$.ajax({
		        url : pageUrl,
		        beforeSend : function(xhr) {
		        	$("div.loading_mask").css("display","block");
		        },
		        success:function(data){       
		            $("div.loading_mask").css("display","none");
		        	 var list = $(data).find(divListObjName);	        	
			         $(divListObjName).html(list.html());
					 $(divListObjName).scrollTop(10);
		        	 var pagingBox = $(data).find(divPagingObjName);
		             $(divPagingObjName).html(pagingBox.html());
		             //$.unblockUI();
		        },
		        error: function(response){
		             $("div.loading_mask").css("display","none");
		        	//$('div.flex_board_notice').unblock();
		            //ajaxError(response);
		         	console.log(response);
		        }
			});
		
 	} else {
 	
		$.ajax({
	        url : pageUrl,
	      //  data: $("#board_search").serialize(),
	        beforeSend : function(xhr) {
	        	$("div.loading_mask").css("display","block");
	        //   $('div.flex_board_notice').block ({ message: '<img src="/next/images/common/loading.gif" />' });
	        },
	        success:function(data){       
	          //  $('div.flex_board_notice').unblock();
	            $("div.loading_mask").css("display","none");
	        	 var list = $(data).find('.board-list');
	        	
	        	 var total = $(data).find('.total');
	        	 //alert(list.html());
	        	 if(list.html() == undefined) {
	        	 	list = $(data).find('.data-list');
	        	 	 $(".data-list").html("");
		        	 $(".data-list").html(list.html());
					 $(".data-list").scrollTop(10);
	        	 }
	        	 else {
		        	 $(".board-list").html("");
		        	 $(".board-list").html(list.html());
					 $(".board-list").scrollTop(10);
		        }	
	        	 $(".total").html(total);
				  
	        	 
	        	 var pagingBox = $(data).find('.paging');
	             $(".paging").html(pagingBox.html());
	             //$.unblockUI();
	        },
	        error: function(response){
	             $("div.loading_mask").css("display","none");
	        	//$('div.flex_board_notice').unblock();
	            //ajaxError(response);
	         	console.log(response);
	        }
		});
	}
}


function doDetailPage(pageUrl){
	$.ajax({
        url : pageUrl,
        beforeSend : function(xhr) {
        	//$("div.loading_mask").css("display","block");
        },
        success:function(data){       
           // $("div.loading_mask").css("display","none");
        	 var list = $(data).find('.sub-contents');
        	
        	 $(".sub-contents").html("");
        	 $(".sub-contents").html(list.html());
        },
        error: function(response){
            // $("div.loading_mask").css("display","none");
         	console.log(response);
        }
	});
}
