// 가짜 데이터 생성// 가짜 데이터 생성
export const generateFakeData = (count) => {
  const categories = [
    { category_id: 1, category_name: "앙" },
    { category_id: 2, category_name: "자기계발" },
    { category_id: 3, category_name: "식비" },
    { category_id: 4, category_name: "아기" },
    { category_id: 5, category_name: "딴거" },
    { category_id: 6, category_name: "담배" },
    { category_id: 7, category_name: "카페" },
    { category_id: 8, category_name: "술" },
    { category_id: 9, category_name: "바보야" },
  ];

  const generatedData = [];
  const startDate = new Date("2023-07-01");
  const endDate = new Date("2023-07-31");

  while (generatedData.length < count) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const amount = Math.floor(Math.random() * 49001) + 1000;
    const inOutcome = Math.random() < 0.5 ? "지출" : "수입";

    const newData = {
      ledger_id: generateUUID(),
      ledger_title: generateRandomWords(3),
      ledger_content: generateRandomSentence(),
      amount: amount,
      category: {
        category_id: randomCategory.category_id,
        category_name: randomCategory.category_name,
      },
      payment: {
        payment_id: Math.floor(Math.random() * 5) + 1,
        payment_name: generateTransactionType(),
      },
      in_outcome: {
        in_outcome_id: inOutcome === "지출" ? 1 : 2,
        in_outcome_name: inOutcome,
      },
      ledger_schedule_date: formatDate(startDate),
    };

    generatedData.push(newData);

    startDate.setDate(startDate.getDate() + 1);
    if (startDate > endDate) {
      startDate.setDate(startDate.getDate() - 30);
    }
  }

  return generatedData;
};

// UUID 생성 함수
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// 랜덤 단어 생성 함수
const generateRandomWords = (count) => {
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(generateRandomWord());
  }
  return words.join(" ");
};

// 랜덤 단어 생성 함수
const generateRandomWord = () => {
  const syllables = ["lo", "rem", "ip", "sum", "do", "lor"];
  const syllableCount = Math.floor(Math.random() * 3) + 1;
  const word = [];
  for (let i = 0; i < syllableCount; i++) {
    word.push(syllables[Math.floor(Math.random() * syllables.length)]);
  }
  return word.join("");
};

// 랜덤 문장 생성 함수
const generateRandomSentence = () => {
  const words = generateRandomWords(Math.floor(Math.random() * 5) + 5);
  return words.charAt(0).toUpperCase() + words.slice(1) + ".";
};

// 트랜잭션 타입 생성 함수
const generateTransactionType = () => {
  const types = ["계좌이체", "카드결제", "현금", "가상화폐", "기타"];
  return types[Math.floor(Math.random() * types.length)];
};

// 날짜 포맷팅 함수 (YYYY-MM-DD)
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
