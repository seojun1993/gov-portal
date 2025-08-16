// 검색 결과 리스트 js 이거 보고 적용 하시면 됩니다.
document.addEventListener('DOMContentLoaded', () => {
    // 검색결과 탭메뉴 구현
    const recordFilter = document.getElementById('recordFilter');
    const recordList = document.getElementById('recordlist');

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
            <a href="#" class="more_view">더보기</a>
        </div>
    </div>
    `;

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

        if(all){
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
              <div class="expand-viewer detail_box" id="detial_3" style="display: none;"></div>
            </div>
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
                    <li><button type="button" class="btn viewer" onclick="downloadEvent('viewer')">Viewer</button></li>
                    <li><button type="button" class="btn pdf" onclick="downloadEvent('pdf')">PDF</button></li>
                    <li><button type="button" class="btn hwp" onclick="downloadEvent('hwp')">HWP</button>
                      <div class="hwp-list">
                        <ul>
                          <li><button type="button" onclick="downloadEvent('')">실습(기록대상유형구분).hwp</button></li>
                          <li><button type="button" onclick="downloadEvent('')">실습(관리기준표1).hwp</button></li>
                          <li><button type="button" onclick="downloadEvent('')">실습(관리기준표2).hwp</button></li>
                        </ul>
                      </div>
                    </li>
                    <li><button type="button" class="btn link" onclick="downloadEvent('link')">LINK</button></li>
                    <li><button type="button" class="btn excel" onclick="downloadEvent('excel')">EXCEL</button></li>
                    <li><button type="button" class="btn mp4" onclick="downloadEvent('mp4')">MP4</button></li>
                    <li><button type="button" class="btn mv61" onclick="downloadEvent('mv61')">MV61</button></li>
                    <li><button type="button" class="btn etc" onclick="downloadEvent('etc')">기타</button></li>
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
                ${rItem({}).repeat(3)}
            </div>

            ${workTemplateHeader}
            <div class="search-result-list">
                ${wItem({}).repeat(3)}
            </div>
            `;
        }else if(type === 'record'){
            recordList.innerHTML = `

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
            <div class="record-tab-contents">
                <div class="record-tab-contents-item ritem-tab">
                    <div class="record-depth-filter">
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
                    </div>
                    
                    <div class="record-depth-close-wrap">
                        <button type="button" class="record-depth-close-btn" aria-label="닫기">닫기</button>
                    </div>

                <div class="record-depth-actions">
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
                    <div class="record-depth-btns">
                        <button type="button" class="btn reset">초기화</button>
                        <button type="button" class="btn search">검색</button>
                    </div>
                </div>
                </div>
                </div>
            </div>
            ${defaultTemplateHeader}
            <div class="search-result-list">
                ${rItem({}, true).repeat(3)}
            </div>
            `;
        }else if(type === 'work'){
            recordList.innerHTML = `
            ${defaultTemplateHeader}
            <div class="search-result-list">
                ${wItem({}, true).repeat(3)}
            </div>
            `;
        }
    });

    // ===================== 

    document.querySelectorAll('.record-tab .tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // 탭 active 처리
            document.querySelectorAll('.record-tab li').forEach(li => li.classList.remove('active'));
            this.parentElement.classList.add('active');
            // 컨텐츠 전환
            const tab = this.dataset.tab;
            document.querySelectorAll('.record-tab-contents-item').forEach(item => {
                item.classList.remove('active');
                item.style.display = 'none';
            });
            document.querySelector(`.record-tab-contents-item.${tab}-tab`).classList.add('active');
            document.querySelector(`.record-tab-contents-item.${tab}-tab`).style.display = '';
        });
    });

    // ===============================

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

// 전역 함수들
const downloadEvent = (type) => {
    switch(type){
        case 'viewer':
            break;
        case 'pdf':
            break;
        case 'hwp':
            // 모든 hwp-list를 우선 숨김 처리
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

