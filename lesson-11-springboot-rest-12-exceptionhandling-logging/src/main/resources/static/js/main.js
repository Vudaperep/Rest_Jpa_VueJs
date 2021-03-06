var messageApi = Vue.resource('/pt11/cars')

Vue.component('message-form', {
    props: ['messages'],
    data: function () {
        return {
            text: ''
        }
    },
    template:
        '<div>' +
        '<input type = "text" placeholder="Write some" v-model="text"/> ' +
        '<input type = "button" value="Save" @click="save"/> ' +
        '</div>',
    methods: {
        save: function () {
            var message = {text: this.text};

            messageApi.save({}, message).then(result = >
            result.json().then(data = > {
                this.messages.push(data);
            this.text = ' '
        })
        )
        }
    }
});

Vue.component('message-row', {
    props: ['message'],
    template: '<div><i>({{ message.id }})</i> {{ message.model }} {{ message.colour }}</div>'
});

Vue.component('messages-list', {
    props: ['messages'],
    template: '<div>' +
        '<message-form :messages="messages" />' +
        '<message-row v-for="message in messages" :key="message.id" :message="message" />+' +
        '</div>',
    created: function () {
        messageApi.get().then(result = >
        result.json().then(data = >
        data.forEach(message = > this.messages.push(message)
    ))
    )
    }
});

new Vue({
    el: '#app',
    template: '<messages-list :messages="messages" />',
    data: {
        messages: []
    }
});
