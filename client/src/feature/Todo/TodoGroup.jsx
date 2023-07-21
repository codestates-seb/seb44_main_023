import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import GroupInfo from "../../components/Group/GroupInfo";

const TodoGroup = ({ groupInfo, members, setStartDate }) => {
  const { todo_group_title } = groupInfo;

  const handleSelectedDate = (type) => () => {
    switch (type) {
      case "PREV":
        setStartDate((startDate) => startDate.clone().subtract(7, "day"));
        break;
      case "TODAY":
        setStartDate(dayjs().locale("ko").startOf("week").add(1, "day"));
        break;
      case "NEXT":
        setStartDate((startDate) => startDate.clone().add(7, "day"));
        break;
      default:
        break;
    }
  };

  return (
    <StyledWrapper>
      <GroupInfo title={todo_group_title} members={members} />
      <div className="member-nav">
        <DateNavigation>
          <div
            className="week-button prev"
            onClick={handleSelectedDate("PREV")}
          >
            <AiOutlineLeft />
            Prev
          </div>
          <div
            className="week-button today"
            onClick={handleSelectedDate("TODAY")}
          >
            Today
          </div>
          <div
            className="week-button next"
            onClick={handleSelectedDate("NEXT")}
          >
            Next
            <AiOutlineRight />
          </div>
        </DateNavigation>
      </div>
    </StyledWrapper>
  );
};

export default TodoGroup;

const StyledWrapper = styled.div`
  padding: 6.4rem 6.4rem 0;
  margin-bottom: 4rem;
  display: flex;
  align-items: end;
  justify-content: space-between;

  .member-nav {
    display: flex;
    align-items: end;
    justify-content: space-between;
  }
`;

const DateNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.8rem;
  font-size: 2rem;

  .week-button {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;
