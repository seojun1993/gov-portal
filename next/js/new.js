const closeAllRecordDepthLists = () => {
    const allLists = document.querySelectorAll('.record-depth-list');
    const closeBtn = document.querySelector('.record-depth-close-btn');
    const tabContents = document.querySelector('.record-depth-institution-tab-contents');
    
    const isTabOpen = (tabContents && tabContents.classList.contains('active')) || 
                     document.querySelector('.record-depth-title.active') ||
                     Array.from(allLists).some(list => list.style.display !== 'none');
    
    if (isTabOpen) {
        // 전역 닫기: 모든 것을 닫고 초기화
        allLists.forEach(list => {
            list.style.display = 'none';
        });
        
        if (tabContents) {
            tabContents.classList.remove('active');
        }
        
        // 모든 record-depth-title의 active 클래스 제거 (전체 초기화)
        const allTitles = document.querySelectorAll('.record-depth-title');
        allTitles.forEach(title => {
            title.classList.remove('active');
        });
        
        // 전역 버튼 상태 업데이트
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
        
        const institutionTitle = document.querySelector('.record-depth-institution .record-depth-title');
        if (institutionTitle && institutionTitle.classList.contains('active') && tabContents) {
            tabContents.classList.add('active');
        }
        
        // 전역 버튼 상태 업데이트
        updateGlobalButtonState();
    }
}

