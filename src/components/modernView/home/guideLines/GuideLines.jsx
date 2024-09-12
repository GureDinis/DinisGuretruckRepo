import React, { useState } from 'react';
import style from './GuildLines.module.scss';
import { useQuery } from 'react-query';
import { GetKodeaGuideLines } from '../../../../Api/Api.jsx';
import Guideline from './Guideline.jsx';
import { FormattedMessage } from 'react-intl';

const GuideLines = () => {
  const [kodeaGuideLines, setKodeaGuideLines] = useState();

  useQuery('kodeaGuideLines', GetKodeaGuideLines, {
    onSuccess: (data) => {
      setKodeaGuideLines(data?.data?.result);
    },
  });

  return (
    <div className={style.cardContainer}>
      <div className={style.cardContent}>
        <div className={style.titleContainer}>
          <h2>
            <FormattedMessage id="GuidelinesTitle" defaultMessage="* FMCSA Guidelines and Regulations" />
          </h2>
          <hr />
        </div>
        <div className={style.guideLinesContainer}>
          {kodeaGuideLines?.map((guideLine, index) => {
            return (
              <>
                {index > 0 && <hr className={style.divider} />}
                <div className={style.guideLine}>
                  <Guideline
                    key={guideLine?.idSupportVideo}
                    imageSrc={guideLine.logo}
                    title={guideLine?.name}
                    onButtonClick={guideLine.videoUrl}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GuideLines;
