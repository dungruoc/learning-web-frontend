'use strict';

const poll = {
    question: 'What is your favorite programming language?',
    options: ['0: Javascript', '1: Python', '2: Rust', '3: Java', '4: C++'],
    answers: new Array(5).fill(0),

    registerNewAnswer() {
        const q = [this.question, ...this.options].join('\n')
        let res = prompt(q);
        res = res && Number(res);
        console.log(res, typeof res);
        typeof res === 'number' && (res >= 0) && (res < this.answers.length) && (this.answers[res]++);
        console.log(this.answers);
    }
};

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

