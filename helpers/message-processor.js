var MessageBuilder = require('../helpers/message-builder');
var firebaseDatabase = require('firebase').database();
class MessageProcessor {
    constructor() {
        this.keywords = {
            "hello": "Chào, chúng tôi có thể làm gì cho bạn ?",
            "chào": function(content) {
                return MessageBuilder.simpleMessage("Chào, chúc bạn ngày mới vui vẻ");
            },
            "đặt": function(content, sendorId) {
                var timeRegex = /(\d+)(?:h|\sgiờ)/g;
                var matches = timeRegex.exec(content);
                var reserveTime = matches[1];

                firebaseDatabase.ref('/FbChatBot/Appointments').push({
                    sendorId: sendorId,
                    reserveTime: reserveTime,
                    message: content
                });

                return MessageBuilder.simpleMessage("Chúng tôi đã đặt lịch lúc " + reserveTime + " giờ cho bạn");
            }
        }
        this.result = null;
    }

    process(content, sendorId) {
        if (content.text) {
            var words = content.text.split(" ");
            words.forEach((word) => {
                if (this.keywords[word]) {
                    var response = this.keywords[word];
                    if (typeof response === 'string') {
                        this.result = MessageBuilder.simpleMessage(response);
                    } else if (typeof response === 'function') {
                        this.result = response(content.text, sendorId);
                    }
                }
            });
        }
        return this.result;
    }
}

module.exports = MessageProcessor;