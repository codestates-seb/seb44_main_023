import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import LedgerGroup from "../feature/Ledger/LedgerGroup";
import useQueryLedgerGroup from "../query/ledgergroup.query";
import LedgerContent from "../feature/Ledger/LedgerContent";
import Button from "../components/Button/Button";
import Loading from "../components/Loading/Loading";

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

	if (isLoading)
		return (
			<StyledWrapper>
				<Loading />
			</StyledWrapper>
		);
	else if (!data?.groupInfo)
		return (
			<StyledWrapper
				style={{
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div className="ledger-empty-text">존재하지 않는 TODO 그룹입니다</div>
				<Button
					onClick={() => navigate("/")}
					label="Main으로 돌아가기"
					size="medium"
					style={{
						backgroundColor: "var(--color-blue-03)",
						width: "max-content",
						padding: "0 2rem",
					}}
				/>
			</StyledWrapper>
		);

	const { groupInfo, members } = data;

	return (
		<StyledWrapper>
			<LedgerGroup
				groupInfo={groupInfo}
				members={members}
				pageType={pageType}
				handleChangeParameter={handleChangeParameter}
			/>
			<LedgerContent
				pageType={pageType}
				groupId={groupId}
				groupInfo={groupInfo}
			/>
		</StyledWrapper>
	);
};

export default LedgerPage;

const StyledWrapper = styled.div`
	height: 100%;
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	position: relative;

	.ledger-empty-text {
		font-size: 2.4rem;
		margin-bottom: 4rem;
	}
`;
