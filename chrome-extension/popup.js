document.addEventListener('DOMContentLoaded', function() {
    const smsInput = document.getElementById('smsInput');
    const checkSmsButton = document.getElementById('checkSms');
    const smsResult = document.getElementById('smsResult');
    
    const urlInput = document.getElementById('urlInput');
    const checkUrlButton = document.getElementById('checkUrl');
    const urlResult = document.getElementById('urlResult');

    checkSmsButton.addEventListener('click', () => {
        const smsContent = smsInput.value;
        
        fetch('http://localhost:3000/check-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ smsContent })
        })
        .then(response => response.json())
        .then(data => {
            smsResult.textContent = data.isSpam ? 'This SMS is likely spam.' : 'This SMS is safe.';
        });
    });

    checkUrlButton.addEventListener('click', () => {
        const urlContent = urlInput.value;

        fetch('http://localhost:3000/check-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ urlContent })
        })
        .then(response => response.json())
        .then(data => {
            urlResult.textContent = data.isSpam ? 'This URL is likely spam.' : 'This URL is safe.';
        });
    });
});
