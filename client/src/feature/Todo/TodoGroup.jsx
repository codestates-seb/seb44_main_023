import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Avatar from "../../assets/avatar.svg";

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

  const handleErrorImage = (e) => {
    const randomHue = Math.floor(Math.random() * 360);
    e.target.src = Avatar;
    e.target.style.filter = `invert(16%) sepia(89%) saturate(6054%) hue-rotate(${randomHue}deg) brightness(97%) contrast(113%)`;
  };

  return (
    <StyledWrapper>
      <Title>{todo_group_title}</Title>
      <div className="member-nav">
        <Member>
          <div className="member-title">member</div>
          {members.map((member) => (
            <>
              <img
                key={`member-${member.member_id}`}
                id={member.member_id}
                src={member.profild_image}
                onError={handleErrorImage}
              />
            </>
          ))}
        </Member>
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

  .member-nav {
    display: flex;
    align-items: end;
    justify-content: space-between;
  }
`;

const Title = styled.div`
  font-size: 3.2rem;
  font-weight: bold;
`;

const Member = styled.div`
  font-size: 2.4rem;
  display: flex;
  align-items: center;
  justif-content: center;

  .member-title {
    margin-right: 1.2rem;
  }

  img {
    margin-right: -1rem;
    border-radius: 100%;
    width: 100%;
    width: 4rem;
    height: 4rem;
    object:fit: conver;
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
