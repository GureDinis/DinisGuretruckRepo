import React from 'react';
import style from './CustomPieChart.module.scss';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useIntl } from 'react-intl';
import { formatMoney } from '../../../Helper.jsx';
import { Empty } from 'antd';

function CustomPieChart({ data, name, value, colors, country, title, val1, val2 }) {
  const intl = useIntl();
  const RADIAN = Math.PI / 180;

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className={style.legend}>
        {payload?.map((entry, index) => {
          return (
            <div className={style.legendItemContainer} key={`item-${index}`}>
              <div
                className={style.legendIndicator}
                style={{ background: country ? colors[entry?.payload?.countryCode] : entry?.color }}
              ></div>
              <div className={style.legendItem}>
                {intl.formatMessage({
                  id: entry?.payload?.countryCode,
                  defaultMessage: `${entry?.payload?.countryCode}`,
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if ((percent * 100).toFixed(0) > 3)
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(1)}%`}
        </text>
      );
  };

  return (
    <div className={style.container}>
      {Object?.keys(data)?.length ? (
        <ResponsiveContainer width="100%" height="70%">
          <PieChart>
            <Legend width="100%" layout="horizontal" align="center" verticalAlign="bottom" content={renderLegend} />
            <Pie label={renderCustomizedLabel} labelLine={false} data={data} dataKey={value} nameKey={name}>
              {data?.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={country ? colors[entry?.countryCode] : colors[index % colors?.length]}
                  />
                );
              })}
            </Pie>
            <Tooltip
              formatter={(value, datakey) => [
                `${formatMoney(value)}`,
                `${intl.formatMessage({ id: datakey, defaultMessage: datakey })}`,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Empty description={false} image={<img src="/images/Modern/nodates.svg" />} />
      )}
      <div className={style.extraInfo}>
        <div className={style.chartTitle}>{intl.formatMessage({ id: title, defaultMessage: title })}</div>
        <div className={style.info}>
          <span>{formatMoney(val1)}</span>
          <div>
            {intl.formatMessage({ id: 'MNThisMonthText', defaultMessage: '* Current Month' })}{' '}
            <span>{formatMoney(val2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomPieChart;
