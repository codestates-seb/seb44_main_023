import { useState } from "react";
import { styled } from "styled-components";
import Dropdown from "../../components/Dropdown/Dropdown";
import useQueryTodoGroupList from "../../query/todogroupList.query";
import useQueryLedgerGroupList from "../../query/ledgergroupList.query";

const ProfileGroupSetting = () => {
  const [mainGroup, setMainGroup] = useState({
    todoGroup: { key: "", label: "" },
    ledgerGroup: { key: "", label: "" },
  });

  const handleChangeGroup = (event) => {
    let newGroup = {
      ...mainGroup,
      [event.target.id]: JSON.parse(event.target.value),
    };
    setMainGroup(newGroup);
    localStorage.setItem("planfinity-group", JSON.stringify(newGroup));
  };

  const { isLoading: isTodoListLoading, data: todoGroup } =
    useQueryTodoGroupList();
  const { isLoading: isGroupListLoading, data: ledgerGroup } =
    useQueryLedgerGroupList();

  if (isTodoListLoading || isGroupListLoading) return null;
  return (
    <form onChange={handleChangeGroup}>
      <StyledWrapper>
        <div className="setting-box">
          <div className="setting-box-title">TODO</div>
          <Dropdown
            id="todoGroup"
            menu={
              todoGroup.length
                ? todoGroup.map((groupItem) => {
                    return {
                      label: groupItem.todo_group_title,
                      key: groupItem.todo_group_id,
                    };
                  })
                : []
            }
            defaultKey={mainGroup.todoGroup}
          />
        </div>
        <div className="setting-box">
          <div className="setting-box-title">가계부</div>
          <Dropdown
            id="ledgerGroup"
            menu={
              ledgerGroup.length
                ? ledgerGroup.map((groupItem) => {
                    return {
                      label: groupItem.ledger_group_title,
                      key: groupItem.ledger_group_id,
                    };
                  })
                : []
            }
            defaultKey={mainGroup.ledgerGroup}
          />
        </div>
      </StyledWrapper>
    </form>
  );
};

export default ProfileGroupSetting;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .setting-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .setting-box-title {
      margin-right: 4rem;
    }
  }
`;
