
/* 브라우저 종류 */
var agent = navigator.userAgent.toLowerCase();
var browser;
if (agent.indexOf('msie') > -1) {
	browser = 'ie' + agent.match(/msie (\d+)/)[1]
}else if(agent.indexOf('trident') > -1) {
	browser = 'ie11'
}else if(agent.indexOf('edge') > -1) {
	browser = 'edge'
}else if(agent.indexOf('firefox') > -1) {
	browser = 'firefox'
}else if(agent.indexOf('opr') > -1) {
	browser = 'opera'
}else if(agent.indexOf('chrome') > -1) {
	browser = 'chrome'
}else if(agent.indexOf('safari') > -1) {
	browser = 'safari'
}
document.querySelector("html").classList.add(browser);


//레이어팝업용 이전버튼
var $popBackTarget = null;


$(document).ready(function(){

	injeinc.init();
	topMenu();
	
	respond();
	$(window).resize(function(){
		respond();
	});
	function respond(){
		var w = $(window).width();

		if(w < 768){
			$("#allMenu").addClass('m-allMenu');
		}else{
			$("#allMenu").removeClass('m-allMenu');
		}
	}

	//전체메뉴
	$(".btn-topMenuOpen").on("click",function(e){
		e.preventDefault();
		$("#allMenu").addClass("active");
	});
	$('.btn-topMenuClose').on("click",function(e){
		e.preventDefault();
		$("#allMenu").removeClass("active");
	});
	
	//모바일메뉴
	$(".btn-mbl-menu").on("click",function(e){
		e.preventDefault();
		if($(this).hasClass("active")){
			mMenuClose();
		}else{
			mMenuOpen();
			SearchClose();// 열려있는 검색창 닫기
		}
	});
	function mMenuOpen(){
		$("#allMenu").addClass("active");
		$(".btn-mbl-menu").addClass("active");
		$("html, body").css("overflow","hidden");
	}
	function mMenuClose(){
		$("#allMenu").removeClass("active");
		$(".btn-mbl-menu").removeClass("active");
		$("html, body").css("overflow","auto");
	}

	$(".all-global-nav .dep2 > li").each(function(){
		var dep3_len = $(this).find(".dep3").length;
		if(dep3_len > 0){
			$(this).addClass("is-sub");
		}
	});
	//
	$(document).on("click", ".m-allMenu .dep1 > li > a", function(e){
		$(this).parent().toggleClass("active");
		if($(this).parent().hasClass("active")){
//			$(".m-allMenu .dep2 > li").addClass("active");
			$(this).parent().siblings(".active").removeClass("active");
		}
		callBack();
	});
	
	function callBack(){
	    $(".m-allMenu .dep2 > li > a").unbind().click(function(e){
		
	      if($(this).parent().hasClass("is-sub")){
	        e.preventDefault();
			if($(this).parent().hasClass("active")){
				$(this).parent().removeClass("active");
			}
			else{
				$(".m-allMenu .dep2 > li").removeClass("active");
				$(this).parent().addClass("active");
	        }
	      }

	    });
	    $(".m-allMenu .dep2 > li").each(function(){
	      var dep3_len = $(this).find(".dep3").length;
	      if(dep3_len > 0){
	        $(this).addClass("is-sub");
	      }
	    });
	    $(".m-allMenu .dep3 > li > a").on("click", function(e){
	      $(this).parent().toggleClass("active");
	      //console.log('3')
	    });
  	}
	$(".m-allMenu .dep1 > li > a").on("click", function(e){
		e.preventDefault();
		$(this).parent().toggleClass("active");
		if($(this).parent().hasClass("active")){
			$(".m-allMenu .dep2 > li").addClass("active");
			$(this).parent().siblings(".active").removeClass("active");
		}
	});
	
	$(".m-allMenu .dep2 > li > a").on("click", function(e){
		if($(this).parent().hasClass("is-sub")){
			e.preventDefault();
			$(this).parent().toggleClass("active");
		}
	});
	$(".m-allMenu .dep3 > li > a").on("click", function(e){
		$(this).parent().toggleClass("active");
	});

	//언어선택
	$(".lang-select button").on("click",function(){
		$(".lang-select").toggleClass("active");
	});
	$('.header-util').mouseleave(function(){
		$(".lang-select").removeClass("active");
	});
	
	//통합검색
	$(".btn-mbl-search").on("click",function(e){
		e.preventDefault();
		if($(this).hasClass("active")){
			SearchClose();
		}else{
			SearchOpen();
			mMenuClose();//열려있는 메뉴 닫기
		}
	});

  //오늘의 기록 툴팁
  $(".today-con .summary").mouseover(function(){
    let sumText = $(this).text();
    if($(this).children().length == 0){
      $(this).append('<span class="sum-text">'+sumText+'<span>')
    }
  })
  $(".today-con .summary").mouseleave(function(){
    $(".sum-text").remove();
  })
	function SearchOpen(){
		$(".header-search").show();
		$(".btn-mbl-search").addClass("active");
		$(".btn-mbl-search").text("통합검색 닫기");
	}
	function SearchClose(){
		$(".header-search").hide();
		$(".btn-mbl-search").removeClass("active");
		$(".btn-mbl-search").text("통합검색 열기");
	}
	
	//상단탭메뉴
	var subNavLength = $(".sub-nav ul li").length;
	$(".sub-nav ul").addClass("t"+subNavLength);
	
	if($(".sub-nav-tab").length > 0){
		$(".sub-nav-tab ul li").each(function(){
			var tabIndex = $(this).index()+1;
			var tabName = $(this).children("a").text();
			
			$(this).attr("data-num", tabIndex);
			$("#contents"+tabIndex).prepend("<h3 class='blind'>"+tabName+"</h3>");	
			if($(this).children("a").attr("href") == "#")
				$(this).children("a").attr("href","#contents"+tabIndex);
			else
				$(this).children("a").attr("href",$(this).children("a").attr("href"));
		});
		
		$(".sub-nav-tab ul li a").click(function(e){
			e.preventDefault();
			var li_idx = $(this).parent().attr("data-num");			
			
			if($(this).attr("href").indexOf("#") == 0) {
				$("#contents"+li_idx).siblings(".sub-contents").hide();
				$("#contents"+li_idx).show();
				$(this).parent().siblings(".active").removeClass("active");
				$(this).parent().addClass("active");
			}
			else {
				location.href=$(this).attr("href");
			}
			
		});
	}
	
	//탭메뉴
	$(".tab-wrap").each(function(){
		var $tabNav = $(this).find(".tabNav");
		var $tabNav_a = $(this).find(".tabNav a");
		var $tabContents = $(this).find(".tabContents");
		var $tabPage = $(this).find(".tabPage");
		var ACTIVE_NAME = "active";

		if($(this).attr("data-tab-active") != undefined){
			var activeNum = parseInt($(this).attr("data-tab-active"));
			$tabNav.children().eq(activeNum).addClass(ACTIVE_NAME);
			$tabContents.children().eq(activeNum).addClass(ACTIVE_NAME);
		}else{
			$tabNav.children().first().addClass(ACTIVE_NAME);
			$tabContents.children().first().addClass(ACTIVE_NAME);
		}

		$tabNav_a.on("click", function(e){
			e.preventDefault();
			var target = $(this).attr("href");

			$(this).parent().siblings(".active").removeClass(ACTIVE_NAME);
			$(this).parent().addClass(ACTIVE_NAME);
			$tabPage.removeClass(ACTIVE_NAME);
			$tabContents.find(target).addClass(ACTIVE_NAME);
			//$(target).attr("tabIndex","0").focus();
		});

	});

	$(".tab-wrap2").each(function(){
		var $tabNav = $(this).find(".tabNav2");
		var $tabNav_a = $(this).find(".tabNav2 a");
		var $tabContents = $(this).find(".tabContents2");
		var $tabPage = $(this).find(".tabPage2");
		var ACTIVE_NAME = "active";

		if($(this).attr("data-tab-active") != undefined){
			var activeNum = parseInt($(this).attr("data-tab-active"));
			$tabNav.children().eq(activeNum).addClass(ACTIVE_NAME);
			$tabContents.children().eq(activeNum).addClass(ACTIVE_NAME);
		}else{
			$tabNav.children().first().addClass(ACTIVE_NAME);
			$tabContents.children().first().addClass(ACTIVE_NAME);
		}

		$tabNav_a.on("click", function(e){
			e.preventDefault();
			var target = $(this).attr("href");

			$(this).parent().siblings(".active").removeClass(ACTIVE_NAME);
			$(this).parent().addClass(ACTIVE_NAME);
			$tabPage.removeClass(ACTIVE_NAME);
			$tabContents.find(target).addClass(ACTIVE_NAME);
			//$(target).attr("tabIndex","0").focus();
		});

	});

	//첨부파일
	$(".input-attachfile").each(function(){
		var $inputText = $(this).find(".file-name");
		var $inputFile = $(this).find(".file-push");
		var $btn = $(this).find(".file-label");

		$inputFile.attr("tabindex","-1");
		$btn.attr("tabindex","0");
		$btn.on("keydown", function(e){
			if(e.keyCode == 13){
				$inputFile.trigger("click");
			}
		});
		$inputFile.on("change", function(){
			$inputText.val($inputFile.val());
		});
	});

	//도움말팝업
	$(".help-wrap").each(function(){
		var $this = $(this);
		var $btn = $(this).find(".btn-help");
		var $box = $(this).find(".help-box");

		//키보드
		$btn.on("keydown", function(e){
			//console.log(e);
			if(e.keyCode == 13){
				$box.attr("tabIndex","0");
				$box.addClass("active");
				$box.focus();
			}
		});
		$box.on("focusout",function(){
			$box.removeClass("active");
		});
		//모바일
		$this.on("touchstart", function(e){
			if($(this).hasClass("active")){
				$box.removeClass("active");
				$this.removeClass("active");
			}else{
				$box.addClass("active");
				$this.addClass("active");
			}
		});
	});
	
	//레이어팝업
	$(".btn-openPop").each(function(){
		var $btn = $(this);
		var $target = $($btn.attr("data-target"));

		$btn.on("click",function(e){
			e.preventDefault();
			$target.addClass("active"); //팝업 보이기
			$target.find(".popup-container").attr("tabindex","0").focus(); //팝업으로 이동
			$popBackTarget = $btn; // 돌아갈 포커스 타겟 저장
		});
	});
	$(".popup-wrap").each(function(){
		var $pop = $(this);
		var $btnClose = $pop.find(".close");

		$btnClose.on("click", function(e){
			e.preventDefault();
			$pop.removeClass("active"); //팝업닫기
			$popBackTarget.focus(); //이전버튼으로 돌아가기
			$popBackTarget = null; //이전타겟 초기화
		});
		$btnClose.last().on("focusout",function(){
			if( $pop.css("display") != "none"){
				$pop.find(".popup-container").attr("tabindex","0").focus(); //팝업창 내부로 포커스 이동
			}
		});
	});
	$(".popFind-wrap").each(function(){
		var $pop = $(this);
		var $btnClose = $pop.find(".close");

		$btnClose.on("click", function(e){
			e.preventDefault();
			$pop.removeClass("active"); //팝업닫기
			$popBackTarget.focus(); //이전버튼으로 돌아가기
			$popBackTarget = null; //이전타겟 초기화
		});
		$btnClose.last().on("focusout",function(){
			if( $pop.css("display") != "none"){
				$pop.find(".popup-container").attr("tabindex","0").focus(); //팝업창 내부로 포커스 이동
			}
		});
	});

	//현재위치 타이틀 추가
	$(".page-route").prepend('<p class="lb">현재페이지의 메뉴구조</p>');


	//검색상세 - 유틸 고정
	$(window).scroll(function(){
		utilFixed();
	});

	function utilFixed(){
		if($(".search-data-util-wrap").length > 0){
			var baseTop = $(".search-data-util-wrap").offset().top
			var gap = $(window).scrollTop() + $(window).height() - 60;
			//console.log(gap, baseTop);

			if(gap < baseTop){
				$(".search-data-util").addClass("fixed");
			}else{
				$(".search-data-util").removeClass("fixed");
			}
		}
	}
	
	//토글버튼 
	$(".btn-toggle").each(function(){
		var $target = $("."+$(this).attr("data-target"));
		var closeText = $(this).attr("data-close-text");
		var openText = $(this).attr("data-open-text");
		$(this).on("click",function(){
			$target.toggleClass("active");
			if($target.hasClass("active")){
				$(this).text(openText);
				$(this).addClass("on");
			}else{
				$(this).text(closeText);
				$(this).removeClass("on");
			}
		});
	});

	//열고닫기 토글
	$(".refer-container").each(function(){
		var $btn = $(this).find(".btn-hide-toggle");
		var $target = $(this).find(".refer-contents");

		$btn.on("click",function(){
			$target.toggleClass("active");
			if($target.hasClass("active")){
				$(this).text("닫기");
				$(this).addClass("up");
			}else{
				$(this).text("열기");
				$(this).removeClass("up");
			}
		});
	});
	
	//푸터 연관사이트
	$(".footer-site .link-select button").on("click",function(e){
		$(".footer-site .link-select .select-opt").toggleClass("active");
	});
	$(".footer-site .link-select").on("click",function(e){
		e.stopPropagation();
	});
	$("html, body").on("click",function(){
		$(".footer-site .link-select .select-opt").removeClass("active");
	});
	
});

