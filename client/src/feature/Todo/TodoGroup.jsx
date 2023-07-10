import { styled } from "styled-components";

const TodoGroup = ({ groupInfo }) => {
  const { members, todo_group_id, todo_group_title } = groupInfo;

  return (
    <StyledWrapper>
      <Title>{todo_group_title}</Title>
      <Member>
        <div className="member-title">member</div>
        {members.map((member) => (
          <img id={member.member_id} src={member.member_profile_image} />
        ))}
        <div></div>
      </Member>
    </StyledWrapper>
  );
};

export default TodoGroup;

const StyledWrapper = styled.div`
  padding: 64px 64px 0;
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
    margin-right: 12px;
  }

  img {
    margin-right: -10px;
    border-radius: 100%;
    width: 100%;
    width: 4rem;
    height: 4rem;
    object:fit: conver;
  }
`;
