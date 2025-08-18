// 자동완성 리스트에서 해당 버튼(li)만 삭제
const deleteItem = (btn) => {
    const li = btn.closest('li');
    if(li){
        li.remove();
    }
}

const recentDeleteAllItem = () => {
    // .recent_list 안의 ul#list의 모든 li를 삭제
    const list = document.querySelector('.recent_list ul#list');
    if (list) {
        list.innerHTML = '';
    }
}

const showDetail = (detailId) => {
    // 해당 detailId를 가진 expand-viewer detail_box 찾기
    const targetViewer = document.querySelector(`.expand-viewer.detail_box#${detailId}`);
    const button = document.querySelector(`[data-detail="${detailId}"]`);
    
    if (targetViewer && button) {
        if (button.classList.contains('active')) {
            targetViewer.style.display = 'none';
            button.classList.remove('active');
            button.classList.remove('i-arr-up');
            button.classList.add('i-arr-down');
        } else {
            targetViewer.style.display = 'block';
            button.classList.add('active');
            button.classList.remove('i-arr-down');
            button.classList.add('i-arr-up');
        }
    }
};

const showList = () => {
    const div_sub = document.getElementById('div_sub');
    const searchResultList = document.querySelector('.search-result-list');
    const paging = document.querySelector('.paging');
    const resultBottom = document.querySelector('.result-bottom');
    if(div_sub){
        div_sub.style.display = 'none';
    }

    if(searchResultList){
        searchResultList.style.display = 'block';
    }
    if(paging){
        paging.style.display = 'block';
    }
    if(resultBottom){
        resultBottom.style.display = 'block';
    }
}

const mobileSearchItemClick = (type) => {
    const targetPopup = document.querySelector('#popup-search-mobile');

    if(type === 'reset'){
        return;
    } else{
        const mobileSearchDiv = document.querySelector('.mobile-search-select');
        const button = mobileSearchDiv.querySelector(`button.${type}`);
        if (button) button.classList.add('active');
        if (targetPopup) targetPopup.style.display = 'block';
    }
}

const mobileSearchClose = () => {
    const targetPopup = document.querySelector('#popup-search-mobile');
    if (targetPopup) targetPopup.style.display = 'none';
}

    const detailTemplate = (data) => { 
        return `      
			<div class="md-wrap">
				<h4 class="md-title">
					건기록물 상세정보
					<button type="button" onclick="javascript:showErrorReportPop()" class="error_button">오류신고</button>
				</h4>
				<div class="data-view">
					<table>
						<caption>상세정보</caption>
						<colgroup>
							<col class="w15">
							<col>
							<col class="w15">
							<col>
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">건 제목</th>
								<td colspan="3" class="data-title">
									공고번호 제(2003090775500)호 구매입찰 재공고(공기부양정 도입 재공고) 
								</td>
							</tr>
							<tr>
								<th scope="row">생산기관</th>
								<td>해양경찰청 경비구난국 수색구조과</td>
								<th scope="row">관리번호</th>
								<td>CA0388691</td>
							</tr>
							<tr>
								<th scope="row">생산등록일자(건)</th>
								<td>2003-09-29</td>
								<th scope="row">문서유형</th>
								<td>일반문서</td>
							</tr>
							<tr>
								<th scope="row">공개구분</th>
								<td>일반기록물</td>
								<th scope="row">보존기간</th>
								<td>준영구</td>
							</tr>
							<tr>
								<th scope="row">관리기관</th>
								<td>영구기록물관리기관</td>
                                <th scope="row">기록물형태</th>
								<td>일반기록물</td>
							</tr>
							<tr>
								<th scope="row">기록물건등록번호</th>
								<td>2003153061400005300</td>
                                <th scope="row">생산연도(철)</th>
								<td>2003년</td>
							</tr>
							<tr>
								<th scope="row">기록물건등록번호</th>
								<td>1985123000000002100</td>
								<th scope="row">생산연도(철)</th>
								<td>1985년</td>
							</tr>
							<tr>
								<th scope="row">페이지정보</th>
								<td>149~393 / 245</td>
								<th scope="row">원문 서비스</th>
								<td>
                                    <a class="btn origin" href="https://theme.archives.go.kr/viewer/common/archWebViewer.do?bsid=200302096758&amp;dsid=000000000040&amp;gubun=search" onclick="window.open(this.href,'_blank');return false;" title="새창으로 열림">원문보기</a>
                                </td>
							</tr>
                            <tr>
                                <th scope="row">원문 미리보기</th>
                                <td colspan="3">
                                    <div class="preview-box">
                                        <div class="preview-box-inner">
                                            <ul>
                                                <li>
                                                    <a href="#;">
                                                        <img src="https://placehold.co/100x133">
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#;">
                                                        <img src="https://placehold.co/100x133">
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#;">
                                                        <img src="https://placehold.co/100x133">
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="preview-box-desc">
                                            <a href="#" class="link">[붙임1]</a>
                                            <p>…사업예정지 ④ 시장·군수 또는 구청장은 제3항의 규정에 의한 공고를 한 때에는 그 공고의 내용과 의견서를 제출할 수 있다는 뜻을 토지소유자 및 관계인에게 통지(소유자 및... ②건설교통부와그소속기관직제중 다음과 같이 개정한다. 제2조제3항중"토지수용법 제30조제…</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">붙임파일</th>
                                <td colspan="3">
                                <div class="hwp-list" style="display: block;">
                                    <ul>
                                    <li><a href="#" class="link">실습(기록대상유형구분).hwp</a></li>
                                    <li><a href="#" class="link">실습(관리기준표1).hwp</a></li>
                                    <li><a href="#" class="link">실습(관리기준표2).hwp</a></li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="bottom-btns">
				<a href="#;" class="btn big prev">
                    <img src="../next/images/new/arrow_left_w.svg" alt="이전" class="arrow">
                    이전
                </a>
				<a href="#;" class="btn big list" onclick="showList()">목록가기</a>
				<a href="#;" class="btn big next">
                    다음
                    <img src="../next/images/new/arrow_right_w.svg" alt="다음" class="arrow">
                </a>
			</div>
        `;
    }

const showItemDetailWithQuery = (detailId) => {
    const targetViewer = document.querySelector(`.expand-viewer.detail_box#${detailId}`);
    const button = document.querySelector(`[data-detail="${detailId}"]`);
    const searchResultList = document.querySelector('.search-result-list');
    const paging = document.querySelector('.paging');
    const resultBottom = document.querySelector('.result-bottom');

    if(targetViewer && button){
        if(searchResultList){
            searchResultList.style.display = 'none';
        }
        if(paging){
            paging.style.display = 'none';
        }
        if(resultBottom){
            resultBottom.style.display = 'none';
        }

        const div_sub = document.getElementById('div_sub');
        if(div_sub){
            div_sub.style.display = 'block';
        }
        div_sub.innerHTML = detailTemplate('data');
    }

};

