var students = [
  { name: "John", score1: 47, score2: 46 },
  { name: "Bob", score1: 23, score2: 24 },
  { name: "Nick", score1: 40, score2: 35 },
  { name: "Alex", score1: 44, score2: 45 },
];

console.log(students);

const degree = function (totalScore) {
  if (totalScore >= 91) {
    return "A";
  } else if (totalScore >= 81) {
    return "B";
  } else if (totalScore >= 71) {
    return "C";
  } else if (totalScore >= 61) {
    return "D";
  } else if (totalScore >= 51) {
    return "E";
  } else if (totalScore < 41) {
    return "F";
  }
  return -1;
};

function calculate(payload) {
  payload.map((item) => {
    let totalScore = item.score1 + item.score2;
    Object.assign(item, {
      totalScore: totalScore,
      degree: degree(totalScore),
    });
  });
  console.log(payload);
  return payload;
}

calculate(students);
