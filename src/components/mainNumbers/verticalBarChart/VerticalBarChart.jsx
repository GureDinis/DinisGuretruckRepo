import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import style from './VerticalBarChart.module.scss';
import { formatMoney } from '../../../Helper.JSX';
import { useIntl } from 'react-intl';

function VerticalBarChart({ data, formatData, datakey, width, title, colors, country }) {
  const intl = useIntl();
  const chartData = data;

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className={style.legend}>
        {payload.map((entry, index) => (
          <div className={style.legendItemContainer} key={`item-${index}`}>
            <div className={style.legendIndicator} style={{ background: entry.color }}></div>
            <div className={style.legendItem}>
              {intl.formatMessage({ id: entry.value, defaultMessage: entry.value })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getBars = () => {
    if (chartData.length === 0) return null;

    // Get all keys except 'month' to dynamically create Bar components
    const keys = Object.keys(chartData[0]).filter((key) => key !== datakey);

    return keys.map((key, index) => (
      <Bar
        radius={[0, 2, 2, 0]}
        key={key}
        dataKey={key}
        name={key}
        fill={country ? colors[key] : colors[index % colors?.length]}
        background={{ fill: 'rgba(217, 217, 217, 0.20)' }}
      />
    ));
  };

  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      const filteredPayload = payload.filter((entry) => entry.name !== 'countryCode');
      return (
        <div className={style.customeToolTip}>
          <p>{`${label}`}</p>
          {filteredPayload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${intl.formatMessage({ id: entry.name, defaultMessage: entry.name })}: ${formatMoney(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width={width ? width + '%' : '100%'} style={{ paddingRight: '12px' }}>
      <BarChart layout="vertical" data={chartData} barGap={0} barSize={12}>
        <Legend
          content={renderLegend}
          width="auto"
          layout="horizontal"
          align="right"
          wrapperStyle={{ top: '0', right: '20px' }}
          verticalAlign="top"
        />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} />
        <XAxis type="number" tickLine={false} />
        <YAxis
          type="category"
          tickFormatter={(value) => [`${intl.formatMessage({ id: value, defaultMessage: `${value}` })}`]}
          dataKey={datakey}
          tickLine={false}
        />
        {getBars()}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default VerticalBarChart;
