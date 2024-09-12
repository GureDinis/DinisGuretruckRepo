import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import style from './ConnectedCharts.module.scss';
import { useIntl } from 'react-intl';
import { formatMoney } from '../../../Helper.jsx';

function ConnectedCharts({ width, dataLeft, dataRight }) {
  const intl = useIntl();

  const CustomYAxisTick = () => {
    return (
      <div className={style.yAxisTic}>
        <div>
          <img src="/images/tacho.svg" alt="" />
          <span>{intl.formatMessage({ id: 'tacho', defaultMessage: 'tacho' })}</span>
        </div>
        <div>
          <img src="/images/Continental.svg" alt="" />
          <span>{intl.formatMessage({ id: 'Continental', defaultMessage: 'Continental' })}</span>
        </div>
        <div>
          <img src="/images/Fulmar.svg" alt="" />
          <span>{intl.formatMessage({ id: 'Fulmar', defaultMessage: 'Fulmar' })}</span>
        </div>
      </div>
    );
  };

  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload?.length) {
      return (
        <div className={style.customeToolTip}>
          <p>{`${intl.formatMessage({ id: label, defaultMessage: label })}`}</p>
          {payload?.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${intl.formatMessage({ id: entry.name, defaultMessage: entry.name })}: ${formatMoney(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderLegend = (reverse, props) => {
    const { payload } = props;
    return (
      <div className={style.legend}>
        {payload?.map((entry, index) => (
          <div
            style={{ flexDirection: reverse === 'Reverse' && 'row-reverse' }}
            className={style.legendItemContainer}
            key={`item-${index}`}
          >
            <div className={style.legendIndicator} style={{ background: entry?.color }}></div>
            <div className={style.legendItem}>
              {intl.formatMessage({ id: entry?.dataKey, defaultMessage: entry?.dataKey })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getBars = (data, color) => {
    if (data?.length === 0) return null;
    const keys = Object?.keys(data[0])?.filter((key) => key !== 'name');

    return keys.map((key, index) => (
      <Bar
        radius={[2, 2, 0, 0]}
        key={key}
        dataKey={key}
        name={key}
        fill={color}
        background={{ fill: 'rgba(217, 217, 217, 0.20)' }}
      />
    ));
  };

  return (
    <div className={`${style.chartContainer}`}>
      <ResponsiveContainer width={width ? width + '%' : '100%'} height={'100%'}>
        <BarChart width={500} height={300} layout="vertical" barGap={0} barSize={12} data={dataLeft}>
          <Legend
            content={(props) => renderLegend('', props)}
            layout="horizontal"
            align="left"
            wrapperStyle={{ top: '0', left: '20px' }}
            verticalAlign="top"
          />
          <XAxis reversed type="number" tickLine={false} />
          <YAxis width={5} orientation="right" type="category" dataKey="name" tick={false} tickLine={false} />
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} />
          <Tooltip content={<CustomTooltip />} />
          {getBars(dataLeft, '#00c8b5')}
        </BarChart>
      </ResponsiveContainer>
      <div>{CustomYAxisTick()}</div>
      <ResponsiveContainer width={width ? width + '%' : '100%'}>
        <BarChart layout="vertical" barGap={0} barSize={12} data={dataRight}>
          <Legend
            content={(props) => renderLegend('Reverse', props)}
            width="auto"
            layout="horizontal"
            align="right"
            wrapperStyle={{ top: '0', right: '20px' }}
            verticalAlign="top"
          />
          <XAxis type="number" tickLine={false} />
          <YAxis width={5} type="category" dataKey="name" tick={false} tickLine={false} />
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} />
          <Tooltip content={<CustomTooltip />} />
          {getBars(dataRight, '#007bff')}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ConnectedCharts;
