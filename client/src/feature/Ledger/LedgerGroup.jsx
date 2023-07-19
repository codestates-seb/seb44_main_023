import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Button from "../../components/Button/Button";

const LedgerGroup = ({
  groupInfo,
  members,
  pageType,
  handleChangeParameter,
}) => {
  const { ledger_group_title } = groupInfo;

  let unselectedColor = {
    border: "1px solid var(--color-blue-03)",
    color: "var(--color-blue-03)",
    backgroundColor: "var(--color-white)",
    fontSize: "1.6rem",
  };

  let selectedColor = {
    backgroundColor: "var(--color-blue-03)",
    fontSize: "1.6rem",
  };

  return (
    <StyledWrapper>
      <GroupInfo>
        <Title>{ledger_group_title}</Title>
        <MemberWrapper>
          <Member>
            <div className="member-title">member</div>
            {members.members.map((member) => (
              <img
                key={`member-${member.member_id}`}
                id={member.member_id}
                src={member.profile_image}
              />
            ))}
          </Member>
        </MemberWrapper>
      </GroupInfo>
      <ButtonWrapper>
        <Button
          size="medium"
          style={pageType === "calendar" ? selectedColor : unselectedColor}
          label="달력형"
          onClick={handleChangeParameter("calendar")}
        />
        <Button
          size="medium"
          label="리스트형"
          style={pageType === "list" ? selectedColor : unselectedColor}
          onClick={handleChangeParameter("list")}
        />
      </ButtonWrapper>
    </StyledWrapper>
  );
};

export default LedgerGroup;

const StyledWrapper = styled.div`
  padding: 6.4rem 6.4rem 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3.6rem;
`;

const GroupInfo = styled.div`
  display: block;
`;

const Title = styled.div`
  font-size: 3.2rem;
`;

const MemberWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
`;
