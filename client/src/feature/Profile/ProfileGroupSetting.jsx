import { styled } from "styled-components";
import Dropdown from "../../components/Dropdown/Dropdown";
import useQueryTodoGroupList from "../../query/todogroupList.query";
import useQueryLedgerGroupList from "../../query/ledgergroupList.query";
import useMainGroupStore from "../../store/store.mainGroup";

const ProfileGroupSetting = () => {
  const { mainGroup, updateMainGroup } = useMainGroupStore();

  const { isLoading: isTodoListLoading, data: todoGroup } =
    useQueryTodoGroupList();
  const { isLoading: isGroupListLoading, data: ledgerGroup } =
    useQueryLedgerGroupList();

  const handleChangeGroup = (event) => {
    updateMainGroup(event.target);
  };

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
