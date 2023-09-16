import { useEffect, useState } from "react";
import "./style.scss";
import { Flex } from "@chakra-ui/react";
import MyLineCard from "../../../components/MyLineCard";
import YourAssets from "./components/YourAssets";
import Balances from "./components/Balances";
import { MyContent, request, useMyToast } from "../../../common";

export default () => {
  const { showRes } = useMyToast();
  const [res, setRes] = useState<any>({});
  const [myBalance, setMyBalance] = useState(0);
  const api = {
    onGetAssData: () => {
      request("assets/show", {})
        .then((res) => {
          setRes(res.data);
          request("transfer/info", {})
            .then((info) => {
              setRes({
                userBankCodes: info.data.user_banks,
              })
            })
            .catch(showRes);
        })
        .catch(showRes);
    },
  };
  useEffect(() => {
    api.onGetAssData();
  }, []);
  return (
    <MyContent>
      <Flex flexWrap="wrap">
        <Flex className="assets-l-c" flexDir="column">
          <MyLineCard apiurl="assets/show" xkey="datetime" ykey="balance" />
          <YourAssets res={res || {}} onRefresh={api.onGetAssData} />
        </Flex>
        <Flex className="assets-r-c">
          <Balances />
        </Flex>
      </Flex>
    </MyContent>
  );
};
