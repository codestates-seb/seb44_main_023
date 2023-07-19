import { styled } from "styled-components";
import { PieChart, Pie, Cell } from "recharts";

const GraphPie = ({ ledgerList }) => {
  const COLORS = ["#2085D9", "#569FDC", "#8ABDE7", "#B1D9FA", "#C9C9C9"];

  const groupedData = ledgerList.reduce((acc, curr) => {
    const { ledger_amount } = curr;
    const { categoryId, categoryName } = curr.category;

    if (curr.inoutcome.inoutcomeId === 1) {
      if (!acc[categoryId]) {
        acc[categoryId] = {
          categoryId,
          categoryName,
          ledger_amount: 0,
        };
      }
      acc[categoryId].ledger_amount += ledger_amount;
    }

    return acc;
  }, {});

  const categories = Object.values(groupedData);
  const totalAmount = categories.reduce(
    (acc, curr) => acc + curr.ledger_amount,
    0
  );

  const sortedCategories = categories.sort(
    (a, b) => b.ledger_amount - a.ledger_amount
  );

  const topCategories = sortedCategories.slice(0, 4);
  const otherCategories = sortedCategories.slice(4);

  const otherAmount = otherCategories.reduce(
    (acc, curr) => acc + curr.ledger_amount,
    0
  );

  const combinedCategory = {
    categoryName: "기타",
    ledger_amount: otherAmount,
    percentage: ((otherAmount / totalAmount) * 100).toFixed(1),
  };

  const pieData = [...topCategories, combinedCategory].map((category) => {
    const percentage = ((category.ledger_amount / totalAmount) * 100).toFixed(
      1
    );
    return {
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      ledger_amount: category.ledger_amount,
      percentage: parseFloat(percentage),
    };
  });

  if (otherCategories.length === 0)
    return (
      <StyledWrapper>
        <div className="empty">지출데이터가 없습니다.</div>
      </StyledWrapper>
    );
  return (
    <StyledWrapper>
      <PieChart width={240} height={240}>
        <Pie
          dataKey="ledger_amount"
          nameKey="categoryName"
          outerRadius={120}
          data={pieData}
          paddingAngle={1}
          activeShape={null}
          stroke="none"
          cx="50%"
          cy="50%"
          labelLine={false}
        >
          {pieData.map((_, index) => {
            return (
              <Cell
                style={{
                  outline: "none",
                }}
                key={`cell-${index}`}
                fill={COLORS[index]}
              />
            );
          })}
        </Pie>
      </PieChart>
      <LegendWrapper>
        {pieData.map((item, index) => (
          <LegendItem key={`legend-item-${index}`} color={COLORS[index]}>
            <div className="percentage">{item.percentage}%</div>
            <div className="label">{item.categoryName}</div>
          </LegendItem>
        ))}
      </LegendWrapper>
    </StyledWrapper>
  );
};

export default GraphPie;

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 4.8rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 12rem;

  .empty {
    font-size: 2rem;
  }
`;

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const LegendItem = styled.div`
  display: flex;
  font-size: 1.6rem;
  gap: 1.2rem;
  width: 100%;
  align-items: center;

  .percentage {
    text-align: center;
    background-color: ${({ color }) => color};
    border-radius: 5px;
    padding: 0.4rem 0;
    width: 5.6rem;
    color: var(--color-white);
  }
`;
