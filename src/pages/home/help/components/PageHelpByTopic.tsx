import { SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MycontactInfoSvg from "../../../../assets/images/help/contactInfo-1.svg";
import MyGettingstartIconSvg from "../../../../assets/images/help/gettingstarted.svg";
import MyNewUserChecklistBuyCrypto from "../../../../assets/images/help/newUserChecklistBuyCrypto.svg";
import PageCard from "./PageCard";
import MySafeSvg from "../../../../assets/images/help/safe.svg";
import MyOther from "../../../../assets/images/help/other.svg";
import MyTaxSeason from "../../../../assets/images/help/taxSeason.svg";
import { useIntl } from 'react-intl';
export default ({ icon, title }: any) => {
  const intl = useIntl();
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 1, md: 3, lg: 3 }}
      py={10}
      spacing={{ base: 10, sm: 10, md: 20, lg: 20 }}
      textAlign="center"
    >
      <Link to="/home/help/getting-started">
        <PageCard
          icon={MyGettingstartIconSvg}
          title={intl.formatMessage({ id: 'Getting started' })}
          des={intl.formatMessage({ id: "Everything you need to start using Coinbase" })}
        />
      </Link>

      <Link to="/home/help/managing-my-account">
        <PageCard
          icon={MycontactInfoSvg}
          title={intl.formatMessage({ id: 'Managing my account' })}
          des={intl.formatMessage({ id: 'Manage your account settings and more' })}
        />
      </Link>

      <Link to="/home/help/trading-and-funding">
        <PageCard
          icon={MyNewUserChecklistBuyCrypto}
          title={intl.formatMessage({ id: 'Trading and funding' })}
          des={intl.formatMessage({ id: 'Buy sell convert send or receive crypto' })}
        />
      </Link>

      <Link to="/home/help/privacy-and-security">
        <PageCard
          icon={MySafeSvg}
          title={intl.formatMessage({ id: 'Privacy and security' })}
          des={intl.formatMessage({ id: 'Avoid scams and protect your account' })}
        />
      </Link>

      <Link to="/home/help/taxes-and-reports">
        <PageCard
          icon={MyTaxSeason}
          title={intl.formatMessage({ id: 'Taxes and reports' })}
          des={intl.formatMessage({ id: 'Understanding crypto taxes and reports' })}
        />
      </Link>

      <Link to="/home/help/other-topics">
        <PageCard
          icon={MyOther}
          title={intl.formatMessage({ id: 'Other topics' })}
          des={intl.formatMessage({ id: 'Coinbase One and troubleshooting' })}
        />
      </Link>
    </SimpleGrid>
  );
};
