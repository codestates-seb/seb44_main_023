export const isValidEmail = (email) => {
	// 이메일 유효성 검사 로직 작성
	// 유효한 이메일 형식인 경우 true 반환, 그렇지 않은 경우 false 반환
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
