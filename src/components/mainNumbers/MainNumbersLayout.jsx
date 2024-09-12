import React from 'react';
import style from './MainNumbersLayout.module.scss';
import BarChart from './barChart/BarCharts.jsx';
import PieChart from './pieChart/PieCharts.jsx';
import CustomPieChart from './customPieChart/CustomPieChart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Empty } from 'antd';
import { useIntl } from 'react-intl';
import Overlay from '../common/Overlay.jsx';
import { useQuery } from 'react-query';
import { GetTotalValues } from '../../Api/Api.jsx';
import { refetchQueries } from '../../Helper.jsx';
import { setNumbers } from '../../Redux/reducers/siteDataSlice';
import { CountryColors } from '../../enmus/enum';
import MainCard from './mainCard/MainCard.jsx';
import VerticalBarChart from './verticalBarChart/VerticalBarChart.jsx';
import ConnectedCharts from './connectedCharts/ConnectedCharts.jsx';

function MainNumbersLayout(props) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const mainNumbers = useSelector((state) => state.siteData.numbers);
  const colors = ['#30D5C8', '#009DE0', '#E2E2E2', '#DB4444', '#6441A5', '#FFC034'];

  const prePaidExtraInfo = {
    MNWithdrawalAtATMThisMonth: mainNumbers?.prepaidCards?.withdrawalATM,
    MNRechargesThisMonth: mainNumbers?.prepaidCards?.rechargesThisMonth,
    MNUseOfTPVThisMonth: mainNumbers?.prepaidCards?.useOfTPV,
    MNActiveCards: mainNumbers?.prepaidCards?.activeCards,
  };

  const legalServicesExtraInfo = {
    MNAmountThisMonthInFines: mainNumbers?.legalServices?.amountInFines,
    MNAmountThisMonthInAssistances: mainNumbers?.legalServices?.amountInAssistances,
  };

  const BrasilTacoContracts = {
    MNDaySupervision: mainNumbers?.workDayInspection?.yearAmount,
  };

  const siteMode = useSelector((state) => state?.user?.profileData?.siteMode);
  const { isLoading } = useQuery('numbers', GetTotalValues, {
    ...refetchQueries,
    onSuccess: (data) => {
      dispatch(setNumbers(data?.data?.result));
    },
    onError: () => dispatch(setNumbers({})),
  });

  const renderIMI = () => {
    return (
      <div className={style.IMI}>
        <img src="/images/euroFlag.svg" alt="" />
        <div>{mainNumbers?.mainNumbers?.totalCertificates}</div>
      </div>
    );
  };

  return (
    <>
      {isLoading && <Overlay showSpinner={true} />}
      <div className={style.mainHeader}>
        {intl.formatMessage({ id: 'MNMainNumbersLabel', defaultMessage: '* Main Numbers' })}
      </div>
      {Object?.keys(mainNumbers)?.length !== 0 ? (
        <div className={`${style.mainNumbersContainer} mainNumbers`}>
          {siteMode === 6 ? (
            <>
              <div className={style.sectionBody}>
                <MainCard
                  width={30}
                  header={intl.formatMessage({ id: 'MNTachoManager', defaultMessage: '* Tacho Manager' })}
                  title={intl.formatMessage({ id: 'MNActiveContracts', defaultMessage: '* Active contracts' })}
                  CustomComponent={() => <BarChart colors={colors} datakey="contractName" data={mainNumbers?.TMS} />}
                />
                <MainCard
                  width={70}
                  header={intl.formatMessage({ id: 'MNPrepaidCardsLabel', defaultMessage: '* Prepaid cards' })}
                  title={intl.formatMessage({
                    id: 'MNTachoContractsPieChartsTitle',
                    defaultMessage: '* Tacho contracts by type',
                  })}
                  secondTitle={intl.formatMessage({
                    id: 'MNTachoContractsPieChartsTitle',
                    defaultMessage: '* Tacho contracts by type',
                  })}
                  componentWidth={65}
                  secondComponentWidth={35}
                  height={480}
                  reverse
                  CustomComponent={() => (
                    <ConnectedCharts
                      dataLeft={mainNumbers?.tachoDesglosed?.dataLeft}
                      dataRight={mainNumbers?.tachoDesglosed?.dataRight}
                    />
                  )}
                  secondComponent={() => <PieChart height={90} colors={colors} data={mainNumbers?.tachoContracts} />}
                  cardInfo={BrasilTacoContracts}
                />
              </div>
            </>
          ) : siteMode === 5 ? (
            <Empty description={false} image={<img src="/images/Modern/nodates.svg" />} />
          ) : (
            <>
              <div className={style.sectionBody}>
                <MainCard
                  width={35}
                  header={intl.formatMessage({ id: 'MNTachoManager', defaultMessage: '* Tacho Manager' })}
                  title={intl.formatMessage({ id: 'MNActiveContracts', defaultMessage: '* Active contracts' })}
                  CustomComponent={() => (
                    <BarChart colors={colors} datakey="contractName" data={mainNumbers?.mainNumbers?.activeContracts} />
                  )}
                />
                <MainCard
                  width={25}
                  header={intl.formatMessage({
                    id: 'MNTotalIMICertificates',
                    defaultMessage: '* Total IMI Certificate',
                  })}
                  title={intl.formatMessage({ id: 'MNThisMonthText', defaultMessage: '* Current Month' })}
                  dataCard
                  value={mainNumbers?.mainNumbers?.certificatesThisMonth}
                  CustomComponent={() => renderIMI()}
                />
                <MainCard
                  width={40}
                  header={intl.formatMessage({ id: 'MNPrepaidCardsLabel', defaultMessage: '* Prepaid cards' })}
                  title={intl.formatMessage({ id: 'MNUsedCash', defaultMessage: '* Used cash this year' })}
                  CustomComponent={() => (
                    <BarChart colors={colors} datakey="month" data={mainNumbers?.prepaidCards?.usedCash} />
                  )}
                  cardInfo={prePaidExtraInfo}
                  span={12}
                />
              </div>
              <div className={style.sectionBody}>
                <MainCard
                  width={25}
                  header={intl.formatMessage({ id: 'MNLegalServicesLabel', defaultMessage: '* Legal Services' })}
                  title={intl.formatMessage({
                    id: 'MNFinesAssistance',
                    defaultMessage: '* Fines & Assistance Last 5 years',
                  })}
                  CustomComponent={() => (
                    <VerticalBarChart colors={colors} datakey="year" data={mainNumbers?.legalServices?.lastYears} />
                  )}
                  cardInfo={legalServicesExtraInfo}
                  span={24}
                />
                <MainCard
                  width={75}
                  header={intl.formatMessage({ id: 'MNTMSLabel', defaultMessage: '* TMS' })}
                  title={intl.formatMessage({ id: 'MNJourneyLoad', defaultMessage: '* Journeys & Loads Current Year' })}
                  secondTitle={intl.formatMessage({
                    id: 'MNTotalInvoiced',
                    defaultMessage: '* Total invoiced last 5 years',
                  })}
                  componentWidth={65}
                  secondComponentWidth={35}
                  CustomComponent={() => (
                    <BarChart colors={colors} datakey="month" data={mainNumbers?.tms?.lastJouneysAndLoads} />
                  )}
                  secondComponent={() => (
                    <VerticalBarChart colors={colors} datakey="year" data={mainNumbers?.tms?.totalInvoiced} />
                  )}
                />
              </div>
              <div className={style.sectionBody}>
                <MainCard
                  width={100}
                  height={
                    Object?.keys(mainNumbers?.vat?.lasts)?.length <= 0 &&
                    Object?.keys(mainNumbers?.vat?.current)?.length <= 0
                      ? 'auto'
                      : '550px'
                  }
                  header={intl.formatMessage({ id: 'MNVATLabel', defaultMessage: '* VAT' })}
                  title={intl.formatMessage({ id: 'MNTotalVat1', defaultMessage: '* Total VAT Last two years' })}
                  secondTitle={intl.formatMessage({
                    id: 'MNTotalVAT2',
                    defaultMessage: '* Total VAT recovered this year, per country',
                  })}
                  componentWidth={70}
                  secondComponentWidth={30}
                  hasBG
                  CustomComponent={() => (
                    <BarChart
                      rotateTic
                      colors={colors}
                      country
                      countryColors={CountryColors}
                      BarHeight
                      height={65}
                      datakey="country"
                      formatData
                      data={mainNumbers?.vat?.lasts}
                    />
                  )}
                  secondComponent={() => (
                    <CustomPieChart
                      val1={mainNumbers?.mainNumbers?.totalVATRecovered}
                      val2={mainNumbers?.mainNumbers?.vatRecoveredThisMonth}
                      title={'MNTotalVATRecovered'}
                      name="countryName"
                      value="amount"
                      data={mainNumbers?.vat?.current}
                      colors={CountryColors}
                      country
                    />
                  )}
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <Empty description={false} image={<img src="/images/Modern/nodates.svg" />} />
      )}
    </>
  );
}

export default MainNumbersLayout;
