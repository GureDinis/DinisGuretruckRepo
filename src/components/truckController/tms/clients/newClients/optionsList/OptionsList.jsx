import React, { useEffect, useState } from 'react';
import style from './OptionsList.module.scss';
import CDetailsMandatory from './clientDetailsMandatory/CDetailsMandatory';
import ClientDetailsOptional from './clientDetailsOptional/ClientDetailsOptional';
import Contacts from './contacts/Contacts';
import Observations from './observations/Observations';
import InvoiceCustomization from './invoiceCustomization/InvoiceCustomization';
import LedgerAccount from './ledgerAccount/LedgerAccount';
import Tariffs from './tariffs/Tariffs';
import Budget from './budget/Budget';
import CRM from './crm/CRM';
import { DoubleRightOutlined } from '@ant-design/icons';

// eslint-disable-next-line react/prop-types
const OptionsList = ({ setFormProp, currentOptionIndex, setCurrentOptionIndex }) => {
  const differentOptions = [
    'Client Details Mandatory',
    'Client Details Optional',
    'Contacts',
    'Observations',
    'Invoice Customization',
    'Ledger Account',
    'Tariffs',
    'Budget',
    'CRM',
  ];

  useEffect(() => {
    // Set form based on the current option index
    const option = differentOptions[currentOptionIndex];

    if (option === 'Client Details Mandatory') setFormProp(<CDetailsMandatory />);
    else if (option === 'Client Details Optional') setFormProp(<ClientDetailsOptional />);
    else if (option === 'Contacts') setFormProp(<Contacts />);
    else if (option === 'Observations') setFormProp(<Observations />);
    else if (option === 'Invoice Customization') setFormProp(<InvoiceCustomization />);
    else if (option === 'Ledger Account') setFormProp(<LedgerAccount />);
    else if (option === 'Tariffs') setFormProp(<Tariffs />);
    else if (option === 'Budget') setFormProp(<Budget />);
    else if (option === 'CRM') setFormProp(<CRM />);
  }, [currentOptionIndex, setFormProp]);

  const handleClick = (index) => {
    setCurrentOptionIndex(index);
  };

  const [isHovered, setIsHovered] = useState(null); // Track hovered index

  return (
    <>
      <ul className={style.optionsContainer}>
        {differentOptions.map((option, index) => (
          <div
            className={style.option}
            style={{
              background:
                currentOptionIndex === index
                  ? 'rgb(174, 224, 228)'
                  : isHovered === index
                    ? 'rgb(32, 149, 206 )'
                    : 'linear-gradient(90deg, rgba(0, 157, 224, 0.8) 0%, rgba(48, 213, 200, 0.8) 100%)',
            }}
            key={option}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setIsHovered(index)} // Handle mouse hover
            onMouseLeave={() => setIsHovered(null)} // Reset hover state
          >
            <h2>{option}</h2>
            <div className={style.doubleArrow}>
              <DoubleRightOutlined />
            </div>
          </div>
        ))}
      </ul>
    </>
  );
};

export default OptionsList;

// import React, { useEffect, useState } from 'react'
// import style from './OptionsList.module.scss';
// import CDetailsMandatory from './clientDetailsMandatory/CDetailsMandatory';
// import ClientDetailsOptional from './clientDetailsOptional/ClientDetailsOptional';
// import Contacts from './contacts/Contacts';
// import Observations from './observations/Observations';
// import InvoiceCustomization from './invoiceCustomization/InvoiceCustomization';
// import LedgerAccount from './ledgerAccount/LedgerAccount';
// import Tariffs from './tariffs/Tariffs';
// import Budget from './budget/Budget';
// import CRM from './crm/CRM';
// import { DoubleRightOutlined } from '@ant-design/icons';

// // eslint-disable-next-line react/prop-types
// const OptionsList = ({ setFormProp, currentOptionIndex, setCurrentOptionIndex }) => {
//     const differentOptions = [
//         "Client Details Mandatory",
//         "Client Details Optional",
//         "Contacts",
//         "Observations",
//         "Invoice Customization",
//         "Ledger Account",
//         "Tariffs",
//         "Budget",
//         "CRM"
//     ];

//     useEffect(() => {
//         // Set form is based on the current option's index
//         const option = differentOptions[currentOptionIndex];

//         if (option === "Client Details Mandatory") setFormProp(<CDetailsMandatory />);
//         else if (option === "Client Details Optional") setFormProp(<ClientDetailsOptional />);
//         else if (option === "Contacts") setFormProp(<Contacts />);
//         else if (option === "Observations") setFormProp(<Observations />);
//         else if (option === "Invoice Customization") setFormProp(<InvoiceCustomization />);
//         else if (option === "Ledger Account") setFormProp(<LedgerAccount />);
//         else if (option === "Tariffs") setFormProp(<Tariffs />);
//         else if (option === "Budget") setFormProp(<Budget />);
//         else if (option === "CRM") setFormProp(<CRM />);
//     }, [currentOptionIndex, setFormProp]);

//     const handleClick = (index) => {
//         setCurrentOptionIndex(index);
//     };

//     const [isHovered, setIsHovered] = useState(null); // Track hovered index

//     return (
//         <>
//             <ul className={style.optionsContainer}>
//                 {differentOptions.map((option, index) => (
//                     <div
//                         key={option}
//                         className={style.option}
//                         style={
//                             {
//                                 background: currentOptionIndex === index
//                                     ? 'rgb(174, 224, 228)'  // Selected option
//                                     : isHovered === index // Hover state
//                                         ? 'rgba(0, 157, 224, 0.1)'
//                                         : 'linear-gradient(90deg, rgba(0, 157, 224, 0.8) 0%, rgba(48, 213, 200, 0.8) 100%)',
//                             }
//                         }
//                         onClick={() => handleClick(option, index)}
//                         onMouseEnter={() => setIsHovered(index)} // Handle mouse hover
//                         onMouseLeave={() => setIsHovered(null)}  // Reset hover state
//                     >
//                         <h2>{option}</h2>

//                         <div className={style.doubleArrow}>
//                             <DoubleRightOutlined />
//                         </div>
//                     </div>
//                 ))}
//             </ul>
//         </>
//     );
// };

// export default OptionsList;
