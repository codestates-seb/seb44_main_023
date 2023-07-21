import { styled } from "styled-components";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import dayjs from "dayjs";

const GraphBar = ({ ledgerList, selectedMonth }) => {
  const startDate = dayjs(selectedMonth).startOf("month");
  const endDate = dayjs(selectedMonth).endOf("month");

  const dateRange = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateRange.push(dayjs(currentDate).format("YYYY-MM-DD"));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const groupedData = dateRange.reduce((acc, date) => {
    acc[date] = [];

    const items = ledgerList.filter(
      (item) =>
        item.ledger_schedule_date === date && item.inoutcome.inoutcomeId === 1
    );

    if (items.length > 0) {
      acc[date] = items;
    }

    return acc;
  }, {});

  const totalsByDate = [];

  for (const date in groupedData) {
    const items = groupedData[date];
    const totalAmount = items.reduce(
      (sum, item) => sum + item.ledger_amount,
      0
    );
    totalsByDate.push({ date, totalAmount });
  }

  const renderCustomAxisTick = (props) => {
    const { x, y, payload } = props;
    const date = new Date(payload.value);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          {formattedDate}
        </text>
      </g>
    );
  };

  return (
    <StyledWrapper>
      <BarChart
        width={totalsByDate.length * 45}
        height={200}
        data={totalsByDate}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={renderCustomAxisTick} interval={0} />
        <YAxis tickFormatter={(value) => `${value / 1000}K`} />
        <Bar dataKey="totalAmount" fill="#8ABDE7" />
      </BarChart>
    </StyledWrapper>
  );
};

export default GraphBar;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
`;
