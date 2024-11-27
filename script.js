document.addEventListener('DOMContentLoaded', function() {
    // カレンダーの初期化
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        locale: 'ja',
        selectable: true,
        editable: true,
        
        // LocalStorageからイベントを読み込む
        events: function(fetchInfo, successCallback, failureCallback) {
            try {
                const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
                successCallback(events);
            } catch (error) {
                failureCallback(error);
            }
        },

        // イベントクリック時のイベント
        eventClick: function(info) {
            // イベントの詳細ページに遷移
            const event = info.event;
            const params = new URLSearchParams({
                id: event.id,
                title: event.title,
                description: event.extendedProps.description || '',
                start: event.start.toISOString(),
                end: event.end ? event.end.toISOString() : ''
            });
            
            window.location.href = `event.html?${params.toString()}`;
        },

        // 新規イベント追加ボタン
        customButtons: {
            addEvent: {
                text: '新規イベント',
                click: function() {
                    window.location.href = 'post.html';
                }
            }
        },
        headerToolbar: {
            left: 'prev,next today addEvent',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }
    });

    calendar.render();

    // モーダルを閉じる処理
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.onclick = function() {
            this.closest('.modal').style.display = 'none';
        }
    });

    // モーダル外クリックで閉じる
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }

    // イベント追加フォームの送信処理
    document.getElementById('addEventForm').onsubmit = function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const start = document.getElementById('start').value;
        const end = document.getElementById('end').value;

        // カレンダーにイベントを追加
        calendar.addEvent({
            title: title,
            description: description,
            start: start,
            end: end
        });

        // フォームをリセットしてモーダルを閉じる
        this.reset();
        document.getElementById('addEventModal').style.display = 'none';
    }

    // 日付フォーマット用関数
    function formatDate(date) {
        if (!date) return '';
        return new Date(date).toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}); 