const closeAllRecordDepthLists = () => {
    const allLists = document.querySelectorAll('.record-depth-list');
    const tabContents = document.querySelector('.record-depth-institution-tab-contents');
    
    const workDepthFilter = document.querySelector('.work-depth-filter');
    const workDepthLists = workDepthFilter ? workDepthFilter.querySelectorAll('.work-depth-list') : [];
    
    const isTabOpen = (tabContents && tabContents.classList.contains('active')) || 
                     document.querySelector('.record-depth-title.active') ||
                     Array.from(allLists).some(list => list.style.display !== 'none') ||
                     Array.from(workDepthLists).some(list => list.style.display !== 'none');
    
    if (isTabOpen) {
        allLists.forEach(list => {
            list.style.display = 'none';
        });
        
        workDepthLists.forEach(list => {
            list.style.display = 'none';
        });
        
        if (tabContents) {
            tabContents.classList.remove('active');
        }
        
        const allTitles = document.querySelectorAll('.record-depth-title');
        allTitles.forEach(title => {
            title.classList.remove('active');
        });
        
        updateGlobalButtonState();
    } else {
        allLists.forEach(list => {
            const parentTitle = list.closest('.record-depth-col').querySelector('.record-depth-title');
            if (parentTitle.classList.contains('active')) {
                list.style.display = 'none';
            } else {
                list.style.display = 'block';
            }
        });
        
        workDepthLists.forEach(list => {
            const parentTitle = list.closest('.work-depth-col').querySelector('.work-depth-title');
            if (parentTitle.classList.contains('active')) {
                list.style.display = 'none';
            } else {
                // 카테고리4의 경우 grid로, 나머지는 block으로 설정
                const workDepthCol = list.closest('.work-depth-col');
                if (workDepthCol.classList.contains('work-depth-category4')) {
                    list.style.display = 'grid';
                } else {
                    list.style.display = 'block';
                }
            }
        });
        
        const institutionTitle = document.querySelector('.record-depth-institution .record-depth-title');
        if (institutionTitle && institutionTitle.classList.contains('active') && tabContents) {
            tabContents.classList.add('active');
        }
        
        updateGlobalButtonState();
    }
}
const resetClick = () => {
    // 기록 히스토리 초기화
    const history = document.querySelector('.record-depth-history-list');
    if (history) history.innerHTML = '';

    // 필터 영역 input, select, text 초기화
    const $ = s => document.querySelectorAll(s);
    [ '.record-depth-filter input[type=checkbox]', '.record-depth-filter input[type=radio]', '.record-depth-institution-tab-contents input[type=checkbox]'].forEach(sel => $(sel).forEach(el => el.checked = false));
    [ '.record-depth-filter select'].forEach(sel => $(sel).forEach(el => el.selectedIndex = 0));
    [ '.record-depth-filter input[type=text]', '.record-depth-institution-tab-contents input[type=text]'].forEach(sel => $(sel).forEach(el => el.value = ''));

    // 전체 체크박스 해제
    const allChk = document.getElementById('listcheck_all');
    if (allChk) {
        allChk.checked = false;
        allChk.indeterminate = false;
    }
    $('input[name=idChk]').forEach(el => el.checked = false);

    // 전체 체크박스 상태 갱신
    if (typeof updateCheckAllStatus === 'function') updateCheckAllStatus();
    
    // 카테고리 뎁스들 초기화 (업무자료 검색탭인 경우)
    const workDepthFilter = document.querySelector('.work-depth-filter');
    if (workDepthFilter) {
        // 카테고리 2, 3, 4 제거
        const category2Element = workDepthFilter.querySelector('.work-depth-col:has(input[name="category2"])');
        const category3Element = workDepthFilter.querySelector('.work-depth-col:has(input[name="category3"])');
        const category4Element = workDepthFilter.querySelector('.work-depth-col:has(input[name="category4"])');
        
        if (category2Element) category2Element.remove();
        if (category3Element) category3Element.remove();
        if (category4Element) category4Element.remove();
        
        // 카테고리 1에 last 클래스 다시 적용
        const category1Element = workDepthFilter.querySelector('.work-depth-col:has(input[name="category1"])');
        if (category1Element) {
            category1Element.classList.add('last');
        }
        
        // 카테고리 상태도 초기화
        if (typeof resetCategories === 'function') {
            resetCategories();
        }
    }
}

// 전체 체크박스 기능
const checkAll = (checkbox) => {
    const isChecked = checkbox.checked;
    const allCheckboxes = document.querySelectorAll('input[name="idChk"]');
    
    allCheckboxes.forEach(item => {
        item.checked = isChecked;
    });
}

// 개별 체크박스 상태 변화 감지하여 전체 체크박스 상태 업데이트
const updateCheckAllStatus = () => {
    const checkAllCheckbox = document.getElementById('listcheck_all');
    const allCheckboxes = document.querySelectorAll('input[name="idChk"]');
    
    if (checkAllCheckbox && allCheckboxes.length > 0) {
        const checkedCount = Array.from(allCheckboxes).filter(item => item.checked).length;
        
        if (checkedCount === 0) {
            // 모든 체크박스가 해제된 경우
            checkAllCheckbox.checked = false;
            checkAllCheckbox.indeterminate = false;
        } else if (checkedCount === allCheckboxes.length) {
            // 모든 체크박스가 체크된 경우
            checkAllCheckbox.checked = true;
            checkAllCheckbox.indeterminate = false;
        } else {
            // 일부만 체크된 경우 (indeterminate 상태)
            checkAllCheckbox.checked = false;
            checkAllCheckbox.indeterminate = true;
        }
    }
}

// 개별 체크박스 이벤트 리스너 추가
document.addEventListener('change', function(e) {
    if (e.target.name === 'idChk') {
        updateCheckAllStatus();
    }
});

const deleteHistory = (e) => {
    const historyItem = e.closest('.record-depth-history-item');
    if(historyItem){
        historyItem.remove();
    }
}


// 전역 버튼 상태 업데이트 함수
const updateGlobalButtonState = () => {
    const closeBtn = document.querySelector('.record-depth-close-btn');
    const tabContents = document.querySelector('.record-depth-institution-tab-contents');
    const activeTitle = document.querySelector('.record-depth-title.active');
    const allLists = document.querySelectorAll('.record-depth-list');
    
    // 업무자료 검색의 카테고리 필터도 포함
    const workDepthFilter = document.querySelector('.work-depth-filter');
    const workDepthLists = workDepthFilter ? workDepthFilter.querySelectorAll('.work-depth-list') : [];
    
    // 현재 열린 상태인지 확인 (ul들의 display 상태도 포함)
    const isCurrentlyOpen = (tabContents && tabContents.classList.contains('active')) || 
                           activeTitle || 
                           Array.from(allLists).some(list => list.style.display !== 'none') ||
                           Array.from(workDepthLists).some(list => list.style.display !== 'none');
    
    if (isCurrentlyOpen) {
        // 열린 상태면 "닫기" 버튼
        closeBtn.textContent = '닫기';
        closeBtn.classList.remove('open');
    } else {
        // 닫힌 상태면 "열기" 버튼
        closeBtn.textContent = '열기';
        closeBtn.classList.add('open');
    }
};

// 전역 함수들
const downloadEvent = (type, event) => {
    switch(type){
        case 'viewer':
            break;
        case 'pdf':
            break;
        case 'hwp':
            const btn = event;  // event.target 대신 event 직접 사용
            // const li = btn.closest('li');
            const li = btn.parentElement;
            
            let isOpen = false;
            if (li) {
                const hwpList = li.querySelector('.hwp-list');
                if (hwpList) {
                    isOpen = hwpList.style.display === 'block';
                }
            }
            document.querySelectorAll('.hwp-list').forEach(el => {
                el.style.display = 'none';
            });
            if (li) {
                const hwpList = li.querySelector('.hwp-list');
                if (hwpList && !isOpen) {
                    hwpList.style.display = 'block';
                }
            }
            break;
        case 'link':
            break;
        case 'excel':
            break;
        case 'mp4':
            break;
        case 'mv61':
            break;
        case 'etc':
            break;
    }
};

// 검색결과 만족여부 클릭
const showDsntRsn = (flag) => {
    const divNo = document.getElementById('fbAnDsntNoList'); 
    if(flag){
        divNo.style.display = 'flex';
        divNo.style.flexDirection = 'column';
        divNo.style.alignItems = 'flex-end';
    }else{
        divNo.style.display = 'none';
    }
};


