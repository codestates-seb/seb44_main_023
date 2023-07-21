import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import LedgerGroup from "../feature/Ledger/LedgerGroup";
import useQueryLedgerGroup from "../query/ledgergroup.query";
import LedgerContent from "../feature/Ledger/LedgerContent";

const LedgerPage = () => {
  const [pageType, setPageType] = useState("list");

  const location = useLocation();
  const navigate = useNavigate();

  const { groupId } = useParams();

  const handleChangeParameter = (type) => () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("type", type);
    const newSearch = searchParams.toString();
    const newUrl = window.location.pathname + "?" + newSearch;
    navigate(newUrl);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentParams = searchParams.get("type");
    setPageType(currentParams);
  }, [location]);

  const { isLoading, data } = useQueryLedgerGroup({ groupId });

  if (isLoading) return <StyledWrapper />;

  const { groupInfo, members } = data;

  return (
    <StyledWrapper>
      <LedgerGroup
        groupInfo={groupInfo}
        members={members}
        pageType={pageType}
        handleChangeParameter={handleChangeParameter}
      />
      <LedgerContent pageType={pageType} groupId={groupId} />
    </StyledWrapper>
  );
};

export default LedgerPage;

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
