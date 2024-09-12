import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import style from './BarCharts.module.scss';
import { formatMoney } from '../../../Helper.JSX';
import { useIntl } from 'react-intl';
import { Empty } from 'antd';

function BarCharts({ data, formatData, datakey, width, height, country, countryColors, BarHeight, colors, rotateTic }) {
  const intl = useIntl();

  function transformDataArray(dataArray) {
    return dataArray.map((data) => ({
      country: data.countryName.toUpperCase(),
      [data.beforeLastYear]: data.beforeLastYearAmount,
      [data.lastYear]: data.lastYearAmount,
      countryCode: data.countryCode,
    }));
  }
  const chartData = formatData ? transformDataArray(data) : data;

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className={style.legend}>
        {payload.map(
          (entry, index) =>
            entry.value === 'countryCode' || (
              <div className={style.legendItemContainer} key={`item-${index}`}>
                <div className={style.legendIndicator} style={{ background: entry.color }}></div>
                <div className={style.legendItem}>
                  {intl.formatMessage({ id: entry.value, defaultMessage: entry.value })}
                </div>
              </div>
            ),
        )}
      </div>
    );
  };

  const getBars = () => {
    if (chartData.length === 0) return null;

    // Get all keys except 'month' to dynamically create Bar components
    const keys = Object.keys(chartData[0]).filter((key) => key !== datakey);

    return keys.map((key, index) => (
      <Bar
        radius={[2, 2, 0, 0]}
        key={key}
        dataKey={key}
        name={key}
        fill={colors[index % colors?.length]}
        background={{ fill: 'rgba(217, 217, 217, 0.20)' }}
      />
    ));
  };

  const renderCustomTick = (tickProps) => {
    const { x, y, payload } = tickProps;
    const item = chartData[payload?.index];
    return (
      <g transform={`translate(${x},${y})`}>
        <circle
          cx={0}
          cy={5}
          r={4}
          fill={country ? countryColors[item?.countryCode] : colors[payload.index % colors.length]}
        />
        <text x={-10} y={20} textAnchor="end" transform="rotate(-45)" className={style.customeTick}>
          {payload.value}
        </text>
      </g>
    );
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

  const CustomAxisTick = ({ x, y, payload }) => {
    const text = intl.formatMessage({ id: payload.value, defaultMessage: `${payload.value}` });
    const words = text.split(' ');

    // If the text is too long, split it into two lines
    const lines = words.reduce((acc, word) => {
      const lastLine = acc[acc.length - 1];
      if (lastLine && lastLine.length + word.length + 1 <= 10) {
        // Adjust this value as needed
        acc[acc.length - 1] = `${lastLine} ${word}`;
      } else {
        acc.push(word);
      }
      return acc;
    }, []);

    return (
      <g transform={`translate(${x},${y})`}>
        {lines.map((line, index) => (
          <text
            key={index}
            x={0}
            y={index * 20}
            dy={16 - index * 5} // Adjust vertical spacing between lines
            textAnchor="middle"
            className={style.xAxisText}
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  return (
    <>
      {Object?.keys(chartData)?.length ? (
        <ResponsiveContainer
          width={width ? width + '%' : '100%'}
          height={height ? height + '%' : '100%'}
          style={{ paddingRight: '12px' }}
        >
          <BarChart
            style={{ height: BarHeight && '140%', ...(BarHeight && { maxHeight: '450px' }) }}
            data={chartData}
            barGap={0}
            barSize={12}
          >
            <Legend
              content={renderLegend}
              width="auto"
              layout="horizontal"
              align="right"
              wrapperStyle={{ top: '0', right: '20px' }}
              verticalAlign="top"
            />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis
              tickFormatter={(value) => [`${intl.formatMessage({ id: value, defaultMessage: `${value}` })}`]}
              dataKey={datakey}
              height={50}
              tickLine={false}
              tick={rotateTic ? renderCustomTick : CustomAxisTick}
              interval={0}
            />
            <YAxis className={style.axisStyle} tickLine={false} tickFormatter={formatMoney} width={50} />
            {getBars()}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Empty description={false} image={<img src="/images/Modern/nodates.svg" />} />
      )}
    </>
  );
}

export default BarCharts;
