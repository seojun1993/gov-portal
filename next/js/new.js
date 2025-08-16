// 검색 결과 리스트 js 이거 보고 적용 하시면 됩니다.
document.addEventListener('DOMContentLoaded', () => {
    // 검색결과 탭메뉴 구현
    const recordFilter = document.getElementById('recordFilter');
    const recordList = document.getElementById('recordlist');

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
            // recordList.innerHTML = allTemplate;
        }else if(type === 'record'){
            // recordList.innerHTML = recordTemplate;
        }else if(type === 'work'){
            // recordList.innerHTML = workTemplate;
        }
    });

    // 초기 템플릿 세팅 (필요시)
    // recordList.innerHTML = allTemplate;

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
                <span>업무자료 검색(1,085)</span>
                
            </div>
            <a href="#" class="more_view">더보기</a>
        </div>
    </div>
    `;

    // 기록물
    const recordTemplate = `
        <div class="record-all-list">
            <div class="record-all-list-top">
                <div class="record-list-title">
                    <span>기록물 검색(1,085)11</span>
                </div>
                <a href="#" class="more_view">더보기</a>
            </div>
        </div>
    `;

    // 업무자료
    const workTemplate = `
        <div class="record-all-list">
            <div class="record-all-list-top">
                <div class="record-list-title">
                    <span>기록물 검색(1,085)22</span>
                </div>
                <a href="#" class="more_view">더보기</a>
            </div>
        </div>
    `;
});

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
                    // 현재 열려있는지 확인
                    isOpen = hwpList.style.display === 'block';
                }
            }
            // 모든 hwp-list를 숨김 처리
            document.querySelectorAll('.hwp-list').forEach(el => {
                el.style.display = 'none';
            });
            // 클릭한 곳이 이미 열려있던 곳이 아니면 열기
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
}

// 검색결과 클릭
const showDsntRsn = (flag) => {
    const divNo = document.getElementById('fbAnDsntNoList'); 
    if(flag){
        divNo.style.display = 'flex';
        divNo.style.flexDirection = 'column';
        divNo.style.alignItems = 'flex-end';
    }else{
        divNo.style.display = 'none';
    }
}
