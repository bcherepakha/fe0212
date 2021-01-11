'use strict';
// LE = { this: Window }

const fe0212 = {
    title: 'fe0212',
    students: ['Robb', 'Heorhii', 'Roman', 'Tanya', 'Yuliia'],

    showStudentsList() {
        console.log(this.title);

        for (let i=0; i < this.students.length; i++) {
            console.log(i, this.students[i]);
        }
    }
};

function showStudentsList() {
    console.log(this, arguments); // fe0212
}

fe0212.showStudentsList(); // LEN = {  }

const b = showStudentsList.bind({}); // function () { return f.call(context, ...args) }
b.bind(fe0212).call(null); // this = {}