function popupOpen(pop, event){ //(팝업 아이디, event) //a태그에 사용할 경우 event추가
	if(event){ event.preventDefault(); }
	$popBackTarget = $("#btn-" + $(pop).attr("id"));
	$(pop).addClass("active");
	$(pop).find(".popup-container").attr("tabindex","0").focus();
}
function popupClose(pop, event){ //(닫힐팝업 아이디, event) //a태그에 사용할 경우 event추가
	if(event){ event.preventDefault(); }
	$(pop).removeClass("active");
	$popBackTarget.focus();
}


//상단메뉴
function topMenu(){

	var $ganv = $('.global-nav');
	var $ganvLi = $('.global-nav > .dep1 > li');
	var sub;
	
	// 2023.11.28 키보드 focus 시 이벤트 추가(웹접근성 )
	$ganvLi.children('a').on("focus", function(){
		var target = "." + $(this).attr("data-menu");
		gnavSubOpen(this, target);
	});
	//
	$ganvLi.children('a').on("mouseenter", function(){
		var target = "." + $(this).attr("data-menu");
		gnavSubOpen(this, target);
	});
	$ganvLi.children('a').on("click", function(){
		var target = "." + $(this).attr("data-menu");
		gnavSubOpen(this, target);
		$(target).attr("tabindex","0").focus();

		selectedMenu = $(this).attr("data-menu");
		console.log(selectedMenu);

		$(".gnb-sub-wrap ."+selectedMenu).find("a").last().on("focusout",function(){
			console.log($(this).text());
			$(".global-nav a[data-menu='"+selectedMenu+"']").parent().next().children().focus();
			gnavClose();
		});

	});

	$('.header-nav').mouseleave(function(){
		gnavClose();
	});
	// 2023.11.28 키보드 focus 시 이벤트 추가(웹접근성 )
	$(".btn-topMenuOpen").click(function() {
		gnavClose();
	});
	// btn-topMenuOpen focus 시
	$('.btn-topMenuOpen').focus(function(){
		gnavClose();
	});
	$('.lang-select button').focus(function(){
		gnavClose();
	});
	//

	function gnavSubOpen(a, sub){
		var $a= $(a);
		var $sub = $(sub);

		$ganvLi.filter(".active").removeClass('active');
		$a.parent().addClass('active');
		$(".gnb-sub-wrap").show();
		$(".gnb-sub-wrap").find(".active").removeClass("active");
		$sub.addClass("active");
	}
	function gnavClose(){
		$ganvLi.filter(".active").removeClass('active');
		$(".gnb-sub-wrap").find(".active").removeClass("active");
		$(".gnb-sub-wrap").hide();
	}

}


