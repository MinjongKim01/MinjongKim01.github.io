// 1. Firebase 라이브러리 임포트 (CDN 방식)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, limit } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. Firebase 설정 (본인의 키값으로 교체하세요!)
const firebaseConfig = {
  apiKey: "AIzaSyAQLY8tCXACRBur3qyZH75Sy1GQIjdDMSk",
  authDomain: "personal-hompage-3f993.firebaseapp.com",
  projectId: "personal-hompage-3f993",
  storageBucket: "personal-hompage-3f993.firebasestorage.app",
  messagingSenderId: "98805444808",
  appId: "1:98805444808:web:9ad5b3298c98595632b5fd"
};

// 3. 앱 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. DOM 요소 가져오기
const nameInput = document.getElementById('gb-name');
const contentInput = document.getElementById('gb-content');
const submitBtn = document.getElementById('gb-submit');
const listContainer = document.getElementById('guestbook-list');

// 5. 메시지 저장 함수 (Create)
async function saveMessage() {
    const name = nameInput.value.trim();
    const content = contentInput.value.trim();

    if (!name || !content) {
        alert("이름과 내용을 모두 입력해주세요!");
        return;
    }

    try {
        await addDoc(collection(db, "guestbook"), {
            name: name,
            message: content,
            timestamp: new Date() // 서버 시간이 아닌 로컬 시간 기준 (간편함)
        });

        emailjs.send("service_hfspbfg", "template_x2x12uq", {
            from_name: name,    // 템플릿의 {{from_name}}에 들어감
            message: content    // 템플릿의 {{message}}에 들어감
        });
        
        // 입력창 비우기
        contentInput.value = '';
        alert("방명록이 등록되었습니다! (주인장에게 알림이 전송되었습니다.)");
    } catch (e) {
        console.error("Error adding document: ", e);
        alert("등록 중 오류가 발생했습니다.");
    }
}

// 버튼 클릭 이벤트
submitBtn.addEventListener('click', saveMessage);

// 6. 실시간 데이터 불러오기 (Read)
const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"), limit(20));

onSnapshot(q, (snapshot) => {
    // 로딩 메시지 제거
    listContainer.innerHTML = '';

    snapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
        
        // 날짜 포맷팅 (YYYY.MM.DD)
        const dateStr = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;

        // HTML 요소 생성
        const item = document.createElement('div');
        item.className = 'gb-item';
        item.innerHTML = `
            <div class="gb-content-wrapper">
                <span class="gb-author">${escapeHtml(data.name)}</span>
                <span class="gb-text">${escapeHtml(data.message)}</span>
            </div>
            <span class="gb-date">${dateStr}</span>
        `;
        listContainer.appendChild(item);
    });

    if(snapshot.empty) {
        listContainer.innerHTML = '<p style="text-align:center; color:var(--text-light);">첫 번째 방문자가 되어주세요!</p>';
    }
});

// XSS 방지용 함수 (보안)
function escapeHtml(text) {
    if (!text) return text;
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}