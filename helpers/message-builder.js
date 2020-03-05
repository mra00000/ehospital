class MessageBuilder {
    static simpleMessage(content) {
        return {
            "text": content
        }
    }
}

module.exports = MessageBuilder;