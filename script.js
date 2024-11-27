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
        selectable: false,
        editable: false,
        
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
        }
    });

    calendar.render();
}); 