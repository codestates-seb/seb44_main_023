export function wheelHandler(e) {
  e.preventDefault();
  const { deltaY } = e;
  const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
  const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

  if (deltaY > 0) {
    // 스크롤 내릴 때
    if (scrollTop >= 0 && scrollTop < pageHeight) {
      //현재 1페이지
      console.log("현재 1페이지, down");
      outerDivRef.current.scrollTo({
        top: pageHeight + DIVIDER_HEIGHT,
        left: 0,
        behavior: "smooth",
      });
      setScrollIndex(2);
    } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
      //현재 2페이지
      console.log("현재 2페이지, down");
      outerDivRef.current.scrollTo({
        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
        left: 0,
        behavior: "smooth",
      });
      setScrollIndex(3);
    } else {
      // 현재 3페이지
      console.log("현재 3페이지, down");
      outerDivRef.current.scrollTo({
        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
        left: 0,
        behavior: "smooth",
      });
      setScrollIndex(3);
    }
  } else {
    // 스크롤 올릴 때
    if (scrollTop >= 0 && scrollTop < pageHeight) {
      //현재 1페이지
      console.log("현재 1페이지, up");
      outerDivRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setScrollIndex(1);
    } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
      //현재 2페이지
      console.log("현재 2페이지, up");
      outerDivRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setScrollIndex(1);
    } else {
      // 현재 3페이지
      console.log("현재 3페이지, up");
      outerDivRef.current.scrollTo({
        top: pageHeight + DIVIDER_HEIGHT,
        left: 0,
        behavior: "smooth",
      });
      setScrollIndex(2);
    }
  }
}
