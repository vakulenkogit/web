let totalStudents = 0;
let excellentCount = 0;
let goodCount = 0;
let badCount = 0;

let badSurnames = [];
let students = [];

function getMarks() {
    return [
        Number(document.getElementById('mark1').value),
        Number(document.getElementById('mark2').value),
        Number(document.getElementById('mark3').value),
        Number(document.getElementById('mark4').value),
        Number(document.getElementById('mark5').value)
    ];
}

function classifyStudent(marks) {
    const hasTwo = marks.includes(2);
    const hasThree = marks.includes(3);
    const allFive = marks.every(x => x === 5);
    const only4or5 = marks.every(x => x === 4 || x === 5);

    if (allFive) return "відмінник";
    if (only4or5) return "хорошист";
    if (hasTwo || hasThree) return "неуспішний";
    return "неуспішний";
}

function updateResultView() {
    document.getElementById('total').textContent = totalStudents;
    document.getElementById('excellent').textContent = excellentCount;
    document.getElementById('good').textContent = goodCount;
    document.getElementById('bad').textContent = badCount;

    document.getElementById('badNames').textContent =
        badSurnames.length ? badSurnames.join(', ') : '-';

    if (students.length === 0) {
        document.getElementById('studentTable').innerHTML = "—";
        return;
    }

    let html = "";
    students.forEach((st, i) => {
        html += `
        <div class="student-block">
            <b>${i + 1}. ${st.surname}</b><br>
            КПпро: ${st.marks[0]}<br>
            ВР: ${st.marks[1]}<br>
            АК: ${st.marks[2]}<br>
            МодС: ${st.marks[3]}<br>
            СПЗ: ${st.marks[4]}<br>
            <b>Результат: ${st.result}</b>
        </div>`;
    });

    document.getElementById('studentTable').innerHTML = html;
}

document.getElementById('randomBtn').onclick = function () {
    for (let i = 1; i <= 5; i++) {
        const value = 2 + Math.floor(Math.random() * 4);
        document.getElementById("mark" + i).value = value;
    }
};

document.getElementById('addBtn').onclick = function () {
    const surname = document.getElementById('surname').value.trim();
    if (!surname) {
        alert("Введіть прізвище!");
        return;
    }

    const marks = getMarks();
    const category = classifyStudent(marks);

    students.push({ surname, marks, result: category });

    totalStudents++;
    if (category === "відмінник") excellentCount++;
    else if (category === "хорошист") goodCount++;
    else {
        badCount++;
        badSurnames.push(surname);
    }

    document.getElementById('surname').value = "";
    updateResultView();
};