import { styled } from "styled-components";
import "dayjs/locale/ko";
import Button from "../../components/Button/Button";
import GroupInfo from "../../components/Group/GroupInfo";

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
      <GroupInfo title={ledger_group_title} members={members.members} />
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
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
`;
