const socket = io.connect()

function renderMessage(messages) {
    const html = messages
        .map((message) => {
            return `<div>
                            <strong class="email">${message.email}</strong>
                            <em class="timestamp">[${message.timestamp}]</em>:
                            <em class="text">${message.text}</em>
                        </div>`
        })
        .join(' ')
    document.getElementById('messages').innerHTML = html
}

socket.on('messages', (messages) => {
    renderMessage(messages)
})

document.getElementById('chat').addEventListener('submit', (e) => {
    e.preventDefault()
})

function addMessage() {
    const newMessage = {
        email: document.getElementById('email').value,
        text: document.getElementById('text').value
    }
    socket.emit('new-message', newMessage)
}