/* Injeinc Libary */
var injeinc = {
	'init':function(){
		injeinc.datepicker();
	},
	'datepicker':function(){
		var holidayData = [
			{'mmdd':'1-1','title':'신정'},
			{'mmdd':'3-1','title':'3.1절'},
			{'mmdd':'5-5','title':'어린이날'},
			{'mmdd':'6-6','title':'현충일'},
			{'mmdd':'8-15','title':'광복절'},
			{'mmdd':'10-3','title':'개천절'},
			{'mmdd':'10-9','title':'한글날'},
			{'mmdd':'12-25','title':'크리스마스'}
		];
		$(".useDatepicker").each(function(){
			if(!$(this).hasClass(".hasDatepicker")){
				var minDate = $(this).attr("data-minDate");
				var maxDate = $(this).attr("data-maxDate");
				var dateFormat = "yy-mm-dd";
				if($(this).attr("data-format")){
					dateFormat = $(this).attr("data-format");
				}
				
				$(this).datepicker({
					prevText: '이전 달',
					nextText: '다음 달',
					monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
					monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
					dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
					dayNamesShort: ['일','월','화','수','목','금','토'],
					dayNamesMin: ['일','월','화','수','목','금','토'],
					dateFormat: dateFormat,
					showMonthAfterYear: true,
					yearSuffix: '&nbsp;/',
					minDate: minDate,
					maxDate: maxDate,
					changeMonth: true,
					changeYear: true,
					yearRange: 'c-121:c+0',
					//showOn: "both",
					//buttonImage: "/images/calendarIcon.jpg",
					beforeShowDay: function(date){
						var holidayCheck = false;
						var mmdd = (date.getMonth() + 1)+"-"+date.getDate();
						for(var i=0; i<holidayData.length; i++){
							if(holidayData[i].mmdd == mmdd){
								holidayCheck = true;
								return [true, "date-holiday", holidayData[i].title];
								break;
							}
						}
						if(holidayCheck == false){
							return [true, ""];
						}
					},
					onSelect: function(selectedDate){
					},
					onClose: function(selectedDate){
						if($(this).hasClass("dateFrom")) {
							if(selectedDate != "" && $(this).parent().children(".dateTo").val() != ""){
								if(selectedDate >= $(this).parent().children(".dateTo").val()){
									alert("시작날짜는 종료날짜보다 작아야 합니다.");
									$(this).val("");
									return;
								}
							}
						}else if($(this).hasClass("dateTo")) {
							if(selectedDate != "" && $(this).parent().children(".dataFrom").val() != ""){
								if($(this).parent().children(".dateFrom").val() >= selectedDate){
									alert("종료날짜는 시작날짜보다 커야 합니다.");
									$(this).val("");
									return;
								}
							}
						}
					}
				});
			}
		});
		$(".useDatepickerIndyFrom").each(function(){
			if(!$(this).hasClass(".hasDatepicker")){
				var minDate = $(this).attr("data-minDate");
				var maxDate = $(this).attr("data-maxDate");
				var dateFormat = "yy-mm-dd";
				if($(this).attr("data-format")){
					dateFormat = $(this).attr("data-format");
				}
				
				$(this).datepicker({
					prevText: '이전 달',
					nextText: '다음 달',
					monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
					monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
					dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
					dayNamesShort: ['일','월','화','수','목','금','토'],
					dayNamesMin: ['일','월','화','수','목','금','토'],
					dateFormat: dateFormat,
					showMonthAfterYear: true,
					yearSuffix: '&nbsp;/',
					minDate: minDate,
					maxDate: maxDate,
					changeMonth: true,
					changeYear: true,
					yearRange: 'c-0:c+41',
					//showOn: "both",
					//buttonImage: "/images/calendarIcon.jpg",
					beforeShowDay: function(date){
						var holidayCheck = false;
						var mmdd = (date.getMonth() + 1)+"-"+date.getDate();
						for(var i=0; i<holidayData.length; i++){
							if(holidayData[i].mmdd == mmdd){
								holidayCheck = true;
								return [true, "date-holiday", holidayData[i].title];
								break;
							}
						}
						if(holidayCheck == false){
							return [true, ""];
						}
					},
					onSelect: function(selectedDate){
					},
					onClose: function(selectedDate){
						if($(this).hasClass("dateFrom")) {
							if(selectedDate != "" && $(this).parent().children(".dateTo").val() != ""){
								if(selectedDate >= $(this).parent().children(".dateTo").val()){
									alert("시작날짜는 종료날짜보다 작아야 합니다.");
									$(this).val("");
									return;
								}
							}
						}else if($(this).hasClass("dateTo")) {
							if(selectedDate != "" && $(this).parent().children(".dataFrom").val() != ""){
								if($(this).parent().children(".dateFrom").val() >= selectedDate){
									alert("종료날짜는 시작날짜보다 커야 합니다.");
									$(this).val("");
									return;
								}
							}
						}
					}
				});
			}
		});
		$(".useDatepickerIndyTo").each(function(){
			if(!$(this).hasClass(".hasDatepicker")){
				var minDate = $(this).attr("data-minDate");
				var maxDate = $(this).attr("data-maxDate");
				var dateFormat = "yy-mm-dd";
				if($(this).attr("data-format")){
					dateFormat = $(this).attr("data-format");
				}
				
				$(this).datepicker({
					prevText: '이전 달',
					nextText: '다음 달',
					monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
					monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
					dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
					dayNamesShort: ['일','월','화','수','목','금','토'],
					dayNamesMin: ['일','월','화','수','목','금','토'],
					dateFormat: dateFormat,
					showMonthAfterYear: true,
					yearSuffix: '&nbsp;/',
					minDate: minDate,
					maxDate: maxDate,
					changeMonth: true,
					changeYear: true,
					yearRange: 'c-41:c+0',
					//showOn: "both",
					//buttonImage: "/images/calendarIcon.jpg",
					beforeShowDay: function(date){
						var holidayCheck = false;
						var mmdd = (date.getMonth() + 1)+"-"+date.getDate();
						for(var i=0; i<holidayData.length; i++){
							if(holidayData[i].mmdd == mmdd){
								holidayCheck = true;
								return [true, "date-holiday", holidayData[i].title];
								break;
							}
						}
						if(holidayCheck == false){
							return [true, ""];
						}
					},
					onSelect: function(selectedDate){
					},
					onClose: function(selectedDate){
						if($(this).hasClass("dateFrom")) {
							if(selectedDate != "" && $(this).parent().children(".dateTo").val() != ""){
								if(selectedDate >= $(this).parent().children(".dateTo").val()){
									alert("시작날짜는 종료날짜보다 작아야 합니다.");
									$(this).val("");
									return;
								}
							}
						}else if($(this).hasClass("dateTo")) {
							if(selectedDate != "" && $(this).parent().children(".dataFrom").val() != ""){
								if($(this).parent().children(".dateFrom").val() >= selectedDate){
									alert("종료날짜는 시작날짜보다 커야 합니다.");
									$(this).val("");
									return;
								}
							}
						}
					}
				});
			}
		});
		$(".useMonthpicker").each(function(){
			$(this).monthpicker({
				showOn: "focus",
				monthNames: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
				monthNamesShort: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
				changeYear: false,
				yearRange: 'c-2:c+2',
				dateFormat: 'yy-mm',
				onSelect: function(){
				},
				onClose: function(selectedMonth){
					if($(this).hasClass("dateFrom")) {
						if(selectedMonth != "" && $(this).parent().children(".dateTo").val() != ""){
							if(selectedMonth > $(this).parent().children(".dateTo").val()){
								//inputCaptionOpen($("#monthTo"), "시작월은 종료월보다 작아야 합니다.");
								alert("시작월은 종료월보다 작아야 합니다.");
								$("#monthFrom").val("");
								return;
							}
						}
					}else if($(this).hasClass("dateTo")) {
						if(selectedMonth != "" && $(this).parent().children(".dataFrom").val() != ""){
							if($(this).parent().children(".dateFrom").val() > selectedMonth){
								//inputCaptionOpen($("#monthTo"), "종료월은 시작월보다 커야 합니다.");
								alert("종료월은 시작월보다 커야 합니다.");
								$("#monthTo").val("");
								return;
							}
						}
					}
				}
			});
		});
	}
};