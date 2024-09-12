import React from 'react';
import style from './PieCharts.module.scss';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { formatMoney } from '../../../Helper.jsx';
import { useIntl } from 'react-intl';

function PieCharts({ data, currency, height, width, name, value, cardHeader, title, colors, country }) {
  const intl = useIntl();
  const RADIAN = Math.PI / 180;
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className={style.legend}>
        {payload?.map((entry, index) => (
          <div className={style.legendItemContainer} key={`item-${index}`}>
            <div
              className={style.legendIndicator}
              style={{ background: country ? colors[entry.value] : entry.color }}
            ></div>
            <div className={style.legendItem}>
              {intl.formatMessage({ id: entry.value, defaultMessage: `${entry.value}` })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) + 20;
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if ((percent * 100).toFixed(0) > 3)
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(1)}%`}
        </text>
      );
  };

  return (
    <ResponsiveContainer width="100%" height={height ? height + '%' : '100%'}>
      <PieChart>
        <Legend
          width="auto"
          layout="horizontal"
          align="right"
          verticalAlign="top"
          wrapperStyle={{ right: '20px' }}
          content={renderLegend}
        />
        <Pie label={renderCustomizedLabel} labelLine={false} data={data} dataKey={value} nameKey={name}>
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={country ? colors[entry.countryName] : colors[index % colors?.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, datakey) => [
            `${formatMoney(value)}`,
            `${intl.formatMessage({ id: datakey, defaultMessage: datakey })}`,
          ]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieCharts;