const resetClick = () => {
    const recordHistoryList = document.querySelector('.record-depth-history-list');
    if (recordHistoryList) {
        recordHistoryList.innerHTML = '';
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

// 검색 결과 리스트 js 이거 보고 적용 하시면 됩니다.
document.addEventListener('DOMContentLoaded', () => {
    // 검색결과 탭메뉴 구현
    const recordFilter = document.getElementById('recordFilter');
    const recordList = document.getElementById('recordlist');
    const pagingDiv = document.querySelector('.pagelist');

    // 템플릿 정의
    // 전체
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
    
    // ===============================
    // 컴포넌트별 템플릿 함수들 정의
    // ===============================
    
    // 1. 탭 메뉴 생성 함수
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
    
    // 2. 개별 필터 함수들
    // 2-1. 기록물형태 필터
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
    
    // 2-2. 공개여부 필터
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
    
    // 2-3. 원문서비스 필터
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
    
    // 2-4. 생산연도 필터
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
    
    // 2-5. 생산기관 필터
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
    
    // 3. 생산기관 검색 탭 생성 함수
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
    
    // 4. 액션 섹션 생성 함수 (닫기 버튼, 히스토리, 액션 버튼들)
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
                            <button type="button" class="delete"></button>
                        </li>
                        <li class="record-depth-history-item">
                            <span>업무안내·자료</span>
                            <span>법령정보</span>
                            <span>소관법령</span>
                            <span>훈령·예규</span>
                            <button type="button" class="delete"></button>
                        </li>
                        <li class="record-depth-history-item">
                            <span>업무안내·자료</span>
                            <span>기록관리자료실</span>
                            <span>표준·지침·매뉴얼</span>
                            <span>기록물관리 표준</span>
                            <button type="button" class="delete"></button>
                        </li>
                        <li class="record-depth-history-item">
                            <span>업무안내·자료</span>
                            <span>기록관리자료실</span>
                            <span>표준·지침·매뉴얼</span>
                            <span>매뉴얼</span>
                            <button type="button" class="delete"></button>
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
            </div>
        `
    }
    
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
    
    // 7. 기록물 건 탭 헤더 생성 함수
    const createRitemHeader = (count = 1085) => {
        return `
            <div class="search-result-filter">
                <h5 class="blind">기록물 건 검색 결과 내 필터</h5>
                <div class="select">
                    <label class="single">
                        <input type="checkbox" id="listcheck_all" onchange="checkAll(this); return false;">
                        <span>전체(${count})</span>
                    </label>
                </div>
                <div class="sort">
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
    
    // 8. 기록물 철 탭 헤더 생성 함수
    const createRfileHeader = (count = 500) => {
        return `
            <div class="search-result-filter">
                <h5 class="blind">기록물 철 검색 결과 내 필터</h5>
                <div class="select">
                    <label class="single">
                        <input type="checkbox" id="listcheck_all" onchange="checkAll(this); return false;">
                        <span>전체(${count})</span>
                    </label>
                </div>
                <div class="sort">
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

    // 모바일용인가??
//     <div id="divOrderSelect" style="display:none;">
//     <select name="sortOrder" id="sortOrder" class="archive_unit_select" title="정렬방법을 선택하세요">
//       <option value="accuracy"  selected>정확도순</option>
//       <option value="dateAsc" >생산연도(과거순)</option>
//       <option value="dateDesc" >생산연도(최신순)</option>
//       <option value="titleAsc" >제목순(오름차순)</option>
//       <option value="titleDesc" >제목순(내림차순)</option>
//     </select>
//   </div>

    const defaultTemplateHeader = `
        <div class="search-result-filter">
            <h5 class="blind">검색 결과 내 필터</h5>
            <div class="select">
              <label class="single">
              <input type="checkbox" id="listcheck_all" onchange="checkAll(this); return false;">
                <span>전체(1,085)</span>
              </label>
            </div>
            <div class="sort">
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

    // 기록물/업무자료 공통 아이템 함수
    // all = true 면 selectbox 추가
    // data에 필요한 값들을 넣어서 사용
    const rItem = (data, all = false) => {
        let selectBox = '';
        let actionBox = '';
        let detailBox = '';

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

            detailBox = detail('detial_3');

        }
        // 기록물
        return `
          <div class="result-row ritem">     
            <div class="result-row-inner">
                ${selectBox}
                <div class="image-box">
                    <a href="#none" title="새창열림">
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
                    <a href="#" title="새창열림" >
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
                        사업예정지 ④ 시장·군수 또는 구청장은 제3항의 규정에 의한 공고를 한 때에는 그 공고의 내용과 의견서를 제출할 수 있다는 뜻을 토지소유자 및 관계인에게 통지(소유자 및... ②건설교통부와그소속기관직제중 다음과 같이 개정한다. 제2조제3항중"토지수용법 제30조제
                    </p>
                </div>
                <div class="expand">
                    <a class="btn summary i-arr-down" id="detial_3" href="#none" onclick="showDetail('1310377', '200302096758', '000000000040', 'detial_3'); return false;">요약정보</a>
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
        if(all){
            selectBox = `
            <div class="select">
              <label class="only">
                <input type="checkbox" name="idChk" id="listcheck_0" value="1310377-200902659556-000000000004"><span>선택</span>
              </label>
            </div>
            `;
        }
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
              <div class="title">
                <a href="#" title="새창열림" >
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
        if(all){
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
        `;
    };

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

    // 버튼 클릭시 템플릿 변경 및 active 처리
    recordFilter.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

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
            <div class="search-result-list" style="margin-bottom: 20px;">
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
                <div class="record-tab-contents">
                    ${createRitemTab()}
                </div>
                ${defaultTemplateHeader}
                <div class="search-result-list">
                    ${rItem({}, false).repeat(3)}
                </div>

                ${paging()}
            `;

            // 페이징을 recordList 바로 다음에 추가
            // recordList.insertAdjacentHTML('afterend', paging());            
        }else if(type === 'work'){
            recordList.innerHTML = `
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

            if (tabContentsContainer) {
                if (tab === 'ritem') {
                    // 기록물 건 탭: 모든 필터
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

                    

                    // searchResultList.innerHTML = `
                    //     ${defaultTemplateHeader}
                    //     <div class="search-result-list">
                    //         ${rItem({}, true).repeat(3)}
                    //     </div>
                    // `;

                } else if (tab === 'rfile') {
                    // 기록물 철 탭: 일부 필터만 (공개여부, 원문서비스 제외)
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
        if (e.target.classList.contains('more_view')) {
            const institutionCol = e.target.closest('.record-depth-institution');
            const recordDepthFilter = institutionCol.closest('.record-depth-filter');
            const tabContents = recordDepthFilter.parentElement.querySelector('.record-depth-institution-tab-contents');
            
            // more_view 버튼 토글
            // more_view 버튼이 아니라 부모의 record-depth-title에 active 클래스를 토글합니다.
            const recordDepthTitle = e.target.closest('.record-depth-title');
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
    });

    // 초기 템플릿 세팅
    recordList.innerHTML = `
        ${recordTemplateHeader}
        <div class="search-result-list" style="margin-bottom: 20px;">
            ${rItem({}, true).repeat(3)}
        </div>

        ${workTemplateHeader}
        <div class="search-result-list">
            ${wItem({}, true).repeat(3)}
        </div>
    `;
});

// 전역 버튼 상태 업데이트 함수
const updateGlobalButtonState = () => {
    const closeBtn = document.querySelector('.record-depth-close-btn');
    const tabContents = document.querySelector('.record-depth-institution-tab-contents');
    const activeTitle = document.querySelector('.record-depth-title.active');
    const allLists = document.querySelectorAll('.record-depth-list');
    
    // 현재 열린 상태인지 확인 (ul들의 display 상태도 포함)
    const isCurrentlyOpen = (tabContents && tabContents.classList.contains('active')) || 
                           activeTitle || 
                           Array.from(allLists).some(list => list.style.display !== 'none');
    
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
            const btn = event.target;
            const li = btn.closest('li');
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