// 검색 결과 리스트 js 이거 보고 적용 하시면 됩니다.
document.addEventListener('DOMContentLoaded', () => {

    // 모바일용 기록물 + 업무안내,자료 상세검색 탭버튼 구현
    const recordDepthType = document.querySelector('.record-depth-type');
    if (recordDepthType) {
        recordDepthType.addEventListener('click', function(e) {
            if (e.target && e.target.tagName === 'BUTTON') {
                const lis = recordDepthType.querySelectorAll('li');
                lis.forEach(li => li.classList.remove('active'));
                const clickedLi = e.target.closest('li');
                if (clickedLi) {
                    clickedLi.classList.add('active');
                }
            }
        });
    }

    // 검색결과 탭메뉴 구현
    const recordFilter = document.getElementById('recordFilter');
    const recordList = document.getElementById('recordlist');

    // 템플릿 정의
    const defaultTemplateHeader = `
        <div class="search-result-filter">
            <h5 class="blind">검색 결과 내 필터</h5>
            <div class="select">
                <label class="single">
                <input type="checkbox" id="listcheck_all" onchange="checkAll(this); return false;">
                    <span>전체(1,085)</span>
                </label>

                <div class="mobile mobile-select">
                    <select>
                        <option value="accuracy" selected>정확도순</option>
                        <option value="dateAsc">생산연도(과거순)</option>
                        <option value="dateDesc">생산연도(최신순)</option>
                        <option value="titleAsc">제목순(ㄱ-ㅎ)</option>
                        <option value="titleDesc">제목순(ㅎ-ㄱ)</option>
                    </select>
                </div>
            </div>
            <div class="pc sort">
                <ul>
                    <li onClick="setSort('accuracy');"><a href="javascript:setSort('accuracy');"  >정확도순</a></li>
                    <li onClick="setSort('dateAsc');"><a href="javascript:setSort('dateAsc');"   >생산연도(과거순)</a></li>
                    <li onClick="setSort('dateDesc');"><a href="javascript:setSort('dateDesc');"  >생산연도(최신순)</a></li>
                    <li onClick="setSort('titleAsc');"><a href="javascript:setSort('titleAsc');"  >제목순(ㄱ-ㅎ)</a></li>
                    <li onClick="setSort('titleDesc');"><a href="javascript:setSort('titleDesc');" >제목순(ㅎ-ㄱ)</a></li>
                </ul>
            </div>

            <div class="views">
                <select name="listnum_select" id="listnum_list" onchange="listResizing('arc'); resultSort_order(); return false;">
                    <option value="10" selected>10</option>
                    <option value="20" >20</option>
                    <option value="30" >30</option>
                    <option value="50" >50</option>
                    <option value="100" >100</option>
                    <option value="300" >300</option>
                    <option value="500" >500</option>
                </select>
            </div>
        </div>
    `;

    const recordTemplateHeader = `
    <div class="record-list">
        <div class="record-list-top">
            <div class="record-list-title">
                <span>기록물 검색(1,085)</span>
            </div>
            <a href="#" class="more_view">더보기</a>
        </div>
    </div>
    `;

    const workTemplateHeader = `
    <div class="work-list">
        <div class="record-list-top">
            <div class="record-list-title">
                <span>업무자료 검색(47)</span>
            </div>
            <a href="#" class="main-more-view">더보기</a>
        </div>
    </div>
    `;
        
    // 탭 메뉴 생성 함수
    const createTabMenu = () => {
        return `
            <div class="record-tab">
                <ul>
                    <li class="active">
                        <button type="button" class="tab-btn" data-tab="ritem">기록물 건</button>
                    </li>
                    <li>
                        <button type="button" class="tab-btn" data-tab="rfile">기록물 철</button>
                    </li>
                </ul>
            </div>
        `;
    };
    
    // 개별 필터 함수들
    const createRecordTypeFilter = () => {
        return `
            <div class="record-depth-col record-depth-type">
                <div class="record-depth-title">
                    <span>기록물형태</span>
                    <button class="more_view"></button>
                </div>
                <ul class="record-depth-list">
                    <li>
                        <input type="radio" id="record-type-1" name="record-type" />
                        <label for="record-type-1">일반문서류 <span class="record-depth-count">(532)</span></label>
                    </li>
                    <li>
                        <input type="radio" id="record-type-2" name="record-type" />
                        <label for="record-type-2">도면류 <span class="record-depth-count">(33)</span></label>
                    </li>
                    <li>
                        <input type="radio" id="record-type-3" name="record-type" />
                        <label for="record-type-3">사진,필름류 <span class="record-depth-count">(24)</span></label>
                    </li>
                    <li>
                        <input type="radio" id="record-type-4" name="record-type" />
                        <label for="record-type-4">녹음,동영상류 <span class="record-depth-count">(12)</span></label>
                    </li>
                    <li>
                        <input type="radio" id="record-type-5" name="record-type" />
                        <label for="record-type-5">마이크로필름류 <span class="record-depth-count">(14)</span></label>
                    </li>
                    <li>
                        <input type="radio" id="record-type-6" name="record-type" />
                        <label for="record-type-6">전자기록류 <span class="record-depth-count">(21)</span></label>
                    </li>
                    <li>
                        <input type="radio" id="record-type-7" name="record-type" />
                        <label for="record-type-7">간행물 <span class="record-depth-count">(9)</span></label>
                    </li>
                </ul>
            </div>
        `;
    };
    
    // 공개여부 필터
    const createOpenFilter = () => {
        return `
            <div class="record-depth-col record-depth-open">
                <div class="record-depth-title">
                    <span>공개여부</span>
                    <button class="more_view"></button>
                </div>
                <ul class="record-depth-list">
                    <li>
                        <input type="radio" id="open-type-1" name="open-type" />
                        <label for="open-type-1">
                            <span class="record-depth-open-label">공개</span>
                            <span class="record-depth-count">(251)</span>
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="open-type-2" name="open-type" />
                        <label for="open-type-2">
                            부분공개 <span class="record-depth-count">(24)</span>
                        </label>
                    </li>
                </ul>
            </div>
        `;
    };
    
    // 원문서비스 필터
    const createServiceFilter = () => {
        return `
            <div class="record-depth-col record-depth-service">
                <div class="record-depth-title">
                    <span>원문서비스</span>
                    <button class="more_view"></button>
                </div>
                <ul class="record-depth-list">
                    <li>
                        <input type="radio" id="service-type-1" name="service-type" />
                        <label for="service-type-1">온라인 미제공 <span class="record-depth-count">(251)</span></label>
                    </li>
                    <li>
                        <input type="radio" id="service-type-2" name="service-type" />
                        <label for="service-type-2">온라인 제공 <span class="record-depth-count">(32)</span></label>
                    </li>
                </ul>
            </div>
        `;
    };
    
    // 생산연도 필터
    const createYearFilter = () => {
        return `
            <div class="record-depth-col record-depth-year">
                <div class="record-depth-title">
                    <span>생산연도</span>
                    <button class="more_view"></button>
                </div>
                <ul class="record-depth-list">
                    <li>
                        <input type="radio" id="year-type-1" name="year-type" />
                        <label for="year-type-1">2011~2020 <span class="record-depth-count">(124)</span></label>
                    </li>
                    <li>
                        <input type="radio" id="year-type-2" name="year-type" />
                        <label for="year-type-2">2001~2010 <span class="record-depth-count">(42)</span></label>
                    </li>
                    <li>
                        <input type="radio" id="year-type-3" name="year-type" />
                        <label for="year-type-3">1991~2000 <span class="record-depth-count">(36)</span></label>
                    </li>
                </ul>
            </div>
        `;
    };
    
    // 생산기관 필터
    const createInstitutionFilter = () => {
        return `
            <div class="record-depth-col record-depth-institution">
                <div class="record-depth-title">
                    <span>생산기관</span>
                    <button class="more_view"></button>
                </div>
                <ul class="record-depth-list">
                    <li>
                        <input type="radio" id="inst-type-1" name="inst-type" />
                        <label for="inst-type-1">조달청 <span class="record-depth-count">(124)</span></label>
                    </li>
                    <li>
                        <input type="radio" id="inst-type-2" name="inst-type" />
                        <label for="inst-type-2">조달청 <span class="record-depth-count">(42)</span></label>
                    </li>
                    <li>
                        <input type="radio" id="inst-type-3" name="inst-type" />
                        <label for="inst-type-3">조달청 <span class="record-depth-count">(36)</span></label>
                    </li>
                </ul>
            </div>
        `;
    };
    
    // 생산기관 검색 탭 생성 함수
    const createInstitutionSearchTab = () => {
        return `
            <div class="record-depth-institution-tab-contents">
                <div class="search-institution-list-wrap">
                    <!-- 검색 입력창 -->
                    <div class="search-institution-input">
                        <input type="text" placeholder="생산기관 찾기" />
                        <input type="submit" value="검색" class="btn-submit" onclick="return onSearch();">
                    </div>
                    
                    <!-- 검색 결과 리스트 -->
                    <div class="search-institution-list">
                        <div class="search-institution-col">
                            <div class="search-institution-item">
                                <input type="checkbox" id="inst-1" />
                                <label for="inst-1">행정자치부 기획관리실 법무담당관
                                <span class="record-depth-count">(125,672)</span>
                                </label>
                            </div>
                            <div class="search-institution-item">
                                <input type="checkbox" id="inst-2" />
                                <label for="inst-2">총무처 법무담당관 
                                    <span class="record-depth-count">(68,523)</span>
                                </label>
                            </div>
                            <div class="search-institution-item">
                                <input type="checkbox" id="inst-3" />
                                <label for="inst-3">건설교통부 중앙토지수용위원회 사무국
                                    <span class="record-depth-count">(15,222)</span>
                                </label>
                            </div>
                            <div class="search-institution-item">
                                <input type="checkbox" id="inst-4" />
                                <label for="inst-4">국토해양부 중앙토지수용위원회 사무국
                                    <span class="record-depth-count">(10,234)</span>
                                </label>
                            </div>
                            <div class="search-institution-item">
                                <input type="checkbox" id="inst-5" />
                                <label for="inst-5">국세청 광주지방국세청
                                    <span class="record-depth-count">(7,204)</span>
                                </label>
                            </div>
                            <div class="search-institution-item">
                                <input type="checkbox" id="inst-6" />
                                <label for="inst-6">국세청 중부지방 국세청
                                    <span class="record-depth-count">(4,124)</span>
                                </label>
                            </div>
                            <div class="search-institution-item">
                                <input type="checkbox" id="inst-7" />
                                <label for="inst-7">국세청 서울지방국세청 용산세무서
                                    <span class="record-depth-count">(4,235)</span>
                                </label>
                            </div>
                            <div class="search-institution-item">
                                <input type="checkbox" id="inst-8" />
                                <label for="inst-8">국세청 서울지방국세청 영등포세무서
                                    <span class="record-depth-count">(5,123)</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };
    
    // 액션 섹션 생성 함수 (닫기 버튼, 히스토리, 액션 버튼들)
    const createActionSection = () => {
        return `
            <!-- 닫기/열기 버튼 -->
            <div class="record-depth-close-wrap">
                <button type="button" class="record-depth-close-btn" aria-label="닫기" onclick="closeAllRecordDepthLists()">닫기</button>
            </div>
            
            <!-- 하단 액션 영역 -->
            <div class="record-depth-actions">
                <!-- 검색 히스토리 -->
                <div class="record-depth-history">
                    <ul class="record-depth-history-list">
                        <li class="record-depth-history-item">
                            <span>업무안내·자료</span>
                            <span>법령정보</span>
                            <span>소관법령</span>
                            <span>훈령·예규</span>
                            <button type="button" class="delete" onclick="deleteHistory(this)"></button>
                        </li>
                        <li class="record-depth-history-item">
                            <span>업무안내·자료</span>
                            <span>법령정보</span>
                            <span>소관법령</span>
                            <span>훈령·예규</span>
                            <button type="button" class="delete" onclick="deleteHistory(this)"></button>
                        </li>
                        <li class="record-depth-history-item">
                            <span>업무안내·자료</span>
                            <span>기록관리자료실</span>
                            <span>표준·지침·매뉴얼</span>
                            <span>기록물관리 표준</span>
                            <button type="button" class="delete" onclick="deleteHistory(this)"></button>
                        </li>
                        <li class="record-depth-history-item">
                            <span>업무안내·자료</span>
                            <span>기록관리자료실</span>
                            <span>표준·지침·매뉴얼</span>
                            <span>매뉴얼</span>
                            <button type="button" class="delete" onclick="deleteHistory(this)"></button>
                        </li>
                    </ul>
                </div>
                
                <!-- 액션 버튼들 -->
                <div class="record-depth-btns">
                    <button type="button" class="btn reset" onclick="resetClick()">초기화</button>
                    <button type="button" class="btn search">검색</button>
                </div>
            </div>
        `;
    };


    // 카테고리 생성 함수들 (전역 스코프)
const createCategory1 = () => {
    return `
        <div class="work-depth-col">
            <div class="work-depth-title">
                <span>카테고리1</span>
            </div>
            <ul class="work-depth-list">
                <li>
                    <input type="radio" id="category-1-1" name="category1" value="업무안내자료" />
                    <label for="category-1-1">업무안내 · 자료</label>
                </li>
                <li>
                    <input type="radio" id="category-1-2" name="category1" value="뉴스소식" />
                    <label for="category-1-2">뉴스ㆍ소식</label>
                </li>
            </ul>
        </div>
    `;
}

const createCategory2 = () => {
    return `
        <div class="work-depth-col">
            <div class="work-depth-title">
                <span>카테고리2</span>
            </div>
            <ul class="work-depth-list">
                <li>
                    <input type="radio" id="category-2-1" name="category2" value="전체" />
                    <label for="category-2-1">전체</label>
                </li>
                <li>
                    <input type="radio" id="category-2-2" name="category2" value="기록관리자료실" />
                    <label for="category-2-2">기록관리자료실</label>
                </li>
                <li>
                    <input type="radio" id="category-2-3" name="category2" value="법령정보" />
                    <label for="category-2-3">법령정보</label>
                </li>
                <li>
                    <input type="radio" id="category-2-4" name="category2" value="업무계획" />
                    <label for="category-2-4">업무계획</label>
                </li>
            </ul>
        </div>
    `;
}

const createCategory3 = () => {
    return `
        <div class="work-depth-col">
            <div class="work-depth-title">
                <span>카테고리3</span>
            </div>
            <ul class="work-depth-list">
                <li>
                    <input type="radio" id="category-3-1" name="category3" value="전체" />
                    <label for="category-3-1">전체</label>
                </li>
                <li>
                    <input type="radio" id="category-3-2" name="category3" value="표준지침매뉴얼" />
                    <label for="category-3-2">표준·지침·매뉴얼</label>
                </li>
                <li>
                    <input type="radio" id="category-3-3" name="category3" value="기록물분류기준" />
                    <label for="category-3-3">기록물분류기준</label>
                </li>
                <li>
                    <input type="radio" id="category-3-4" name="category3" value="행정정보데이터세트" />
                    <label for="category-3-4">행정정보데이터세트</label>
                </li>
                <li>
                    <input type="radio" id="category-3-5" name="category3" value="기록관리평가" />
                    <label for="category-3-5">기록관리평가</label>
                </li>
                <li>
                    <input type="radio" id="category-3-6" name="category3" value="발간자료" />
                    <label for="category-3-6">발간자료</label>
                </li>
            </ul>
        </div>
    `;
}

const createCategory4 = () => {
    return `
        <div class="work-depth-col work-depth-category4">
            <div class="work-depth-title">
                <span>카테고리4</span>
            </div>
            <ul class="work-depth-list">
                <li>
                    <input type="checkbox" id="category-4-1" name="category4" value="전체" />
                    <label for="category-4-1">전체</label>
                </li>
                <li>
                    <input type="checkbox" id="category-4-2" name="category4" value="한국산업표준KS" />
                    <label for="category-4-2">한국산업표준(KS)</label>
                </li>
                <li>
                    <input type="checkbox" id="category-4-3" name="category4" value="기록물관리표준" />
                    <label for="category-4-3">기록물관리 표준</label>
                </li>
                <li>
                    <input type="checkbox" id="category-4-4" name="category4" value="지침" />
                    <label for="category-4-4">지침</label>
                </li>
                <li>
                    <input type="checkbox" id="category-4-5" name="category4" value="메뉴얼" />
                    <label for="category-4-5">메뉴얼</label>
                </li>
                <li>
                    <input type="checkbox" id="category-4-6" name="category4" value="규격서식" />
                    <label for="category-4-6">규격·서식</label>
                </li>
                <li>
                    <input type="checkbox" id="category-4-7" name="category4" value="해외표준" />
                    <label for="category-4-7">해외표준</label>
                </li>
                <li>
                    <input type="checkbox" id="category-4-8" name="category4" value="기록관리SW" />
                    <label for="category-4-8">기록관리 SW</label>
                </li>
                <li>
                    <input type="checkbox" id="category-4-9" name="category4" value="관련사이트소개" />
                    <label for="category-4-9">관련사이트 소개</label>
                </li>
            </ul>
        </div>
    `;
}

// 카테고리 단계별 연쇄 선택 기능
const categoryState = {
    category1: { selected: null, enabled: true },
    category2: { selected: null, enabled: false },
    category3: { selected: null, enabled: false },
    category4: { selected: null, enabled: false }
};

// 카테고리 상태 업데이트 함수
const updateCategoryStates = () => {
    categoryState.category2.enabled = !!categoryState.category1.selected;
    categoryState.category3.enabled = !!categoryState.category2.selected;
    categoryState.category4.enabled = !!categoryState.category3.selected;
};

// 카테고리 변경 이벤트 핸들러 (전역 스코프)
const handleCategoryChange = (categoryLevel, value) => {
    // 해당 카테고리 선택
    if (categoryLevel === 'category4') {
        // 카테고리4는 체크박스이므로 배열로 관리
        if (!categoryState[categoryLevel].selected) {
            categoryState[categoryLevel].selected = [];
        }
        
        const index = categoryState[categoryLevel].selected.indexOf(value);
        if (index > -1) {
            // 이미 선택된 값이면 제거
            categoryState[categoryLevel].selected.splice(index, 1);
        } else {
            // 선택되지 않은 값이면 추가
            categoryState[categoryLevel].selected.push(value);
        }
    } else {
        // 카테고리1, 2, 3은 라디오 버튼이므로 단일 값으로 관리
        categoryState[categoryLevel].selected = value;
    }

    if (categoryLevel === 'category1') {
        categoryState.category2.selected = null;
        categoryState.category3.selected = null;
        categoryState.category4.selected = [];
    
        removeCategory3();
        removeCategory4();
        addCategory2();
        
    } else if (categoryLevel === 'category2') {
        categoryState.category3.selected = null;
        categoryState.category4.selected = [];
        removeCategory4();
        addCategory3();
        
    } else if (categoryLevel === 'category3') {
        categoryState.category4.selected = [];
        addCategory4();
    }
    
    // 상태 업데이트
    updateCategoryStates();
    // UI 업데이트
    renderCategories();
};

// 카테고리 2 동적 추가 함수 (전역 스코프)
const addCategory2 = () => {
    const workDepthFilter = document.querySelector('.work-depth-filter');
    if (workDepthFilter && !document.querySelector('.work-depth-col:has(input[name="category2"])')) {
        const category2HTML = createCategory2();
        workDepthFilter.insertAdjacentHTML('beforeend', category2HTML);
        
        // 기존 last 클래스 제거
        workDepthFilter.querySelectorAll('.work-depth-col').forEach(col => {
            col.classList.remove('last');
        });
        
        // 새로 추가된 카테고리 2에 last 클래스 추가
        const category2Element = workDepthFilter.querySelector('.work-depth-col:has(input[name="category2"])');
        if (category2Element) {
            category2Element.classList.add('last');
        }
    }
};

// 카테고리 3 동적 추가 함수 (전역 스코프)
const addCategory3 = () => {
    const workDepthFilter = document.querySelector('.work-depth-filter');
    if (workDepthFilter && !document.querySelector('.work-depth-col:has(input[name="category3"])')) {
        const category3HTML = createCategory3();
        workDepthFilter.insertAdjacentHTML('beforeend', category3HTML);
        
        // 기존 last 클래스 제거
        workDepthFilter.querySelectorAll('.work-depth-col').forEach(col => {
            col.classList.remove('last');
        });
        
        // 새로 추가된 카테고리 3에 last 클래스 추가
        const category3Element = workDepthFilter.querySelector('.work-depth-col:has(input[name="category3"])');
        if (category3Element) {
            category3Element.classList.add('last');
        }
    }
};

// 카테고리 4 동적 추가 함수
const addCategory4 = () => {
    const workDepthFilter = document.querySelector('.work-depth-filter');
    if (workDepthFilter && !document.querySelector('.work-depth-col:has(input[name="category4"])')) {
        const category4HTML = createCategory4();
        workDepthFilter.insertAdjacentHTML('beforeend', category4HTML);
        
        workDepthFilter.querySelectorAll('.work-depth-col').forEach(col => {
            col.classList.remove('last');
        });
    }
};

// 카테고리 제거 함수들
const removeCategory2 = () => {
    const category2Element = document.querySelector('.work-depth-col:has(input[name="category2"])');
    if (category2Element) {
        category2Element.remove();
        
        const workDepthFilter = document.querySelector('.work-depth-filter');
        const category1Element = workDepthFilter.querySelector('.work-depth-col:has(input[name="category1"])');
        if (category1Element) {
            category1Element.classList.add('last');
        }
    }
};

const removeCategory3 = () => {
    const category3Element = document.querySelector('.work-depth-col:has(input[name="category3"])');
    if (category3Element) {
        category3Element.remove();
        
        const workDepthFilter = document.querySelector('.work-depth-filter');
        const category2Element = workDepthFilter.querySelector('.work-depth-col:has(input[name="category2"])');
        if (category2Element) {
            category2Element.classList.add('last');
        }
    }
};

const removeCategory4 = () => {
    const category4Element = document.querySelector('.work-depth-col:has(input[name="category4"])');
    if (category4Element) {
        category4Element.remove();
        
        const workDepthFilter = document.querySelector('.work-depth-filter');
        const category3Element = workDepthFilter.querySelector('.work-depth-col:has(input[name="category3"])');
        if (category3Element) {
            category3Element.classList.add('last');
        }
        
        console.log('카테고리 4 제거됨 (카테고리 3에 last 클래스 적용)');
    }
};

const renderCategories = () => {
    // 카테고리 1
    const category1Inputs = document.querySelectorAll('input[name="category1"]');
    category1Inputs.forEach(input => {
        input.checked = input.value === categoryState.category1.selected;
    });
    
    // 카테고리 2
    const category2Inputs = document.querySelectorAll('input[name="category2"]');
    category2Inputs.forEach(input => {
        input.disabled = !categoryState.category2.enabled;
        input.checked = input.value === categoryState.category2.selected;
    });
    
    // 카테고리 3
    const category3Inputs = document.querySelectorAll('input[name="category3"]');
    category3Inputs.forEach(input => {
        input.disabled = !categoryState.category2.enabled;
        input.checked = input.value === categoryState.category3.selected;
    });
    
    // 카테고리 4
    const category4Inputs = document.querySelectorAll('input[name="category4"]');
    category4Inputs.forEach(input => {
        input.disabled = !categoryState.category4.enabled;
        // 카테고리4는 배열로 관리되므로 includes로 확인
        input.checked = Array.isArray(categoryState.category4.selected) && 
                      categoryState.category4.selected.includes(input.value);
    });
};

// 카테고리 초기화 함수 (전역 스코프)
const resetCategories = () => {
    categoryState.category1.selected = null;
    categoryState.category2.selected = null;
    categoryState.category3.selected = null;
    categoryState.category4.selected = [];
    
    updateCategoryStates();
    renderCategories();
};

document.addEventListener('change', (event) => {
    if (event.target.matches('input[name^="category"]')) {
        const categoryLevel = event.target.name;
        const value = event.target.value;
        
        // handleCategoryChange 함수가 정의된 후에 호출
        if (typeof handleCategoryChange === 'function') {
            handleCategoryChange(categoryLevel, value);
        }
    }
});
 
    // 5. 기록물 건 탭 컨텐츠 생성 함수
    const createRitemTab = () => {
        return `
            <div class="record-tab-contents-item ritem-tab">
                <div class="record-depth-filter">
                    ${createRecordTypeFilter()}
                    ${createOpenFilter()}
                    ${createServiceFilter()}
                    ${createYearFilter()}
                    ${createInstitutionFilter()}
                </div>
                ${createInstitutionSearchTab()}
                ${createActionSection()}
            </div>
        `;
    };
    
    // 6. 기록물 철 탭 컨텐츠 생성 함수
    const createRfileTab = () => {
        return `
            <div class="record-tab-contents-item rfile-tab">
                <div class="record-depth-filter">
                    ${createRecordTypeFilter()}
                    ${createYearFilter()}
                    ${createInstitutionFilter()}
                </div>
                ${createInstitutionSearchTab()}
                ${createActionSection()}
            </div>
        `;
    };

    // 7. 업무자료 탭 컨텐츠 생성 함수
    const createRworkTab = () => {
        return `
            <div class="work-tab-contents-item rwork-tab">
                <div class="work-depth-filter">
                    ${createCategory1().replace('work-depth-col', 'work-depth-col last')}
                </div>
            ${createActionSection()}
            </div>
        `;
    };
    // 8. 기록물 건 탭 헤더 생성 함수
    const createRitemHeader = (count = 1085) => {
        return `
            <div class="search-result-filter">
                <h5 class="blind">기록물 건 검색 결과 내 필터</h5>
                <div class="select">
                    <label class="single">
                        <input type="checkbox" id="listcheck_all" onchange="checkAll(this); return false;">
                        <span>전체(${count})</span>
                    </label>

                    <div class="mobile mobile-select">
                    <select>
                        <option value="accuracy" selected>정확도순</option>
                        <option value="dateAsc">생산연도(과거순)</option>
                        <option value="dateDesc">생산연도(최신순)</option>
                        <option value="titleAsc">제목순(ㄱ-ㅎ)</option>
                        <option value="titleDesc">제목순(ㅎ-ㄱ)</option>
                    </select>
                </div>
                </div>

                <div class="pc sort">
                    <ul>
                        <li onclick="setSort('accuracy');"><a href="javascript:setSort('accuracy');">정확도순</a></li>
                        <li onclick="setSort('dateAsc');"><a href="javascript:setSort('dateAsc');">생산연도(과거순)</a></li>
                        <li onclick="setSort('dateDesc');"><a href="javascript:setSort('dateDesc');">생산연도(최신순)</a></li>
                        <li onclick="setSort('titleAsc');"><a href="javascript:setSort('titleAsc');">제목순(ㄱ-ㅎ)</a></li>
                        <li onclick="setSort('titleDesc');"><a href="javascript:setSort('titleDesc');">제목순(ㅎ-ㄱ)</a></li>
                    </ul>
                </div>
                <div class="views">
                    <select name="listnum_select" id="listnum_list" onchange="listResizing('arc'); resultSort_order(); return false;">
                        <option value="10" selected="">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="300">300</option>
                        <option value="500">500</option>
                    </select>
                </div>
            </div>
        `;
    };
    
    // 9. 기록물 철 탭 헤더 생성 함수
    const createRfileHeader = (count = 500) => {
        return `
            <div class="search-result-filter">
                <h5 class="blind">기록물 철 검색 결과 내 필터</h5>
                <div class="select">
                    <label class="single">
                        <input type="checkbox" id="listcheck_all" onchange="checkAll(this); return false;">
                        <span>전체(${count})</span>
                    </label>

                    <div class="mobile mobile-select">
                        <select>
                            <option value="accuracy" selected>정확도순</option>
                            <option value="dateAsc">생산연도(과거순)</option>
                            <option value="dateDesc">생산연도(최신순)</option>
                            <option value="titleAsc">제목순(ㄱ-ㅎ)</option>
                            <option value="titleDesc">제목순(ㅎ-ㄱ)</option>
                        </select>
                    </div>
                </div>

                <div class="pc sort">
                    <ul>
                        <li onclick="setSort('accuracy');"><a href="javascript:setSort('accuracy');">정확도순</a></li>
                        <li onclick="setSort('dateAsc');"><a href="javascript:setSort('dateAsc');">생산연도(과거순)</a></li>
                        <li onclick="setSort('dateDesc');"><a href="javascript:setSort('dateDesc');">생산연도(최신순)</a></li>
                        <li onclick="setSort('titleAsc');"><a href="javascript:setSort('titleAsc');">제목순(ㄱ-ㅎ)</a></li>
                        <li onclick="setSort('titleDesc');"><a href="javascript:setSort('titleDesc');">제목순(ㅎ-ㄱ)</a></li>
                    </ul>
                </div>
                <div class="views">
                    <select name="listnum_select" id="listnum_list" onchange="listResizing('arc'); resultSort_order(); return false;">
                        <option value="10" selected="">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="300">300</option>
                        <option value="500">500</option>
                    </select>
                </div>
            </div>
        `;
    };

    // 기록물/업무자료 공통 아이템 함수
    // all = true 면 selectbox 추가
    // data에 필요한 값들을 넣어서 사용
    const rItem = (data, all = false) => {
        let selectBox = '';
        let actionBox = '';
        let detailBox = detail(data.detailId);
        let onclickAttr = !all ? `onclick="showItemDetailWithQuery('${data.detailId}'); return false;"` : '';

        if(!all){
            selectBox = `
            <div class="select">
              <label class="only">
                <input type="checkbox" name="idChk" id="listcheck_0" value="1310377-200902659556-000000000004"><span>선택</span>
              </label>
            </div>
            `;

            actionBox = `
            <div class="action-box">
                <ul>
                    <li><button class="btn down">Download</button></li>
                    <li><button class="btn print">Print</button></li>
                    <li><button class="btn folder">Folder</button></li>
                    <li><button class="btn copy">Copy</button></li>
                </ul>
            </div>
            `;
        }
        
        // 기록물
        return `
          <div class="result-row ritem">     
            <div class="result-row-inner">
            ${selectBox}
            <div class="image-box">
                <a href="#none" title="새창열림" ${onclickAttr}>
                    <img src="https://placehold.co/157x209" />
                </a>
            </div>
            <div class="list-contents">
              <div class="category" >						
                <span class="cate-lb">일반문서</span>
                <span class="cate-lb open">공개</span>
                <span class="cate-lb open2">비공개</span>
              </div>

              ${actionBox}

              <div class="title">
                <a href="#" title="새창열림" ${onclickAttr}>
                  <em class=searched-word>공고</em>내용 정정<em class=searched-word>공고</em>의뢰
                </a>
              </div>
              <div class="info">
                <ul>
                  <li class="institution">
                    <span class="lb" style="color:#5E5E5E;">생산기관 : </span>
                    <span class="data" style="color:#5E5E5E;">	
                          조달청
                    </span>
                  </li>
                  <li class="year">
                    <span class="lb" style="color:#5E5E5E;">생산연도 : </span>
                    <span class="data" style="color:#5E5E5E;">1985년</span>
                  </li>
                  <li class="manage-numvber">
                    <span class="lb" style="color:#5E5E5E;">관리번호 : </span>
                    <span class="data" style="color:#5E5E5E;">DA0347709</span>
                  </li>
                </ul>
                <p>
                    사업예정지 ④ 시장·군수 또는 구청장은 제3항의 규정에 의한 공고를 한 때에는 그 공고의 내용과 의견서를 제출할 수 있다는 뜻을 토지소유자 및 관계인에게 통지(소유자 및... ②건설교통부와그소속기관직제중 다음과 같이 개정한다. 제2조제3항중"토지수용법 제30조제
                </p>
              </div>
              <div class="expand">
                    <a class="btn summary i-arr-down" data-detail="${data.detailId}" href="#none" onclick="showDetail('${data.detailId}'); return false;">요약정보</a>
                <a class="btn origin" href="https://theme.archives.go.kr/viewer/common/archWebViewer.do?bsid=200302096758&amp;dsid=000000000040&amp;gubun=search" onClick="window.open(this.href,'_blank');return false;" title="새창으로 열림" class="viewrecord">원문보기</a>
              </div>
            </div>
                </div>
                ${detailBox}
          </div>
        `;
    };

    const rFile = (data, all = false) => {
        let selectBox = '';
        let onclickAttr = !all ? `onclick="showItemDetailWithQuery('${data.detailId}'); return false;"` : '';
        if(!all){
            selectBox = `
            <div class="select">
              <label class="only">
                <input type="checkbox" name="idChk" id="listcheck_0" value="1310377-200902659556-000000000004"><span>선택</span>
              </label>
            </div>
            `;
        }

        let actionBox = `
            <div class="action-box">
                <ul>
                    <li><button class="btn down">Download</button></li>
                    <li><button class="btn print">Print</button></li>
                </ul>
            </div>
            `;
        // 기록물
        return `
          <div class="result-row rfile">     
            <div class="result-row-inner">
            ${selectBox}    
            <div class="list-contents">
              <div class="category" >						
                <span class="cate-lb">일반문서</span>
                <span class="cate-lb open">공개</span>
              </div>
              ${actionBox}
              <div class="title">
                <a href="#" title="새창열림" ${onclickAttr}>
                  <em class=searched-word>공고</em>내용 정정<em class=searched-word>공고</em>의뢰
                </a>
              </div>
              <div class="info">
                <ul>
                  <li class="institution">
                    <span class="lb" style="color:#5E5E5E;">생산기관 : </span>
                    <span class="data" style="color:#5E5E5E;">	
                          조달청
                    </span>
                  </li>
                  <li class="year">
                    <span class="lb" style="color:#5E5E5E;">생산연도 : </span>
                    <span class="data" style="color:#5E5E5E;">1985년</span>
                  </li>
                  <li class="manage-numvber">
                    <span class="lb" style="color:#5E5E5E;">관리번호 : </span>
                    <span class="data" style="color:#5E5E5E;">DA0347709</span>
                  </li>
                </ul>
              </div>
              </div>
            </div>
          </div>
        `;
    };

    const wItem = (data, all = false) => {
        let selectBox = '';
        if(!all){
            selectBox = `
            <div class="select">
              <label class="only">
                <input type="checkbox" name="idChk" id="listcheck_0" value="1310377-200902659556-000000000004"><span>선택</span>
              </label>
            </div>
            `;
        }
        // 업무자료
        return `
          <div class="result-row witem">
            <div class="result-row-inner">
            ${selectBox}      
            <div class="list-contents">
              <div class="title">
                <a href="#" title="새창열림" >
                  <em class=searched-word>공고</em>내용 정정<em class=searched-word>공고</em>의뢰
                </a>
                <div class="download" >						
                  <ul>
                    <li><button type="button" class="btn viewer" onclick="downloadEvent('viewer', this)">Viewer</button></li>
                    <li><button type="button" class="btn pdf" onclick="downloadEvent('pdf', this)">PDF</button></li>
                    <li><button type="button" class="btn hwp" onclick="downloadEvent('hwp', this)">HWP</button>
                      <div class="hwp-list">
                        <ul>
                          <li><button type="button" onclick="downloadEvent('hwp01', this)">실습(기록대상유형구분).hwp</button></li>
                          <li><button type="button" onclick="downloadEvent('hwp02', this)">실습(관리기준표1).hwp</button></li>
                          <li><button type="button" onclick="downloadEvent('hwp03', this)">실습(관리기준표2).hwp</button></li>
                        </ul>
                      </div>
                    </li>
                    <li><button type="button" class="btn link" onclick="downloadEvent('link', this)">LINK</button></li>
                    <li><button type="button" class="btn excel" onclick="downloadEvent('excel', this)">EXCEL</button></li>
                    <li><button type="button" class="btn mp4" onclick="downloadEvent('mp4', this)">MP4</button></li>
                    <li><button type="button" class="btn mv61" onclick="downloadEvent('mv61', this)">MV61</button></li>
                    <li><button type="button" class="btn etc" onclick="downloadEvent('etc', this)">기타</button></li>
                  </ul>
                </div>
              </div>
              <div class="info">
                <div class="date">
                  <p>제·개정 년도 2022</p>
                </div>
                <div class="breadcrumbs">
                  <span>업무안내·자료</span>
                  <span>기록관리 자료실</span>
                  <span>표준·지침·매뉴얼</span>
                  <span>한국산업표준(KS)</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        `;
    };

    const mobileSearch = (type) => {
        switch(type){
            case 'rtype':
                return `
                <div class="mobile mobile-search-select">
                    <button type="button" class="reset" onclick="mobileSearchItemClick('reset')"></button>
                    <button type="button" class="debth1" onclick="mobileSearchItemClick('debth1')">기록물형태</button>
                    <button type="button" class="debth2" onclick="mobileSearchItemClick('debth2')">공개여부</button>
                    <button type="button" class="debth3" onclick="mobileSearchItemClick('debth3')">원문서비스</button>
                    <button type="button" class="debth4" onclick="mobileSearchItemClick('debth4')">생산연도</button>
                    <button type="button" class="debth5" onclick="mobileSearchItemClick('debth5')">생산기관</button>
                </div>
                `;
            case 'rfile':
                return `
                <div class="mobile mobile-search-select">
                    <button type="button" class="reset" onclick="mobileSearchItemClick('reset')"></button>
                    <button type="button" class="debth1" onclick="mobileSearchItemClick('debth1')">기록물형태</button>
                    <button type="button" class="debth2" onclick="mobileSearchItemClick('debth2')">생산연도</button>
                    <button type="button" class="debth3" onclick="mobileSearchItemClick('debth3')">생산기관</button>
                </div>
                `;

            case 'work':
                return `
                <div class="mobile mobile-search-select">
                    <button type="button" class="reset" onclick="mobileSearchItemClick('reset')"></button>
                    <button type="button" class="debth1" onclick="mobileSearchItemClick('debth1')">업무안내·자료</button>
                    <button type="button" class="debth2" onclick="mobileSearchItemClick('debth2')">뉴스·소식</button>
                </div>
                `;
        }
    }

    const detail = (id) => {
        return `
            <div class="expand-viewer detail_box" id="${id}" >
                <h5 class="blind">요약정보</h5>
                <div class="data-view">
                    <table>
                        <caption>
                            해당 건의 철제목, 관리기관, 보존기관, 기록물유형, 페이지정보, 발행일, 유형, 표현형태, 서고정보, 공개구분 등 기록물의 유형에 따라 상세정보를 다루고 있습니다
                        </caption>
                        <colgroup>
                            <col class="w15">
                            <col>
                            <col class="w15">
                            <col>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">철 제목</th>
                                <td colspan="3" class="data-title">
                                    <a href="#" title="철 페이지 이동">
                                        관세사 시험철1(2-1)
                                    </a>
                                </td>
                            </tr>
                            <tr></tr>
                            <tr>
                                <th scope="row">관리기관</th>
                                <td>영구기록물관리기관</td>
                                <th scope="row">보존기간</th>
                                <td>준영구</td>
                            </tr>
                            <tr>
                                <th scope="row">기록물유형</th>
                                <td>일반기록물</td>
                                <th scope="row">페이지정보</th>
                                <td>49~59 / 11</td>
                            </tr>
                            <tr>
                                <th scope="row">유형</th>
                                <td>실물</td>
                                <th scope="row">표현형태</th>
                                <td>시각</td>
                            </tr>
                            <tr></tr>
                            <tr>
                                <th>기록물건등록번호</th>
                                <td>2000122101100031500</td>
                                <th>전자/비전자 여부</th>
                                <td>비전자</td>
                            </tr>
                            <tr>
                                <th>생산등록일자</th>
                                <td>2000-02-18</td>
                                <th>시행일자</th>
                                <td>2000-02-18</td>
                            </tr>
                            <tr>
                                <th scope="row">서고정보</th>
                                <td>국가기록원 성남분원</td>
                                <th scope="row">공개구분</th>
                                <td class="open-box">
                                    <span class="cate-lb open">공개</span>
                                    <p>※국민의 사생활 보호를 위해 개인정보, 민감정보 등은 공개가 제한될 수 있습니다.</p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">UCI 코드</th>
                                <td colspan="3">
                                    <a href="javascript:scriptCopyUci('G500:1310377-02012015940844')" class="link">G500:1310377-02012015940844</a>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">원문 미리보기</th>
                                <td colspan="3">
                                    <div class="preview-box">
                                        <div class="preview-box-inner">
                                            <ul>
                                                <li>
                                                    <a href="#;">
                                                        <img src="https://placehold.co/100x133" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#;">
                                                        <img src="https://placehold.co/100x133" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#;">
                                                        <img src="https://placehold.co/100x133" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="preview-box-desc">
                                            <a href="#" class="link">[붙임1]</a>
                                            <p>…사업예정지 ④ 시장·군수 또는 구청장은 제3항의 규정에 의한 공고를 한 때에는 그 공고의 내용과 의견서를 제출할 수 있다는 뜻을 토지소유자 및 관계인에게 통지(소유자 및... ②건설교통부와그소속기관직제중 다음과 같이 개정한다. 제2조제3항중"토지수용법 제30조제…</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">붙임파일</th>
                                <td colspan="3">
                                <div class="hwp-list" style="display: block;">
                                    <ul>
                                    <li><a href="#" class="link">실습(기록대상유형구분).hwp</a></li>
                                    <li><a href="#" class="link">실습(관리기준표1).hwp</a></li>
                                    <li><a href="#" class="link">실습(관리기준표2).hwp</a></li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h5 class="sm-title mgt20">기여자 정보</h5>
                <div class="data-view">
                    <table>
                        <caption>기여자 정보 표기</caption>
                        <colgroup>
                            <col class="w15">
                            <col>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">서비스권자</th>
                                <td>국가기록원</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h5 class="sm-title mgt20">기술분류</h5>
                <div class="data-view">
                    <table>
                        <caption>기술분류</caption>
                        <colgroup>
                            <col class="w15">
                            <col>
                            <col class="w15">
                            <col>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">기록물군</th>
                                <td>
                                    <a class="link" href="/next/newsearch/viewDescClassContents.do?businessFunctionId=G00000000085&amp;descClassDiv=G&amp;descFullId=T00000000050/T00000000055/G00000000085" title="관세청 이동">
                                    관세청
                                    </a>
                                </td>
                                <th scope="row">기록물계열</th>
                                <td>
                                    <a class="link" href="/next/newsearch/viewDescClassContents.do?businessFunctionId=S00000000714&amp;descClassDiv=S&amp;descFullId=T00000000050/T00000000055/G00000000085/S00000000714" title="관세심사 이동">관세심사</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `
    }

    const paging = () => {
        return `
            <div class="pagelist">
                <div class="box_board_pagingBox">
                    <ul class="paging">
                        <a href="#none" class="paging_arrow">≪</a>
                        <a href="#none" class="paging_arrow">＜</a>
                        <a href="#none"class="active" onclick="rePage('1'); return false;">1</a>
                        <a href="#none" onclick="rePage('2'); return false;">2</a>
                        <a href="#none" onclick="rePage('3'); return false;">3</a>
                        <a href="#none" onclick="rePage('4'); return false;">4</a>
                        <a href="#none" onclick="rePage('5'); return false;">5</a>
                        <a href="#none" onclick="rePage('6'); return false;">6</a>
                        <a href="#none" onclick="rePage('7'); return false;">7</a>
                        <a href="#none" onclick="rePage('8'); return false;">8</a>
                        <a href="#none" onclick="rePage('9'); return false;">9</a>
                        <a href="#none" onclick="rePage('10'); return false;">10</a>
                        <a href="#none" onclick="rePage('2'); return false;" class="paging_arrow" title="next">＞</a>
                        <a href="#none" onclick="rePage('34435'); return false;" class="paging_arrow" title="end">≫</a>
                    </ul>						
                </div>
            </div>`
    }

    // 버튼 클릭시 템플릿 변경 및 active 처리
    recordFilter.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        console.log(btn);

        // 모든 li, button에서 active 제거
        recordFilter.querySelectorAll('li').forEach(li => {
            li.classList.remove('active');
            const button = li.querySelector('button');
            if (button) button.classList.remove('active');
        });

        // 현재 클릭된 버튼과 li에 active 추가
        btn.classList.add('active');
        const li = btn.closest('li');
        if (li) li.classList.add('active');

        // 템플릿 변경
        const type = btn.dataset.type;
        if(type === 'all'){
            recordList.innerHTML = `
            ${recordTemplateHeader}
            <div class="search-result-list all" style="margin-bottom: 20px;">
                ${rItem({}, true).repeat(3)}
            </div>

            ${workTemplateHeader}
            <div class="search-result-list">
                ${wItem({}, true).repeat(3)}
            </div>

            ${paging()}
            `;
        }else if(type === 'record'){
            recordList.innerHTML = `
            ${createTabMenu()}
            ${mobileSearch('rtype')}
            <div class="record-tab-contents">
                ${createRitemTab()}
            </div>
            ${defaultTemplateHeader}
            <div class="search-result-list">
                ${rItem({}, false).repeat(3)}
            </div>

            <div id="div_sub" style="display: none;">
                ${detail(1)}
            </div>

            ${paging()}
            `;

            // 페이징을 recordList 바로 다음에 추가
            // recordList.insertAdjacentHTML('afterend', paging());            
        }else if(type === 'work'){
            recordList.innerHTML = `
            ${mobileSearch('work')}
            <div class="work-tab-contents">
                ${createRworkTab()}
            </div>
            ${defaultTemplateHeader}
            <div class="search-result-list">
                ${wItem({}, false).repeat(3)}
            </div>

            ${paging()}
            `;
        }
    });

    document.addEventListener('click', function(e) {
        // 탭 클릭 이벤트 처리
        if (e.target.classList.contains('tab-btn')) {
            document.querySelectorAll('.record-tab li').forEach(li => li.classList.remove('active'));
            e.target.parentElement.classList.add('active');
        
            const tab = e.target.dataset.tab;
            const tabContentsContainer = document.querySelector('.record-tab-contents');
            const searchResultList = document.querySelector('.search-result-list');
            const searchResultListDiv = document.querySelector('.search-result-list');
            const divSub = document.getElementById('div_sub');
            const mobileSearchDiv = document.querySelector('.mobile-search-select');

            // 상세(div_sub)가 열려 있으면 닫고, 검색 결과(result) 영역을 보이게 처리
            if (divSub && divSub.style.display !== 'none') {
                divSub.style.display = 'none';
            }
            if (searchResultListDiv) {
                searchResultListDiv.style.display = '';
            }



            if (tabContentsContainer) {
                if (tab === 'ritem') {
                    // 기록물 건 탭: 모든 필터
                    if (mobileSearchDiv) {
                        mobileSearchDiv.innerHTML = mobileSearch('rtype');
                    }

                    tabContentsContainer.innerHTML = createRitemTab();
                    
                    // 헤더 영역 업데이트
                    const headerContainer = document.querySelector('.search-result-filter');
                    if (headerContainer) {
                        headerContainer.outerHTML = createRitemHeader(1085);
                    }
                    
                    // 검색 결과 영역 업데이트
                    if (searchResultList) {
                        searchResultList.innerHTML = rItem({}, false).repeat(3);
                    }

                } else if (tab === 'rfile') {
                    // 기록물 철 탭: 일부 필터만 (공개여부, 원문서비스 제외)
                    if (mobileSearchDiv) {
                        mobileSearchDiv.innerHTML = mobileSearch('rfile');
                    }

                    tabContentsContainer.innerHTML = createRfileTab();
                    
                    // 헤더 영역 업데이트
                    const headerContainer = document.querySelector('.search-result-filter');
                    if (headerContainer) {
                        headerContainer.outerHTML = createRfileHeader(500);
                    }
                    
                    // 검색 결과 영역 업데이트
                    if (searchResultList) {
                        searchResultList.innerHTML = rFile({}, false).repeat(3);
                    }
                }
            }
        }
        
        // more_view 버튼 클릭 이벤트 처리
        if (e.target.classList.contains('record-depth-institution') || e.target.closest('.record-depth-institution')) {
            const institutionCol = e.target.classList.contains('record-depth-institution') ? e.target : e.target.closest('.record-depth-institution');
            const recordDepthFilter = institutionCol.closest('.record-depth-filter');
            const tabContents = recordDepthFilter.parentElement.querySelector('.record-depth-institution-tab-contents');
            
            // record-depth-institution 클릭 시 record-depth-title에 active 클래스를 토글합니다.
            const recordDepthTitle = institutionCol.querySelector('.record-depth-title');
            if (recordDepthTitle) {
                const wasActive = recordDepthTitle.classList.contains('active');
                recordDepthTitle.classList.toggle('active');
                
                // record-depth-institution-tab-contents 토글
                if (tabContents) {
                    if (wasActive) {
                        tabContents.classList.remove('active');
                    } else {
                        tabContents.classList.add('active');
                    }
                }
                
                // 모든 record-depth-list ul들을 감추기/보이기
                const allRecordLists = recordDepthFilter.querySelectorAll('.record-depth-list');
                allRecordLists.forEach(ul => {
                    if (!wasActive) {
                        // active가 되었으므로 list를 감추기
                        ul.style.display = 'none';
                    } else {
                        // active가 해제되었으므로 list를 보이기
                        ul.style.display = '';
                    }
                });
                
                // 전역 버튼 상태 업데이트
                updateGlobalButtonState();
            }
        }
        
        // 업무자료 검색의 카테고리 제목 클릭 이벤트 처리
        if (e.target.classList.contains('work-depth-title')) {
            const workDepthCol = e.target.closest('.work-depth-col');
            const workDepthList = workDepthCol.querySelector('.work-depth-list');
            
            if (workDepthList) {
                const wasActive = e.target.classList.contains('active');
                e.target.classList.toggle('active');
                
                if (!wasActive) {
                    // active가 되었으므로 list를 감추기
                    workDepthList.style.display = 'none';
                } else {
                    // active가 해제되었으므로 list를 보이기
                    // 카테고리4의 경우 grid로, 나머지는 block으로 설정
                    if (workDepthCol.classList.contains('work-depth-category4')) {
                        workDepthList.style.display = 'grid';
                    } else {
                        workDepthList.style.display = 'block';
                    }
                }
                
                // 전역 버튼 상태 업데이트
                updateGlobalButtonState();
            }
        }
    });

    // 초기 템플릿 세팅
    recordList.innerHTML = `
        ${recordTemplateHeader}
        <div class="search-result-list all" style="margin-bottom: 20px;">
            ${rItem({}, true).repeat(3)}
        </div>

        ${workTemplateHeader}
        <div class="search-result-list">
            ${wItem({}, true).repeat(3)}
        </div>
    `;
});