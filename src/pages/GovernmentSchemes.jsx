import React from "react";
import Layout from "../components/Layout/Layout";
import SchemeCard from "../components/Government/SchemeCard";

const schemInformation = [
  {
    name: "Mudra yojna scheme",
    videoUrl: "https://www.youtube.com/watch?v=cn3RuR11jS4",
    points: [
      "MUDRA Architecture Indigenously Conceived for Indian context.",
      "Inclusion of Last Mile Financiers - a game changing idea.",
      "Help expand Access to finance for micro enterprises.",
      "Lower Cost of Finance.",
      "Credit plus Approach.",
      "Mass Entrepreneurship Development and Growth.",
    ],
    siteUrl:
      "https://www.jansamarth.in/checkEligibility?id=NHJaK0tQM0lvS2Z6M0FJWWxBNTVrZ2c9OjoxOC0wOS0yMDIzIDAzOjA5",
  },
  {
    name: "mahila udhyam nidhi scheme",
    videoUrl: "https://www.youtube.com/watch?v=F-DA5WesPX0",
    points: [
      "Encourages women entrepreneurship",
      "Enhances job opportunities in micro and small-scale industries.",
      "Bridges the equity gap.",
      "Revives struggling small-scale industries.",
      "Facilitates growth, modernization, and technological advancement in service sectors.",
    ],
    siteUrl:
      "https://www.paisabazaar.com/business-loan/mahila-udyam-nidhi-scheme/",
  },
  {
    name: "Indira Mahila Shakti Enterprise Promotion Scheme",
    videoUrl: "https://www.youtube.com/watch?v=SZ_1RqiwpoU",
    points: [
      "The scheme offers free training in RS-CIT, RS-CFS-GST, Tally, and RS-CSEP courses to women and girls in Rajasthan.",
      "Enhances job opportunities in micro and small-scale industries.",
      "The Rajasthan Government fully covers the cost of these courses provided under the scheme.",
      "Revives struggling small-scale industries.",
    ],
    siteUrl: "https://sso.rajasthan.gov.in/signin",
  },
  {
    name: " Zero Defect Zero Effect Scheme",
    videoUrl: "https://www.youtube.com/watch?v=QiYX7JMxf-Q",
    points: [
      "The Ministry of MSME also provides support to MSMEs under ZED certification Scheme. ",
      " Financial Assistance in Testing/Quality/Product Certification.",
      "The Rajasthan Government fully covers the cost of these courses provided under the scheme.",
      "Revives struggling small-scale industries.",
    ],
    siteUrl: "https://loginzed.msme.gov.in/Msme/Register",
  },
  {
    name: "Prime minister's employment generation programme (PMEGP)",
    videoUrl: "https://www.youtube.com/watch?v=i-g7psWu1Lo",
    points: [
      "The Ministry of MSME also provides support to MSMEs under ZED certification Scheme. ",
      " Financial Assistance in Testing/Quality/Product Certification.",
      "The Rajasthan Government fully covers the cost of these courses provided under the scheme.",
      "Revives struggling small-scale industries.",
    ],
    siteUrl: "https://www.kviconline.gov.in/pmegpeportal/jsp/pmegponline.jsp",
  },
];

const GovernmentSchemes = () => {
  return (
    <Layout>
      <div className="px-14 py-8 flex flex-col">
        {/* <div className="flex flex-col gap-4">
          <GoveernmentTop />
        </div> */}

        <h1 className="text-xl">Government Schemes</h1>
        <ul className="flex flex-col gap-5 mt-5">
          {schemInformation.map((scheme) => {
            return (
              <SchemeCard
                name={scheme.name}
                videoUrl={scheme.videoUrl}
                points={scheme.points}
                siteUrl={scheme.siteUrl}
              />
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default GovernmentSchemes;
