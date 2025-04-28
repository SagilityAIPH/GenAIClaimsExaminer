import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import {ProgressBar, Button } from 'react-bootstrap';
import PDFv from './pdfviewer/pdfviewer'
import './pdfworker'
import mammoth from 'mammoth';
import Dropdown from 'react-bootstrap/Dropdown';
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

function App() {
  const [showContainer3Content, setShowContainer3Content] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startLoading, setStartLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // ADD THIS
  const [progress4, setProgress4] = useState(0);
  const [startLoading4, setStartLoading4] = useState(false);
  const [showPopup4, setShowPopup4] = useState(false);
  const fileInputRef = React.useRef(null);
  const [wordContent, setWordContent] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [textareaContent, setTextareaContent] = useState("");
  const [fullTextToType, setFullTextToType] = useState(""); // NEW
  const textareaRef = React.useRef(null);
  const [isHidden, setIsHidden] = useState(false);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [pendingFullText, setPendingFullText] = useState("");
  const [showGenKAButton, setShowGenKAButton] = useState(false);
  const [showPanelAction, setShowPanelAction] = useState(false);
  const [showPanelValidation, setShowPanelValidation] = useState(false);
  const [showPanelPDF, setShowPanelPDF] = useState(false);
  const [showMainContainer, setShowMainContainer] = useState(true);

  useEffect(() => {
    if (startTyping && fullTextToType.length > 0) {
      setTextareaContent(""); // Reset textarea
      setShowGenKAButton(false); // Hide button during typing
  
      let index = 0;
      const interval = setInterval(() => {
        setTextareaContent((prev) => prev + fullTextToType.charAt(index));
        index++;
  
        if (textareaRef.current) {
          textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
  
        if (index >= fullTextToType.length) {
          clearInterval(interval);
          setShowGenKAButton(true); // ✅ Show button once typing complete
        }
      }, 15);
  
      return () => clearInterval(interval);
    }
  }, [startTyping, fullTextToType]);



  useEffect(() => {
    let timer;
    if (startLoading && progress < 100) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            clearInterval(timer);
            setShowPopup(true);  // ✅ fixed trigger here
            return 100;
          }
          return next;
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [startLoading, progress]);


  useEffect(() => {
    let timer4;
    if (startLoading4 && progress4 < 100) {
      timer4 = setInterval(() => {
        setProgress4((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            clearInterval(timer4);
            setShowPopup4(true);
            return 100;
          }
          return next;
        });
      }, 40);
    }
    return () => clearInterval(timer4);
  }, [startLoading4, progress4]);


const handleDownload = () => {
  setShowMainContainer(false); // ✅ Hide main container
  // Later: You can also trigger other download actions if needed
  
};

const handleFinalDownload = () => {
  alert('Final Download triggered!');
  // You can later add logic to export dashboard as PDF, image, etc.
};


const handleHome = () => {
  setShowMainContainer(true); // ✅ Show the main container again
};
  const handleStartProgress = () => {
    setProgress(0);
    setStartLoading(true);
    setShowPopup(false); // reset popup when starting again
    setShowPanelAction(true); // ✅ Now show Panel Action
  };

  const handleProceed = (answer) => {
    setShowPopup(false);
    if (answer) {
      setProgress4(0);
      setStartLoading4(true);
      setShowContainer3Content(true);
      setShowPopup4(false); // just to be safe
      setShowPanelValidation(true); // ✅ Now show Panel Validation
      setShowPanelPDF(true);        // ✅ show panelPDF
    } else {
      alert("Action cancelled.");
    }
  };

  const handleStartsProgress = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const sheet3Data = [
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-01-21 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "JAISINGHANI ,AJAY",
      "Offshore": "No",
      "INPUT_DATE": "2025-03-10 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-03 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "11 - Pended; Awaiting Batch"
    },
    {
      "Manager": "B ,SANTHOSHA",
      "Offshore": "Yes",
      "INPUT_DATE": "2025-03-20 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "11 - Pended; Awaiting Batch"
    },
    {
      "Manager": "MUNSHI ,TANVEER",
      "Offshore": "No",
      "INPUT_DATE": "2025-03-25 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "11 - Pended; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-15 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "DUNLAP ,BRENDALEE",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-15 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-16 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-17 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-18 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-18 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "11 - Pended; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-21 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-21 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-21 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-22 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-22 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-22 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-22 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "11 - Pended; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-22 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-22 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-22 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "11 - Pended; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "11 - Pended; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": ""
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "11 - Pended; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    },
    {
      "Manager": "",
      "Offshore": "No",
      "INPUT_DATE": "2025-04-23 00:00:00",
      "ASO_Vs_FI": "FI",
      "New Status": "01 - Accepted; Awaiting Batch"
    }
  ];

  const DashboardCard = ({ title, children }) => (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    }}>
      <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>{title}</h5>
      {children}
    </div>
  );
  
  const getClaimsByManager = () => {
    const counts = {};
    sheet3Data.forEach(item => {
      const manager = item["Manager"] || "Unassigned";
      counts[manager] = (counts[manager] || 0) + 1;
    });
    return Object.keys(counts).map(manager => ({ Manager: manager, Count: counts[manager] }));
  };
  
  const getOffshoreSplit = () => {
    const counts = { Offshore: 0, Onshore: 0 };
    sheet3Data.forEach(item => {
      if (item["Offshore"] === "Yes") counts.Offshore++;
      else counts.Onshore++;
    });
    return [
      { name: "Offshore", value: counts.Offshore },
      { name: "Onshore", value: counts.Onshore },
    ];
  };
  
  const getAsoFiSplit = () => {
    const counts = { ASO: 0, FI: 0 };
    sheet3Data.forEach(item => {
      if (item["ASO_Vs_FI"] === "ASO") counts.ASO++;
      else if (item["ASO_Vs_FI"] === "FI") counts.FI++;
    });
    return [
      { Type: "ASO", Count: counts.ASO },
      { Type: "FI", Count: counts.FI },
    ];
  };
  
  const getClaimsOverTime = () => {
    const counts = {};
    sheet3Data.forEach(item => {
      let date = item["INPUT_DATE"];
      if (date) {
        if (typeof date === 'string') date = date.split(' ')[0];
        counts[date] = (counts[date] || 0) + 1;
      }
    });
    return Object.keys(counts).map(date => ({ Date: date, Count: counts[date] }));
  };
  
  const getStatusBreakdown = () => {
    const counts = {};
    sheet3Data.forEach(item => {
      const status = item["New Status"] || "Unknown";
      counts[status] = (counts[status] || 0) + 1;
    });
    return Object.keys(counts).map(status => ({ name: status, value: counts[status] }));
  };

  
  const loadingSteps = [
    "",
    "Initializing...",
    "Facets Claims Data Validation...",
    "Facets Claims Data Validation...",
    "Facets Claims Data Validation...",
    "Facets Claims Data Validation...",
    "Facets Claims Data Validation...",
    "Facets Claims Data Validation...",
    "Facets Claims Data Validation...",
    "Facets Claims Data Validation...",
    "Complete!"
  ];
  
  const resultSteps = [
    { text: "Condition matched with Facets back-end data", bold: true},
    {parts: ["• The claim is being adjusted per a request from Legal. - ",
        { word: "No Legal Notes", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],}, 
    {parts: ["• The claim was prepriced by LifeSOURCE. - ",
        { word: "No Related Notes", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],}, 
    {parts: ["• The claim is for Medicaid Reimbursement. - ",
        { word: "Checkbox or message: None", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],},  
    {parts: ["• Provider and Facility Selection. - ",
        { word: "Rendering Provider No Data Macthed. Billing Provider Non IFP Provider OON", highlight: true, color: "#377855", fontColor: "white", bold: true},],}, 
    {parts: ["• Review Claim Processing checklist. - ",
        { word: "Review Claim Processing checklist", highlight: true, color: "#377855", fontColor: "white", bold: true},],}, 
    {parts: ["• Determine if provider is INN or OON. - ",
        { word: "Provider is OON", highlight: true, color: "#377855", fontColor: "white", bold: true},],}, 
    {parts: ["• Determine if Cigna is Secondary. - ",
        { word: "Cigna is Secondary (prepay timely guidelines does not apply)", highlight: true, color: "#377855", fontColor: "white", bold: true},],}, 
    {parts: ["• Determine if Medicaid Reclamation claim. - ",
        { word: "no notes in warning message", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],}, 
    {parts: ["• Determine if Veteran Administration Claim. - ",
        { word: "No VA in provider name", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],}, 
    {parts: ["• Determine if Adjusted or Corrected Claim. - ",
        { word: "No adjusted or Corrected claim", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],}, 
    {parts: ["• IFP account is in North Carolina (Determine if claim was received within 18 months of the DOS). - ",
        { word: "IFP-Florida", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],}, 
    {parts: ["• IFP account is NOT North Carolina (Determine if the claim was received within 15 months of the date of service). - ",
        { word: "DOS - 9/12/2024, Received Date - 4/21/2025, Less than 15 months, (Override timely filing by accessing the Claim Override screen, check Bypass Claim Accept Months with Explanation Code (EXCD) OCA)", highlight: true, color: "#377855", fontColor: "white", bold: true},],}, 
    {parts: ["• Determine if the claim has previously been sent for OON savings and/or Maximum Reimbursable Charge (MRC) pricing review. - ",
        { word: "No OON saving", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],},  
    { text: " "},
    { text: "15 months Period :  DOS - 9/12/2024, Received Date - 4/21/2025, Meets the timely filing period", bold: true },
  ];

  const visibleLinesCount = Math.floor(progress / (100 / resultSteps.length));
  const visibleResultSteps = resultSteps.slice(0, visibleLinesCount);
  const currentStepIndex = Math.min(Math.floor(progress / 10), loadingSteps.length - 1);
  const loadingMessage = loadingSteps[currentStepIndex];



  const loadingSteps2 = [
    "",
    "Initializing...",
    "Analyzing Input...",
    "Validating Parameters...",
    "Checking Date Verification...",
    "Finalizing Output...",
    "Complete!"
  ];
  
  const fileTextMap = {
    "Timely Filing Deny Incorr Facets Prepay Edit": `TThis document outlines the timely filing process for Individual Family Plans (IFP) during the Prepay Edit phase. The purpose is to ensure timely filing is applied correctly, taking into account the following details:

1. **Prepay Timely Filing IFP Facets Prepay Edit**

2. **Edit Notes**
   - This article is for Prepay use only; F344.
   - It is a Total Quality (TQ)/Underpayment edit.
   - For claims with a DOS before July 11, 2023, refer to the Prepay Timely Filing Pre-COVID and COVID Calculation article.
   - Cigna standards will apply whichever of the following allows the maximum number of days:
     - State exceptions
     - Provider/Facility contract exception
     - Client Account level exception
     - Client-Specific Network (CSN) level

3. **Process Steps**

   a. **Exclusions**
   - If any exclusions apply (e.g., legal adjustment, LifeSOURCE prepriced claim, LifeSOURCE contracted rate, Medicaid reimbursement), follow standard processing guidelines.

   b. **Provider Selection**
   - If the provider is Out-of-Network (OON), proceed to the next step.
   - If the provider is In-Network (INN), document "network prov" in the T4 Notes field and follow standard processing guidelines.

   c. **Claim Type**
   - For Cigna secondary coverage (Medicare, Medicaid, VA, adjustment, or corrected claim), determine if the claim was received within the timely filing period.
   - For North Carolina IFP accounts: If the claim is within 18 months of the service date, override timely filing by checking the Bypass Claim Accept Months (EXCD) OCA.
   - For non-NC IFP accounts: If the claim is within 15 months of the service date, override timely filing by checking the Bypass Claim Accept Months (EXCD) OCA.

   d. **POTF**
   - If Proof of Timely Filing (POTF) is attached, follow standard processing guidelines.

   e. **Savings Checks**
   - If the claim has been previously reviewed for OON savings and/or the Maximum Reimbursable Charge (MRC) pricing, bypass the PCA Pend (EXCD PCO).

   f. **Prepay ID and Error Codes**
   - Document the Prepay ID and error codes, using "Prepay F344" for edit-related corrections and appropriate error codes for non-edit-related corrections.

By following these steps, claims for Individual Family Plans (IFP) can be processed accurately and in a timely manner, ensuring proper pricing and reimbursement.`, // full text A

    
    "Cigna Pathwell Specialty Benefit Facets": `PPathwell Network Claims Handling Procedures:

1. Verify if the claim is related to the Pathwell Network.
2. Identify the type of service and check for any overrides applied to the claim.
3. Review the payment level override and ensure it aligns with the Pathwell Network.
4. Confirm if the authorized services are on file and approved.
5. Apply the correct Pathwell Drug Type of Service (TOS) override and payment level.
6. If authorized services are not available or denied, follow precertification procedures.
7. For claims from non-Pathwell providers with authorized services:
   - Ensure the Pathwell Specialty in-network benefit override is applied.
8. For claims from non-Pathwell providers with unauthorized or denied services:
   - Check for network agreement (Cigna or Pathwell) and apply corresponding pricing.
   - Avoid applying external pricing overrides.

Notes:
- Ensure all necessary claim notes are added for appropriate processing or denial.
- In cases where the Benefit Summary shows both the CSN Network and Pathwell Specialty Network, follow the specific steps outlined in the provided example.
- Handle pricing disputes by opening an intake for quality coach review when needed.`, // full text B

  };


  const resultSteps2 = [
    { text: "Claims Data Verification", bold: true },
    {parts: ["Patient demographic – ",
      { word: " Matched ", highlight: true, color: "#377855", fontColor: "white", bold: true},],},
    {parts: ["Billed services and amounts – ",
      { word: " Matched ", highlight: true, color: "#377855", fontColor: "white", bold: true},],},  
    { text: "COB"},
    { text: " "},
    { text: "", bold: true },
    { text: "Provider and Facility Selection for Prepay Edits", 
      link: "#", 
      onClick: () => setShowContainer3Content(true)  },
    { text: " "},
    { text: "Duplicates", bold: true },
    { text: " "},
    { text: "Warning messages", bold: true },
    { text: "Out of Network Service Provider"},
    { text: "Possible Evicore service. Review Evicore portal for authorization"},
    { text: "Review for possible Network/Benefit Enhancement"},
    { text: " "},
  ];

  const visibleLinesCount2 = Math.floor(progress4 / (100 / resultSteps2.length));
  const visibleResultSteps2 = resultSteps2.slice(0, visibleLinesCount2);
  const currentStepIndex2 = Math.min(Math.floor(progress4 / 20), loadingSteps2.length - 1);
  const loadingMessage2 = loadingSteps2[currentStepIndex2];

  return (
    
    
    
    <div className="App">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".doc,.docx"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, ""); // remove extension
            setUploadedFileName(fileNameWithoutExt);
            
            setShowLoadingIndicator(true); 
            setStartTyping(false);         
          
            const selectedText = fileTextMap[fileNameWithoutExt];
            setPendingFullText(selectedText || ""); // store first, not yet type
          
            setTimeout(() => {
              setShowLoadingIndicator(false); 
              setFullTextToType(selectedText || ""); // finally set after 10 seconds
              setStartTyping(true);           
            }, 10000);
          
            const reader = new FileReader();
            reader.onload = async (event) => {
              const arrayBuffer = event.target.result;
              try {
                const result = await mammoth.extractRawText({ arrayBuffer });
                setWordContent(result.value);
                console.log("Extracted Word content:", result.value);
              } catch (error) {
                console.error("Error reading Word file:", error);
                alert("Failed to read the Word document.");
              }
            };
            reader.readAsArrayBuffer(file);
          }
        }}
      />

 
      {/* Responsive Dark Header */}
  <header
  className="navbar navbar-expand-lg"
  style={{
    background: 'linear-gradient(to right, #003057, #009CA6)',
    padding: '12px 30px',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#fff'
  }}
>
  <div className="container-fluid">
    

    {/* Logo */}
    <img
      src={`${process.env.PUBLIC_URL}/logo.png`}
      alt="Sagility Logo"
      style={{ height: '40px', marginLeft: '0px' }}
    />

<span className="navbar-brand mb-0 h1" style={{ color: 'white', fontWeight: '600', fontSize: '20px', fontFamily: 'Lexend', marginLeft: '620px' }}>
       AI-Powered Virtual Claims Examiner
    </span>

    <div className="d-flex ms-auto align-items-center gap-3">
    <span
      className="nav-link text-white"
      style={{ cursor: 'pointer', fontWeight: 500 }}
      onClick={handleHome}
    >
      Home
    </span>

  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Dropdown>
      <Dropdown.Toggle
        variant="link"
        style={{
          color: 'white',
          fontWeight: 500,
          textDecoration: 'none',
          padding: 0,
          marginTop: '-2px' // 🔥 slight adjustment to vertically center
        }}
        id="dropdown-basic"
      >
        Report
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleDownload}>Dashboard</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>

  <span className="nav-link text-white" style={{ cursor: 'pointer', fontWeight: 500 }}>User</span>
  <span className="nav-link text-white" style={{ cursor: 'pointer', fontWeight: 500 }}>Logout</span>
</div>


  </div>
</header>


{showMainContainer ? (
  
  <Container className="mt-4" style={{ /*backgroundColor: '#f4f4f4',*/ maxWidth: '1800px' }}>
      <button
          onClick={handleStartsProgress}
          className="btn btn-primary"
          style={{ width: '280px', paddingTop: '4px', height: '30px', marginLeft: '-1500px', marginTop: '-15px', marginBottom: '8px', fontSize: '14px', }}
        >
          Gen-AI Knowledge Article Ingestion 
          
        </button>
        
        <Row>
        <div className="UploadFile" style={{ fontSize: '14px', textAlign: 'left', marginLeft: '290px', marginTop: '-33px' }} >
        {uploadedFileName && (
          <span><b></b> <b>{uploadedFileName}</b></span>
          )}
        </div>
        
          <Col>
          
          <div className="container1" style={{ }} >
                


            <div className="panelArticle"
                    style={{ 
                    display: uploadedFileName ? 'block' : 'none',  // <-- show if file selected
                    backgroundColor: '#ffffff',
                    padding: '30px',
                    border: '1px solid #009CA6',
                    borderRadius: '10px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    marginBottom: '20px',
                    maxHeight: '375px',

                    fontFamily: 'Lexend',
                    fontSize: '14px',
                    lineHeight: '1.6'
                                }}
                              >
                    {wordContent && (
                        <div style={{
                          marginTop: '-15px',
                          padding: '20px',
                          backgroundColor: '#ffffff',                        
                          borderRadius: '10px',
                          maxHeight: '340px',
                          maxWidth: '600px',
                          overflowY: 'auto',
                          fontFamily: 'Lexend',
                          fontSize: '14px',
                          whiteSpace: 'pre-wrap',
                          textAlign: 'left'
                        }}>
                          {wordContent}
                        </div>

                        
                      )}
                
                {showLoadingIndicator && (
                      <div style={{ 
                        marginTop: '20px',
                        display: 'flex', 
                        alignItems: 'center', 
                        fontFamily: 'Lexend',
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#555'
                      }}>
                        {/* Rotating hourglass */}
                        <div style={{
                          animation: 'spin 1.5s linear infinite',
                          marginRight: '10px',
                          fontSize: '24px'
                        }}>
                          ⏳
                        </div>

                        {/* Loading text with animated dots */}
                        <div>
                          Summarizing Article<span className="dot-flash">.</span><span className="dot-flash">.</span><span className="dot-flash">.</span>
                        </div>
                      </div>
                    )}

                  
            </div>
              
            {startTyping && (
                <div classname="panelTextArea"
                style={{
                  
                  backgroundColor: '#ffffff',
                  padding: '40px',
                  border: '1px solid #009CA6',
                  borderRadius: '10px',
                  boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.2)',
                  textAlign: 'left',
                  maxHeight: '730px', // Set max height here
                  overflowY: 'auto'   // Enable vertical scrolling when content exceeds max height
                }}
              >
                
                <div  style={{ margin: '-30px 0' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}></label>
                  <textarea
                    ref={textareaRef}
                    rows="14"
                    cols="50"
                    placeholder=""
                    style={{
                      width: '100%',
                      padding: '10px',
                      fontSize: '14px',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      resize: 'vertical'
                    }}
                    value={textareaContent}
                    onChange={(e) => setTextareaContent(e.target.value)}
                  ></textarea>
                </div>
  
  
              </div>
              )}


           </div>
            
          </Col>

          {/* Placeholder for additional columns */}
          <Col>
            <div style={{}}>
            

            {showPanelAction && (
              <div className="scrollable-rounded-inner" style={{
                backgroundColor: '#ffffff',
                padding: '30px',
                border: '1px solid #009CA6',
                borderRadius: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                textAlign: 'left',
                fontFamily: 'Lexend',
                fontSize: '14px',
                maxHeight: '380px',
                marginBottom: '20px',
                overflowY: 'auto'
              }}>

                            <div className="header-box" style={{ marginTop: '-15px', marginBottom: '20px', background: '#AAD5FF', padding: '15px 30px', fontSize: '16px', fontWeight: 'bold', border: '1px solid #54698d', height:'40px'}}>
                                <b></b>
                                <p style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '-10px', textAlign: 'center', marginBottom: '5px' }}>Sagility AI Copilot Actions</p>
                              </div>

                            <div style={{ marginBottom: '5px', fontStyle: 'italic', color: '#444' }}>{loadingMessage}</div>
                      <ProgressBar
                        now={progress}
                        variant="info"
                        style={{ height: '18px', borderRadius: '5px' }}
                      />

                      {visibleResultSteps.length > 0 && (
                          <div style={{ marginTop: '20px', textAlign: 'left', fontSize: '14px' }}>
                            {visibleResultSteps.map((line, index) => (
                              <p key={index} style={{ marginBottom: '3px' }}>
                                {line.link ? (
                            <a
                              href={line.link}
                            onClick={(e) => {
                              e.preventDefault();
                              if (line.onClick) line.onClick();
                            }}
                            style={{ textDecoration: 'underline', color: '#0d6efd', cursor: 'pointer' }}
                          >
                            {line.parts ? (
                              line.parts.map((part, idx) =>
                                typeof part === "string" ? part : (
                                  <span
                                        key={idx}
                                        style={{
                                          backgroundColor: part.highlight ? (part.color || 'yellow') : 'transparent',
                                          color: part.fontColor || 'inherit',
                                          fontWeight: part.bold ? 'bold' : 'normal'
                                        }}
                                      >
                                        {part.word}
                                      </span>
                                                                                    )
                                                                                  )
                                                                                ) : line.bold ? <b>{line.text}</b> : line.text}
                                                                              </a>
                                                                            ) : line.parts ? (
                                                                              line.parts.map((part, idx) =>
                                                                                typeof part === "string" ? part : (
                                                                                  <span
                                        key={idx}
                                        style={{
                                          backgroundColor: part.highlight ? (part.color || 'yellow') : 'transparent',
                                          color: part.fontColor || 'inherit',
                                          fontWeight: part.bold ? 'bold' : 'normal'
                                        }}
                                      >
                                        {part.word}
                                      </span>
                            )
                          )
                        ) : line.bold ? <b>{line.text}</b> : line.text}
            </p>
          ))}
        </div>
      )}
</div>
)}

          
{showPanelValidation && (
  <div className="scrollable-rounded-inner" style={{
                  backgroundColor: '#ffffff',
                  padding: '30px',
                  border: '1px solid #009CA6',
                  borderRadius: '10px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  textAlign: 'left',
                  fontFamily: 'Lexend',
                  fontSize: '14px',
                  maxHeight: '370px',
                  overflowY: 'auto'
                }}>
              
              <div style={{ marginBottom: '5px', fontStyle: 'italic', color: '#444' }}>{loadingMessage2}</div>
                                        <ProgressBar
                                          now={progress4}
                                          variant="info"
                                          style={{ height: '18px', borderRadius: '5px' }}
                                        />
                                                      
                                                          {visibleResultSteps2.length > 0 && (
                                                            <div style={{ marginTop: '20px', textAlign: 'left', fontSize: '14px' }}>
                                                              {visibleResultSteps2.map((line, index) => (
                                                                <p key={index} style={{ marginBottom: '3px' }}>
                                                                {line.link ? (
                                                                            <a
                                                                              href={line.link}
                                                                              onClick={(e) => {
                                                                                e.preventDefault();
                                                                                if (line.onClick) line.onClick();
                                                                              }}
                                                                              style={{ textDecoration: 'underline', color: '#0d6efd', cursor: 'pointer' }}
                                                                            >
                                                                              {line.parts ? (
                                                                                line.parts.map((part, idx) =>
                                                                                  typeof part === "string" ? part : (
                                                                                    <span
                                      key={idx}
                                      style={{
                                        backgroundColor: part.highlight ? (part.color || 'yellow') : 'transparent',
                                        color: part.fontColor || 'inherit',
                                        fontWeight: part.bold ? 'bold' : 'normal'
                                      }}
                                      >
                                      {part.word}
                                      </span>
                                                                                  )
                                                                                )
                                                                              ) : line.bold ? <b>{line.text}</b> : line.text}
                                                                            </a>
                                                                          ) : line.parts ? (
                                                                            line.parts.map((part, idx) =>
                                                                              typeof part === "string" ? part : (
                                                                                <span
                                      key={idx}
                                      style={{
                                        backgroundColor: part.highlight ? (part.color || 'yellow') : 'transparent',
                                        color: part.fontColor || 'inherit',
                                        fontWeight: part.bold ? 'bold' : 'normal'
                                      }}
                                      >
                                      {part.word}
                                      </span>
                                        )
                                      )
                                    ) : line.bold ? <b>{line.text}</b> : line.text}
                        </p>
                      ))}
                      </div>
                    )}

                </div> 
)}
                   
              
            </div>
          </Col>

          
          <Col>

          {showPanelPDF && (
          <div className="panelPDF" style={{ backgroundColor: 'white', padding: '20px', border: '1px solid #009CA6', textAlign: 'left', borderRadius: '10px', boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.2)', }}>
          {showContainer3Content ? (
            <div >
                      
                    
              <PDFv/>


            </div>
          ) : (
            <p style={{ fontStyle: 'italic', color: '#555' }}></p>
          )}
        </div>
)}


          </Col>
        </Row>

        {showGenKAButton && (
  <div style={{ marginTop: '-15px', textAlign: 'left', marginLeft:'-60px' }} className="genKA">
    <button
      onClick={handleStartProgress}
      className="btn btn-primary"
      style={{ width: '250px', paddingTop: '5px', height: '40px', marginLeft: '60px' }}
    >
      Gen-AI Knowledge Agent
    </button>
  </div>
)}

      </Container>

) : (
  <Container className="" style={{ maxWidth: '1200px', minHeight: '400px', /*backgroundColor: '#f9f9f9',*/ padding: '30px', borderRadius: '10px', marginTop:'-10px' }}>
    {/* NEW container content here */}
    <h2 style={{ fontFamily: 'Lexend', color: '#003057', textAlign: 'center', marginBottom: '30px' }}>
  📊 Detailed Claims Dashboard
</h2>

<Row>
  {/* Claims by Manager */}
  <Col md={6}>
      <DashboardCard title="Claims per Manager">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getClaimsByManager()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Manager" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Count" fill="#009CA6" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardCard>
  </Col>

  {/* Offshore vs Onshore */}
  <Col md={6}>
    <DashboardCard title="Offshore vs Onshore">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={getOffshoreSplit()}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {getOffshoreSplit().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={["#00C49F", "#FF8042"][index % 2]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </DashboardCard>
  </Col>
</Row>

<Row>
  {/* ASO vs FI */}
  <Col md={6}>
    <DashboardCard title="ASO vs FI Claims">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={getAsoFiSplit()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Count" fill="#54698d" />
        </BarChart>
      </ResponsiveContainer>
    </DashboardCard>
  </Col>

  {/* Claims Over Time */}
  <Col md={6}>
    <DashboardCard title="Claims Received Date">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={getClaimsOverTime()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </DashboardCard>
  </Col>
</Row>

<Row>
  {/* Status Breakdown */}
  <Col md={12}>
    <DashboardCard title="Status Breakdown">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={getStatusBreakdown()}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            label
          >
            {getStatusBreakdown().map((entry, index) => (
              <Cell key={`cell-status-${index}`} fill={["#0088FE", "#FFBB28", "#FF8042"][index % 3]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </DashboardCard>
  </Col>
</Row>
<div style={{ textAlign: 'center', marginTop: '-15px' }}>
  <button
    className="btn btn-primary"
    style={{ width: '200px', height: '45px', fontSize: '16px', fontWeight: '600' }}
    onClick={handleFinalDownload}
  >
    Download
  </button>
</div>
  </Container>
)}


      
      




                      {/* POPUP Modal after 100% */}
      {showPopup && (
        <div 
          style={{
            position: 'fixed',
            top: '0', left: '0',
            width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            textAlign: 'center',
            width: '400px'
          }}>
            <h5>Condition match complete!</h5>
            <p>Would you like to proceed to Claims Data Verification?</p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button style={{width: '80px'}} className="btn btn-success" onClick={() => handleProceed(true)}>Yes</button>
              <button style={{width: '80px'}} className="btn btn-secondary" onClick={() => handleProceed(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>

    
  );
}

export default App;
